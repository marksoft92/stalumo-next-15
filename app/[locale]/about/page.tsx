import Link from "next/link";
import Image from "next/image";
import Container from "@/components/ui/container";
import BackgroundSlider from "@/components/BackgroundSilder";
import { getTranslations } from "next-intl/server";

export default async function AboutPage() {
  const images: string[] = [
    "/assets/images/spawanie1.jpg",
    "/assets/images/spawanie2.jpg",
    "/assets/images/spawanie3.jpg",
    "/assets/images/spawanie4.jpg",
    "/assets/images/spawanie5.jpg",
  ];
  const t = await getTranslations("About");

  return (
    <Container>
      <BackgroundSlider images={images} maxHeight={"500px"} />
      <div>
        <div className="flex flex-col items-center relative min-h-[500px] justify-center">
          <h2 className="text-[6rem] font-semibold uppercase">{t("title")}</h2>
          <h3>
            <Link
              className="text-[1.6rem] font-semibold uppercase text-[#EB4036]"
              href="/"
            >
              {t("homeTitle")}
            </Link>
            <span className="text-[1.6rem] font-semibold uppercase ">
              / {t("title")}
            </span>
          </h3>
        </div>
        <section className="flex  f-row p-7rem py-0 lg:gap-x-[70px] gap-y-0 m-[10rem] mx-auto max-lg:flex-col">
          <div className="relative">
            <div>
              <Image
                src="/assets/images/icons/Gp-2.png"
                width={133}
                height={133}
                className="p-[0.3em] absolute top-[-1rem] left-[-1rem] z-[-1]"
                alt="Logo Facebook"
                loading="lazy"
              />
            </div>
            <div>
              <Image
                src="/assets/images/spawacz2.jpg"
                width={100}
                height={100}
                className="p-[0.3em]"
                alt="spawacz"
                loading="lazy"
                layout="responsive"
              />
            </div>
          </div>
          <div className="max-w-full lg:max-w-[50%] flex justify-center flex-col gap-5">
            <h4 className="text-[#EB4036] text-[1rem] font-semibold">
              STALUMO
            </h4>
            <h2 className="text-[3.5rem] font-semibold uppercase max-lg:text-[2.5rem]">
              Profesjonalne Spawanie i Wyroby Metalowe na Polskim i Niemieckim
              Rynku
            </h2>
            <p
              className="text-[#A5A5A5] text-[1.2rem]"
              dangerouslySetInnerHTML={{ __html: t("description") }}
            ></p>
          </div>
        </section>
      </div>
    </Container>
  );
}
