import Link from "next/link";
import Image from "next/image";
import Container from "@/components/ui/container";
import BackgroundSlider from "@/components/BackgroundSilder";
export default async function AboutPage() {
  const images: string[] = [
    "/assets/images/spawanie1.jpg",
    "/assets/images/spawanie2.jpg",
    "/assets/images/spawanie3.jpg",
    "/assets/images/spawanie4.jpg",
    "/assets/images/spawanie5.jpg",
  ];

  return (
    <Container>
      <BackgroundSlider images={images} maxHeight={"500px"} />
      <div>
        <div className="flex flex-col items-center relative min-h-[500px] justify-center">
          <h2 className="text-[6rem] font-semibold uppercase">O nas</h2>
          <h3>
            <Link
              className="text-[1.6rem] font-semibold uppercase text-[#EB4036]"
              href="/"
            >
              Strona Główna
            </Link>
            <span className="text-[1.6rem] font-semibold uppercase ">
              /O nas
            </span>
          </h3>
        </div>
        <section className="flex  f-row p-7rem py-0 gap-x-[70px] gap-y-0 m-[10rem] mx-auto">
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
            <h2 className="text-[3.5rem] font-semibold uppercase">
              Profesjonalne Spawanie i Wyroby Metalowe na Polskim i Niemieckim
              Rynku
            </h2>
            <p className="text-[#A5A5A5] text-[1.2rem]">
              Witajcie w Stalumo - firmie z pasją do metalu i zobowiązaniem do
              doskonałości. Z ponad 10-letnim doświadczeniem na rynku polskim i
              niemieckim, jesteśmy dumni z naszej reputacji jako solidnego
              partnera w branży metalowej.
              <br /> <br />
              Od samego początku naszej działalności w 2010 roku, nieustannie
              dążymy do podnoszenia standardów jakości i profesjonalizmu w
              naszej pracy. Nasze usługi obejmują szeroki zakres działań,
              począwszy od spawania po produkcję bram, ogrodzeń, balustrad,
              balkonów, aż po wiaty i ogrody zimowe - zawsze z dbałością o
              detale i precyzję wykonania.
              <br /> <br />
              Jesteśmy przekonani, że nasze produkty i usługi wyróżniają się nie
              tylko doskonałą jakością, ale także elastycznością i indywidualnym
              podejściem do potrzeb klienta. Każde zamówienie traktujemy jako
              wyjątkowe i dostosowujemy nasze rozwiązania do konkretnych
              wymagań, gwarantując satysfakcję nawet najbardziej wymagających
              klientów. <br />
              <br />
              Co nas wyróżnia? Oprócz naszego zaangażowania w dostarczanie
              produktów najwyższej jakości, jesteśmy również zgranym zespołem
              profesjonalistów, gotowym sprostać nawet najbardziej
              skomplikowanym wyzwaniom. Nasza firma składa się z
              wykwalifikowanych specjalistów, dla których metalowe wyroby to nie
              tylko praca, ale prawdziwa pasja.
              <br /> <br />
              Działamy nie tylko na terenie Polski, ale również w Niemczech, co
              pozwala nam poszerzyć nasz zasięg i zaoferować nasze produkty i
              usługi klientom również za granicą. Nasza obecność na dwóch
              rynkach umożliwia nam również ciągły rozwój i doskonalenie naszych
              umiejętności, aby sprostać zmieniającym się potrzebom naszych
              klientów. <br />
              <br />
              Jeśli szukasz profesjonalnego partnera w branży metalowej, który
              dostarczy Ci nie tylko wysokiej jakości produkty, ale również
              kompleksową obsługę i wsparcie na każdym etapie projektu - Stalumo
              jest dla Ciebie idealnym wyborem. Dołącz do grona zadowolonych
              klientów i przekonaj się, dlaczego Stalumo to gwarancja
              solidności, jakości i profesjonalizmu.
              <br />
              <br /> Zapraszamy do współpracy!
            </p>
          </div>
        </section>
      </div>
    </Container>
  );
}
