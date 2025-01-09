"use client";
import CookieConsent from "react-cookie-consent";
import clsx from "clsx";
import Link from "next/link";
import { NavLink } from "@/data/navLinks";

const CookiePopUpBox = (): JSX.Element => {
  return (
    <CookieConsent
      flipButtons
      disableStyles={true}
      hideOnAccept
      hideOnDecline
      location="bottom"
      buttonText="Accept"
      declineButtonText="Decline"
      enableDeclineButton
      cookieName="unifyr-accept-cookie"
      //parent class for the entire div, defines the background and postion
      containerClasses={clsx(
        "fixed z-40 bg-white bottom-0 rounded-lg w-full flex-col lg:flex-row flex px-5 md:px-20 items-center lg:justify-center",
        " overflow-hidden sm:left-auto"
      )}
      //parent div of the buttons
      buttonWrapperClasses="flex flex-col lg:flex-row justify-between py-4 lg:h-20 w-full lg:w-auto text-lg font-medium leading-7"
      //classes for the styling of each button
      buttonClasses="px-4 mt-4 lg:mt-0 py-2 w-full lg:w-auto lg:ml-4 items-center justify-center whitespace-nowrap rounded-xl   ring-offset-white transition-colors focus-visible:outline-none focus-visible:ring-2 bg-gradient text-white hover:bg-primary"
      declineButtonClasses="order-first px-4 py-2 w-full lg:w-auto items-center justify-center whitespace-nowrap rounded-xl   ring-offset-white transition-colors focus-visible:outline-none focus-visible:ring-2 text-black border-2 border-black "
    >
      {/** content located within the parent class */}
      <div className="mx-auto my-6 max-w-7xl lg:px-6 font-sub-heading flex flex-col lg:flex-row items-center lg:space-x-6 ">
        <div className="flex space-x-4 items-center  mb-4 lg:mb-0">
          <p className="lg:hidden font-bold text-2xl text-black">
            Our website uses cookies
          </p>
        </div>
        <p className="text-sm leading-4.5 tracking-widest">
          Our website uses cookies. By continuing navigating, we assume your
          permission to deploy cookies as detailed in our&nbsp;
          <Link
            href={NavLink.Privacy}
            aria-label="Privacy Policy Link (opens in a new tab)"
            target="_blank"
            className="text-pink underline"
          >
            Privacy Policy
          </Link>
        </p>
      </div>
    </CookieConsent>
  );
};

export default CookiePopUpBox;
