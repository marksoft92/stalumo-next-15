// app/polityka-prywatnosci/page.tsx

import { getTranslations } from "next-intl/server";

const PrivacyPolicyPage = async () => {
  const t = await getTranslations("PrivacyPolicy");

  return (
    <main className="max-w-4xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-2">{t("title")}</h1>
      <p className="text-sm text-gray-500 mb-6">{t("updated")}</p>
      <p className="mb-6">{t("intro")}</p>

      <section className="mb-6">
        <h2 className="font-semibold text-xl mb-2">{t("section1Title")}</h2>
        <pre className="whitespace-pre-wrap">{t("section1Content")}</pre>
      </section>

      <section className="mb-6">
        <h2 className="font-semibold text-xl mb-2">{t("section2Title")}</h2>
        <h3 className="font-medium mb-1">{t("section2aTitle")}</h3>
        <p className="mb-3">{t("section2aContent")}</p>
        <h3 className="font-medium mb-1">{t("section2bTitle")}</h3>
        <p>{t("section2bContent")}</p>
      </section>

      <section className="mb-6">
        <h2 className="font-semibold text-xl mb-2">{t("section3Title")}</h2>
        <p>{t("section3Content")}</p>
      </section>

      <section className="mb-6">
        <h2 className="font-semibold text-xl mb-2">{t("section4Title")}</h2>
        <p>{t("section4Content")}</p>
      </section>

      <section className="mb-6">
        <h2 className="font-semibold text-xl mb-2">{t("section5Title")}</h2>
        <p>{t("section5Content")}</p>
      </section>

      <section className="mb-6">
        <h2 className="font-semibold text-xl mb-2">{t("section6Title")}</h2>
        <p>{t("section6Content")}</p>
      </section>

      <section className="mb-6">
        <h2 className="font-semibold text-xl mb-2">{t("section7Title")}</h2>
        <p>{t("section7Content")}</p>
      </section>

      <section className="mb-6">
        <h2 className="font-semibold text-xl mb-2">{t("section8Title")}</h2>
        <p>{t("section8Content")}</p>
      </section>

      <section className="mb-6">
        <h2 className="font-semibold text-xl mb-2">{t("section9Title")}</h2>
        <p>{t("section9Content")}</p>
      </section>

      <p className="mt-10 italic">{t("contactNote")}</p>
    </main>
  );
};

export default PrivacyPolicyPage;
