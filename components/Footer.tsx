import LocaleSwitcher from "./LocaleSwitcher";
import { Link } from "@/i18n/routing";
import { getTranslations } from "next-intl/server";
import Image from "next/image";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import PhoneAndroidIcon from "@mui/icons-material/PhoneAndroid";
import EmailIcon from "@mui/icons-material/Email";
import { SvgIcon } from "@mui/material";

export default async function NavBar() {
  const t = await getTranslations("HomePage");
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
              Lokalizacja
            </h4>
            <h2 className="text-[1.5rem] font-semibold uppercase">
              DRAWNO, POLSKA
            </h2>
          </div>
          <div className="flex flex-col gap-5">
            <span className="text-[#EB4036] border-[#EB4036] text-[1rem]">
              <SvgIcon className="!text-[3rem]">
                <EmailIcon />
              </SvgIcon>
            </span>
            <h4 className="text-[#A5A5A5] text-[1.2rem] font-semibold uppercase ">
              EMAIL
            </h4>
            <h2 className="text-[1.5rem] font-semibold uppercase">
              biuro@stalumo.com
            </h2>
          </div>
          <div className="flex flex-col gap-5">
            <span className="text-[#EB4036] border-[#EB4036] text-[1rem]">
              <SvgIcon className="!text-[3rem]">
                <PhoneAndroidIcon />
              </SvgIcon>
            </span>
            <h4 className="text-[#A5A5A5] text-[1.2rem] font-semibold uppercase ">
              Telefon
            </h4>
            <h2 className="text-[1.5rem] font-semibold uppercase">
              +48 784-532-549 <br />
              +48 881-961-657
            </h2>
          </div>
        </div>
      </div>
      <div className="flex items-center algin-center justify-center p-4">
        <span>Copyright 202 © All Right Reserved</span>
      </div>
    </>
  );
}
