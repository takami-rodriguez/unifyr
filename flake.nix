{
  inputs = {
    nixpkgs.url = "nixpkgs/nixos-unstable";
    flake-utils.url = "github:numtide/flake-utils";
    crane.url = "github:ipetkov/crane";
    rust-overlay = {
      url = "github:oxalica/rust-overlay";
      inputs.nixpkgs.follows = "nixpkgs";
    };
  };

  outputs =
    {
      self,
      nixpkgs,
      flake-utils,
      crane,
      rust-overlay,
      ...
    }:
    flake-utils.lib.eachDefaultSystem (
      system:
      let
        pkgs = import nixpkgs {
          inherit system;
          overlays = [ rust-overlay.overlays.default ];
        };

        deployments = {
          production = rec {
            URL = "https://www.unifyr.com";
            SERVICE_ID = "OU1ljynQGWtEFoJxxrf0y4";
            AWS_BUCKET = "unifyr-usa-production-bucket";
            AWS_REGION = "us-east-1";
            AWS_HOST = "${AWS_BUCKET}.s3.${AWS_REGION}.amazonaws.com";
          };

          staging = rec {
            URL = "https://next.staging.unifyr.com";
            SERVICE_ID = "hbzrZiVNwT7VqFzAWyc1h4";
            AWS_BUCKET = "unifyr-usa-staging-bucket";
            AWS_REGION = "us-east-1";
            AWS_HOST = "${AWS_BUCKET}.s3.${AWS_REGION}.amazonaws.com";
          };
        };

        # === backend ===
        target = "wasm32-wasip1";

        mkToolchain =
          p:
          p.rust-bin.selectLatestNightlyWith (
            t:
            t.default.override {
              targets = [ target ];
            }
          );
        mkDevToolchain =
          p:
          p.rust-bin.selectLatestNightlyWith (
            t:
            t.default.override {
              extensions = [
                "rust-src"
                "rust-analyzer"
              ];
              targets = [ target ];
            }
          );
        craneLib = (crane.mkLib pkgs).overrideToolchain mkToolchain;
        devCraneLib = (crane.mkLib pkgs).overrideToolchain mkDevToolchain;

        stdenv = with pkgs; (overrideCC pkgs.stdenv (wrapClangMulti llvmPackages_19.clang));

        mkBackend =
          name: env:
          let
            commonArgs = {
              src = pkgs.lib.cleanSourceWith {
                src = ./backend;
                filter =
                  path: type:
                  (pkgs.lib.cleanSourceFilter path type)
                  || (craneLib.filterCargoSources path type)
                  || (baseNameOf path == "blacklist.csv");
              };
              strictDeps = true;
              cargoExtraArgs = "--target wasm32-wasip1 --features ${name}";
            };
          in
          craneLib.buildPackage (
            commonArgs
            // {
              inherit stdenv;
              cargoArtifacts = craneLib.buildDepsOnly commonArgs;

              env = env // {
                FRONTEND = self.legacyPackages.${system}.${name}.frontend;
              };

              doCheck = false;

              cargoToml = ./backend/Cargo.toml;
              cargoLock = ./backend/Cargo.lock;

              hardeningDisable = [
                "zerocallusedregs"
              ];

              nativeBuildInputs = [
                pkgs.binaryen
              ];

              installPhase = ''
                mkdir -p $out package/bin

                echo "Optimizing backend with wasm-opt..."
                cp target/wasm32-wasip1/release/main.wasm package/bin/
                stat -c %s package/bin/main.wasm
                wasm-opt --strip-debug -O3 --converge -o package/bin/main.wasm package/bin/main.wasm
                stat -c %s package/bin/main.wasm

                echo "Packaging for Fastly..."
                cp fastly.toml package/
                tar czf package.tar.gz package

                cp package.tar.gz $out/
              '';
            }
          );

        # === frontend ===
        nodejs = pkgs.nodePackages.nodejs;

        mkFrontend =
          name: env:
          pkgs.buildNpmPackage {
            inherit nodejs;
            env = env // {
              NEXT_TELEMETRY_DISABLED = 1;
              NEXT_PUBLIC_URL = env.URL;
            };

            name = "web";
            src = pkgs.lib.cleanSourceWith {
              src = ./.;
              filter =
                path: type:
                let
                  baseName = baseNameOf (toString path);
                in
                !(builtins.elem baseName [
                  ".next"
                  "out"
                  "backend"
                  "_redirects"
                ])
                && (pkgs.lib.cleanSourceFilter path type);
            };
            npmDeps = pkgs.importNpmLock {
              npmRoot = ./.;
            };
            npmConfigHook = pkgs.importNpmLock.npmConfigHook;
            npmFlags = [
              "--legacy-peer-deps"
            ];
            installPhase = ''
              cp -r out $out
            '';
          };

        # === redirects ===
        mkRedirects =
          src:
          pkgs.stdenv.mkDerivation {
            inherit src;
            name = "redirect-stubs";
            dontConfigure = true;
            nativeBuildInputs = [
              pkgs.bash
              pkgs.coreutils
            ];
            installPhase = ''
              mkdir -p $out
              cd $out

              find "${src}" -type f | while read -r path; do
                rel="''${path#"${src}"}"

                while read -r to from; do
                  [[ -z "$to" || "$to" =~ ^# ]] && continue

                  if [[ "$rel" =~ $to ]]; then
                    from_rel="''${from#/}"
                    new=$(echo "$rel" | sed -E "s|$to|$from_rel|")

                    mkdir -p "$(dirname "$new")"

                    if [[ "$new" =~ /index\.html$ ]]; then
                      echo "$(dirname "$rel")/" > "$new"
                    else
                      echo "$rel" > "$new"
                    fi

                    break
                  fi
                done < "${./_redirects}"
              done
            '';
          };
      in
      {
        checks = {
          inherit (self.legacyPackages.${system}.production) backend;
        };

        legacyPackages = pkgs.lib.mapAttrs (name: env: {
          frontend = mkFrontend name env;
          backend = mkBackend name env;
        }) deployments;

        apps = pkgs.lib.mapAttrs (
          name: env:
          let
            aws = pkgs.lib.getExe pkgs.awscli2;
            rclone = pkgs.lib.getExe pkgs.rclone;
            fastly = pkgs.lib.getExe pkgs.fastly;

            frontend = self.legacyPackages.${system}.${name}.frontend;
            backend = self.legacyPackages.${system}.${name}.backend;
            redirects = mkRedirects frontend;
            script = pkgs.writeShellScriptBin "deploy-${name}" ''
              ${rclone} --progress sync --checksum ${frontend} \
                :s3,provider=AWS,env_auth=true:${env.AWS_BUCKET}

              find ${redirects} -type f | while read -r file; do
                loc=$(cat "$file")
                rel="''${file#${redirects}}"
                rel="''${rel#/}"
                ${aws} s3 cp "$file" s3://${env.AWS_BUCKET}/$rel --website-redirect "$loc"
              done

              ${fastly} compute deploy -s ${env.SERVICE_ID} -p ${backend}/package.tar.gz
              ${fastly} purge -s ${env.SERVICE_ID} --all
            '';
          in
          {
            type = "app";
            program = pkgs.lib.getExe script;
          }
        ) deployments;

        devShells = {
          default = devCraneLib.devShell {
            npmDeps = pkgs.importNpmLock.buildNodeModules {
              npmRoot = ./.;
              inherit nodejs;
            };

            env = deployments.staging // {
              # rust-analyzer complains if it can't find a compile-time env var
              FRONTEND = "/dev/null";
            };

            checks = self.checks.${system};

            packages = [
              nodejs
              pkgs.importNpmLock.hooks.linkNodeModulesHook
              pkgs.nodePackages.vscode-langservers-extracted
              pkgs.typescript-language-server
              pkgs.tailwindcss-language-server
            ];
          };
        };
      }
    );
}
