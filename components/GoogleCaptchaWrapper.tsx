"use client";

import { GoogleReCaptchaProvider } from "react-google-recaptcha-v3";

export default function GoogleRecaptchaWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const recaptchaKey =
    process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY ?? "NOT DEFINED";

  return (
    <GoogleReCaptchaProvider reCaptchaKey={recaptchaKey}>
      {children}
    </GoogleReCaptchaProvider>
  );
}
