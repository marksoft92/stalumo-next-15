import Script from "next/script";

export const StructuredData = ({ locale }: { locale: any }) => {
  const baseUrl = `https://stalumo.com/${locale}`;
  const data = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "Stalumo",
    image: "https://stalumo.com/assets/images/logo.png",
    "@id": baseUrl,
    url: baseUrl,
    telephone: "+48 784-532-549",
    address: {
      "@type": "PostalAddress",
      streetAddress: "ul. Kolejowa 6",
      addressLocality: "Drawno",
      postalCode: "73-220",
      addressCountry: "PL",
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
        ],
        opens: "08:00",
        closes: "18:00",
      },
    ],
  };

  return (
    <Script
      id="structured-data"
      type="application/ld+json"
      strategy="afterInteractive"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
};

export default StructuredData;
