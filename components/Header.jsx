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
        <Link
          className="uppercase font-bold text-[1rem] font-oswald px-[20px] hover:text-[#EB4036]"
          href="/"
        >
          {t("home")}
        </Link>
        <Link
          className="uppercase font-bold text-[1rem] font-oswald px-[20px] hover:text-[#EB4036]"
          href="/about"
        >
          {t("about")}
        </Link>
        <Link
          className="uppercase font-bold text-[1rem] font-oswald px-[20px] hover:text-[#EB4036]"
          href="/gallery"
        >
          {t("gallery")}
        </Link>
        <Link
          className="uppercase font-bold text-[1rem] font-oswald px-[20px] hover:text-[#EB4036]"
          href="/contact"
        >
          {t("contact")}
        </Link>
        <Link
          className="uppercase font-bold text-[1rem] font-oswald px-[20px] hover:text-[#EB4036]"
          href="/blog"
        >
          {t("blog")}
        </Link>
      </div>

      <LocaleSwitcher />
    </div>
  );
}
