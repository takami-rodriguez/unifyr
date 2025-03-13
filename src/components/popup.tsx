"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

interface BottomRightPopupProps {
  imageUrl: string;
  title: string;
  description: string;
  linkUrl: string;
  linkText: string;
}

const BottomRightPopup: React.FC<BottomRightPopupProps> = ({
  imageUrl,
  title,
  description,
  linkUrl,
  linkText,
}) => {
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const COOKIE_NAME = "popup_closed";

  useEffect(() => {
    const hasClosedPopup = (): boolean => {
      const cookies = document.cookie.split(";");
      for (const cookie of cookies) {
        const [name] = cookie.trim().split("=");
        if (name === COOKIE_NAME) {
          return true;
        }
      }
      return false;
    };

    // If the user hasn't closed the popup before, show it
    if (!hasClosedPopup()) {
      setIsVisible(true);
    }
  }, []);

  // Function to set a cookie that expires in 2 weeks
  const setExpiringCookie = (): void => {
    const expiration = new Date();
    expiration.setDate(expiration.getDate() + 14);

    document.cookie = `${COOKIE_NAME}=true; expires=${expiration.toUTCString()}; path=/; SameSite=Strict`;
  };

  const handleClose = (): void => {
    setIsVisible(false);
    setExpiringCookie();
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-4 right-4 z-50 hidden max-w-md overflow-hidden rounded-md border border-gray-200 bg-white shadow-lg md:flex">
      {/* Text Content Section */}
      <div className="flex h-48 w-48 flex-col justify-between p-4">
        <div>
          <h3 className="mb-2 text-lg font-medium">{title}</h3>
          <p className="text-xs text-gray-600">{description}</p>
        </div>

        {/* CTA Button */}
        <div className="mt-3">
          <Link
            href={linkUrl}
            className="inline-block rounded bg-primary/90 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-primary"
          >
            {linkText}
          </Link>
        </div>
      </div>

      {/* Image Section */}
      <div className="relative h-48 w-48 bg-gray-100">
        <Image
          src={imageUrl}
          alt="popup image"
          fill
          sizes="(max-width: 768px) 100vw, 200px"
          style={{ objectFit: "cover" }}
          priority
        />
      </div>

      {/* Close Button */}
      <button
        onClick={handleClose}
        className="absolute right-2 top-2 text-gray-500 hover:text-gray-700"
        aria-label="Close popup"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <line x1="18" y1="6" x2="6" y2="18"></line>
          <line x1="6" y1="6" x2="18" y2="18"></line>
        </svg>
      </button>
    </div>
  );
};

export default BottomRightPopup;
