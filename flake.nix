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
            SERVICE_ID = "";
            AWS_BUCKET = "unifyr-usa-production-bucket";
            AWS_REGION = "us-east-1";
            AWS_HOST = "${AWS_BUCKET}.s3.${AWS_REGION}.amazonaws.com";
          };

          staging = rec {
            URL = "https://staging.unifyr.com";
            SERVICE_ID = "hbzrZiVNwT7VqFzAWyc1h4";
            AWS_BUCKET = "unifyr-usa-staging-bucket";
            AWS_REGION = "us-east-1";
            AWS_HOST = "${AWS_BUCKET}.s3.${AWS_REGION}.amazonaws.com";
          };
        };

        craneLib = (crane.mkLib pkgs).overrideToolchain (
          p:
          p.rust-bin.selectLatestNightlyWith (
            tc:
            tc.default.override {
              extensions = [
                "rust-analyzer"
                "rust-src"
              ];
              targets = [
                "wasm32-wasip1"
              ];
            }
          )
        );

        stdenv = with pkgs; (overrideCC pkgs.stdenv (wrapClangMulti llvmPackages_19.clang));

        mkBackend =
          name: env:
          let
            commonArgs = {
              src = craneLib.cleanCargoSource ./backend;
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

        mkFrontend =
          name: env:
          pkgs.buildNpmPackage {
            inherit env;
            name = "web";
            src = pkgs.lib.cleanSource ./.;
            nodejs = pkgs.nodePackages.nodejs;
            npmConfigHook = pkgs.importNpmLock.npmConfigHook;
            npmDeps = pkgs.importNpmLock {
              npmRoot = ./.;
            };
            npmFlags = [
              "--legacy-peer-deps"
            ];
            installPhase = ''
              cp -r out $out
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
            fastly = pkgs.lib.getExe pkgs.fastly;

            frontend = self.legacyPackages.${system}.${name}.frontend;
            backend = self.legacyPackages.${system}.${name}.backend;
            script = pkgs.writeShellScriptBin "deploy-${name}" ''
              ${aws} s3 sync ${frontend} s3://${env.AWS_BUCKET} --delete
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
          default = craneLib.devShell {
            env = deployments.staging // {
              # rust-analyzer complains if it can't find a compile-time env var
              FRONTEND = "/dev/null";
            };

            checks = self.checks.${system};

            packages = with pkgs; [
              nodePackages.nodejs
              nodePackages.vscode-langservers-extracted
              typescript-language-server
              tailwindcss-language-server
            ];
          };
        };
      }
    );
}
