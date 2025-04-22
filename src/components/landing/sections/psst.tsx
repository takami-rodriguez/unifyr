"use client";
import React from "react";
import { gradientText } from "@/data/styleHelpers";
import { useSearchParams } from "next/navigation";
import Image from "next/image";

async function getLogoBase64(domain: string): Promise<string> {
  const response = await fetch(`/retrieve-logo?domain=${domain}`, {
    method: "POST",
  });
  const base64 = await response.text();
  return `data:image/webp;base64,${base64}`;
}

const CompanyLogo = () => {
  const params = useSearchParams();
  const [encImg, setEncImg] = React.useState("");

  React.useEffect(() => {
    const domain = params.get("domain");
    if (domain) {
      getLogoBase64(domain).then((url) => setEncImg(url));
    }
  }, [params]);

  return encImg ? (
    <div className="before:absolute before:mx-4 before:h-[64px] before:w-px before:bg-gray-500 before:content-['']">
      <img
        src={encImg}
        className="ml-[32px] h-[64px] w-[64px] rounded-sm bg-cover bg-center bg-no-repeat"
      />
    </div>
  ) : null;
};

const Company = () => {
  const params = useSearchParams();
  const [name, setName] = React.useState<string | null>(null);

  React.useEffect(() => {
    const value = params.get("name");
    setName(value);
  }, [params]);

  return name;
};

export default function Psst() {
  return (
    <>
      <section className="flex w-full items-center justify-center px-2">
        <div className="flex h-[64px] w-[64px] items-center justify-center rounded-sm bg-white">
          <Image src="/favicon.ico" alt="Unifyr Logo" width="44" height="44" />
        </div>
        <React.Suspense>
          <CompanyLogo />
        </React.Suspense>
      </section>
      <React.Suspense>
        <div className="mx-auto px-2 text-center md:max-w-3xl">
          <h1 className="font-heading text-5xl font-bold leading-[3.5rem] text-grey-900 md:pt-10">
            Hey <Company />,
            <br />
            Let's explore what a <span className="u-gradient-text">
              better
            </span>{" "}
            channel partnership program looks like.
          </h1>
        </div>
      </React.Suspense>
    </>
  );
}
