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
        width={330}
        height={240}
        alt="Logo Stalumo"
        loading="lazy"
      />
      <div className="flex gap-5">
        <div>
          <Image
            src="/assets/images/stalumo.png"
            width={40}
            height={440}
            alt="Logo Stalumo"
            loading="lazy"
          />
          <h4 className="text-[#A5A5A5] text-[1.2rem] font-semibold uppercase ">
            Lokalizacja
          </h4>
          <h2 className="text-[1.5rem] font-semibold uppercase">
            DRAWNO, POLSKA
          </h2>
        </div>
        <div>
          <Image
            src="/assets/images/stalumo.png"
            width={40}
            height={440}
            alt="Logo Stalumo"
            loading="lazy"
          />
          <h4 className="text-[#A5A5A5] text-[1.2rem] font-semibold uppercase ">
            EMAIL
          </h4>
          <h2 className="text-[1.5rem] font-semibold uppercase">
            biuro@stalumo.com
          </h2>
        </div>
        <div>
          <Image
            src="/assets/images/stalumo.png"
            width={40}
            height={440}
            alt="Logo Stalumo"
            loading="lazy"
          />
          <h4 className="text-[#A5A5A5] text-[1.2rem] font-semibold uppercase ">
            Lokalizacja
          </h4>
          <h2 className="text-[1.5rem] font-semibold uppercase">
            <i aria-hidden="true" className="rtmicon rtmicon-Location"></i>
            +48 784-532-549 flag-pl / flag-de <br />
            +48 881-961-657 flag-pl / flag-gb
          </h2>
        </div>
      </div>
    </div>
  );
}
