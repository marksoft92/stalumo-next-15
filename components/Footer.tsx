import { getTranslations } from "next-intl/server";
import Image from "next/image";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import PhoneAndroidIcon from "@mui/icons-material/PhoneAndroid";
import EmailIcon from "@mui/icons-material/Email";
import { SvgIcon } from "@mui/material";
import Link from "next/link";

export default async function NavBar(locale:any) {
  const t = await getTranslations("Footer");
      const itsDe = locale?.locale === "de"
const emailObfuscation = ['office', 'stalumo.com'].join('@')
  return (
    <>
      <div className="flex justify-between items-center p-4 mx-auto max-w-[1280px] max-lg:flex-col">
        <Image
          src="/assets/images/stalumo.png"
          width={330}
          height={240}
          alt="Logo Stalumo"
          loading="lazy"
        />
        <div className="flex gap-5 max-lg:flex-col">
          <div className="flex flex-col gap-5">
            <span className="text-[#EB4036] border-[#EB4036] text-[1rem]">
              <SvgIcon className="!text-[3rem]">
                <LocationOnIcon />
              </SvgIcon>
            </span>
            <h4 className="text-[#A5A5A5] text-[1.2rem] font-semibold uppercase ">
              {t("location")}
            </h4>
            <h2 className="text-[1.5rem] font-semibold uppercase">
              <Link href="https://www.google.com/maps/place/Stalumo/@53.2157609,15.7642279,17z/data=!4m6!3m5!1s0x47012f630a6437c1:0x5c53e80903d8fdc!8m2!3d53.2158315!4d15.7648368!16s%2Fg%2F11gf0pmv9x?entry=ttu&g_ep=EgoyMDI1MDQyMy4wIKXMDSoASAFQAw%3D%3D" target="_blank">{t("country")}</Link>
            </h2>
          </div>
          <div className="flex flex-col gap-5">
            <span className="text-[#EB4036] border-[#EB4036] text-[1rem]">
              <SvgIcon className="!text-[3rem]">
                <EmailIcon />
              </SvgIcon>
            </span>
            <h4 className="text-[#A5A5A5] text-[1.2rem] font-semibold uppercase ">
              {t("email")}
            </h4>
            <h2 className="text-[1.5rem] font-semibold uppercase">
          
            <Link href={`mailto:${['office', 'stalumo.com'].join('@')}`}>{emailObfuscation}</Link>
            </h2>
          </div>
          <div className="flex flex-col gap-5">
            <span className="text-[#EB4036] border-[#EB4036] text-[1rem]">
              <SvgIcon className="!text-[3rem]">
                <PhoneAndroidIcon />
              </SvgIcon>
            </span>
            <h4 className="text-[#A5A5A5] text-[1.2rem] font-semibold uppercase ">
              {t("phone")}
            </h4>
            <h2 className="text-[1.5rem] font-semibold uppercase">

              {itsDe ? <Link href="tel:+4915158843944">+49 151 58843944</Link> : <Link href="tel:+48784532549">+48 784-532-549</Link>}
            </h2>
          </div>
        </div>
      </div>
      <div className="flex items-center algin-center justify-center p-4">
        <span> {t("copy")}</span>
      </div>
    </>
  );
}
