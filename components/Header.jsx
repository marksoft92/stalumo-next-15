import LocaleSwitcher from "./LocaleSwitcher";
import { Link } from "@/i18n/routing";
import { getTranslations } from "next-intl/server";
import Image from "next/image";

export default async function NavBar() {
  const t = await getTranslations("HomePage");
  return (
    <div className="flex justify-between items-center p-4 mx-auto max-w-[1280px]">
      <Image
        src="/assets/images/stalumo.png"
        width={145}
        height={113}
        alt="Logo Stalumo"
        loading="lazy"
      />
      <div>
        <Link href="/home">{t("home")}</Link>
        <Link href="/about">{t("about")}</Link>
        <Link href="/gallery">{t("gallery")}</Link>
        <Link href="/contact">{t("contact")}</Link>
      </div>

      <LocaleSwitcher />
    </div>
  );
}
