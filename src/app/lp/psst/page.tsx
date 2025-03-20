"use client";
import React, { Suspense, useEffect, useState } from "react";
import LandingPageForm from "@/components/forms/lpForm";
import G2Leaders from "@/app/(home)/components/g2Leaders";
import LPPageTitle from "../components/pageTitle";
import LPImage from "../components/lpImage";
import LPListItems from "../components/lpListItems";
import PlatformVideoSection from "@/app/platform/components/platformVideoSection";
import ImageText from "@/components/imageText";
import PlatformJourney from "@/app/platform/components/platformJourney";
import FeatureList from "@/components/featureList";
import data from "../../platform/ziftone/pageData";
import { PlatformWithWistiaId } from "@/types/platformTemplate";
import Partners from "@/components/partners";
import { boxShadow, gradientText } from "@/data/styleHelpers";
import { useSearchParams } from "next/navigation";

async function getLogoBase64(domain: string): Promise<string> {
  const response = await fetch(`/retrieve-logo?domain=${domain}`, {
    method: "POST",
  });
  const base64 = await response.text();
  return `data:image/webp;base64,${base64}`;
}

const CompanyLogo = () => {
  const params = useSearchParams();
  const [encImg, setEncImg] = useState("");

  useEffect(() => {
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
  const [name, setName] = useState<string | null>(null);

  useEffect(() => {
    const value = params.get("name");
    setName(value);
  }, [params]);

  return name;
};

const G2Page = () => {
  return (
    <>
      <section className="flex w-full items-center justify-center px-2 py-8">
        <div className="flex h-[64px] w-[64px] items-center justify-center rounded-sm bg-white">
          <img src="/favicon.ico" width="44" />
        </div>
        <Suspense>
          <CompanyLogo />
        </Suspense>
      </section>
      <Suspense>
        <div className="mx-auto px-2 text-center md:max-w-3xl">
          <h1 className="font-heading text-5xl font-bold leading-[3.5rem] text-grey-900 md:pt-20 md:text-7xl md:leading-[5rem]">
            <span style={gradientText}>
              Hey, <Company />!
            </span>{" "}
            It is 8:00: Do you know where your PRM is?
          </h1>
        </div>
      </Suspense>
    </>
  );
};

export default G2Page;
