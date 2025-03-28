import LocaleSwitcher from "./LocaleSwitcher";
import { Link } from "@/i18n/routing";
import { getTranslations } from "next-intl/server";
import Image from "next/image";
import HamburgerMenu from "./ui/hamburgerMenu";

export default async function NavBar() {
  const t = await getTranslations("Header");

  type NavLink = {
    href: string | any;
    label: string | any;
  };

  const navLinks: NavLink[] = [
    { href: "/", label: t("home") },
    { href: "/about", label: t("about") },
    { href: "/gallery", label: t("gallery") },
    { href: "/contact", label: t("contact") },
    { href: "/blog", label: t("blog") },
  ];

  return (
    <div className="flex justify-between items-center p-4 mx-auto max-w-[1280px] max-lg:fixed max-lg:z-10 max-lg:w-full max-lg:bg-[#121212]">
      <Link href="/">
        <Image
          src="/assets/images/stalumo.png"
          width={145}
          height={113}
          alt="Logo Stalumo"
          loading="lazy"
        />
      </Link>
      <div className="max-lg:hidden">
        {navLinks.map((link, index) => (
          <Link
            key={index}
            className="uppercase font-bold text-[1rem] font-oswald px-[20px] hover:text-[#EB4036]"
            href={link.href}
          >
            {link.label}
          </Link>
        ))}
      </div>
      <LocaleSwitcher />
      <HamburgerMenu navLinks={navLinks} />
    </div>
  );
}
