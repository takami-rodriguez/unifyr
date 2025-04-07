import React from "react";
import Partners from "@/components/partners";
import { boxShadow } from "@/data/styleHelpers";

const AWSPage = async () => {
  return (
    <>
      <div className="mx-auto mb-8 px-2 text-center md:max-w-3xl">
        <h1 className="mb-8 font-heading text-5xl font-bold leading-[3.5rem] text-grey-900 md:pt-20 md:leading-[3.5rem]">
          Thank you for purchasing ZiftONE through the AWS Marketplace!
        </h1>
        <p className="mx-auto max-w-[800px] text-center md:text-[1.375rem]">
          We'll be in touch shortly with everything you need to get started.
          Welcome to the future of partner relationship management.
        </p>
      </div>
      <p className="mx-auto mb-4 max-w-[800px] md:text-[1.375rem]">
        Your purchase is complete. Here's what you can expect next:
      </p>
      <ul className="mx-auto max-w-[800px] list-disc md:text-[1.375rem] [&_li]:mb-4">
        <li>
          <strong>Setup Instructions:</strong> You will receive an email within
          24 hours with detailed instructions on how to access and set up your
          ZiftONE platform.
        </li>
        <li>
          <strong>Onboarding:</strong> Our team will reach out to provide an
          assisted onboarding approach to ensure you get the most out of
          ZiftONE.
        </li>
        <li>
          <strong>Support:</strong> In the meantime, if you have any questions,
          please visit our support resources or contact us at{" "}
          <a href="mailto:sales@unifyr.com" className="underline">sales@unifyr.com</a>.
        </li>
      </ul>
      <div
        className="mx-auto mt-10 max-w-5xl space-y-6 rounded-2xl border-[1.5px] border-white bg-white/30 px-4 lg:mt-20 lg:px-14"
        style={boxShadow}
      >
        <div className="lg:-mx-2">
          <Partners />
        </div>
      </div>
    </>
  );
};

export default AWSPage;
