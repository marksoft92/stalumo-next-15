"use client";

import { useState, useEffect } from "react";
import { getLocalStorage, setLocalStorage } from "@/lib/storage-helpers";
import CookieIcon from "@mui/icons-material/Cookie";
import { SvgIcon } from "@mui/material";
// CookieBanner component that displays a banner for cookie consent.
export default function CookieBanner() {
  const [cookieConsent, setCookieConsent] = useState<boolean | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Retrieve cookie consent status from local storage on component mount
  useEffect(() => {
    const storedCookieConsent = getLocalStorage("cookie_consent", null);
    console.log("Cookie Consent retrieved from storage: ", storedCookieConsent);
    setCookieConsent(storedCookieConsent);
    setIsLoading(false);
  }, []);

  // Update local storage and Google Analytics consent status when cookieConsent changes
  useEffect(() => {
    if (cookieConsent !== null) {
      setLocalStorage("cookie_consent", cookieConsent);
    }

    const newValue = cookieConsent ? "granted" : "denied";

    if (typeof window !== "undefined" && window.gtag) {
      window.gtag("consent", "update", {
        analytics_storage: newValue,
      });
    }
  }, [cookieConsent]);

  // Do not render the banner if loading or consent is already given
  if (isLoading || cookieConsent !== null) {
    return null;
  }

  return (
    <div
      className={`cookie-banner ${
        cookieConsent == null ? "visible" : "hidden"
      }`}
    >
      <div className="flex flex-col bg-white rounded-[10px] fixed left-1/2 transform -translate-x-1/2  text-[#000] gap-5 p-4 shadow-[0_5px_10px_rgba(254,254,254,0.1)] bottom-0 z-10 max-lg:w-[90%]">
        <div className="cookie-banner-content">
          <div className="cookie-banner-text">
            <h4 className="flex flex-row justify-center text-center p-2 text-[#4070f4]">
              <SvgIcon className="!text-[3rem]">
                <CookieIcon />
              </SvgIcon>
              <span className="text-[2rem]">Cookies Consent</span>
            </h4>
            <p>
              This website use cookies to help you have a superior and more
              relevant browsing experience on the website.
            </p>
          </div>
          <div className="cookie-banner-buttons text-[#fff] flex gap-5 text-center items-center algin-center justify-center p-2">
            <button
              className="p-2 text-[#4070f4]  border-[2px] border-solid border-[#4070f4] rounded-[8px]"
              onClick={() => setCookieConsent(false)}
            >
              Decline
            </button>
            <button
              className="p-2 bg-[#4070f4]  border-[2px] border-solid border-[#4070f4] rounded-[8px]"
              onClick={() => setCookieConsent(true)}
            >
              Accept
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
