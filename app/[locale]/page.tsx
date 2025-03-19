import About from "@/components/sections/home/AboutUs";
import Excellence from "@/components/sections/home/Excellence";
import Faq from "@/components/sections/home/Faq";
import OurProcess from "@/components/sections/home/OurProcess";
import OurServices from "@/components/sections/home/OurServices";
import Realization from "@/components/sections/home/Realization";
import Stats from "@/components/sections/home/Stats";
import Steps from "@/components/sections/home/Steps";
import VisionMission from "@/components/sections/home/VisionMission";
import Container from "@/components/ui/container";
import { Link } from "@/i18n/routing";
import { getTranslations } from "next-intl/server";

export default async function HomePage() {
  const t = await getTranslations("HomePage");
  return (
    <>
      <Container>
        <Excellence />
        <Steps />
        <About />
        <VisionMission />
        <OurServices />
        <Realization />
        <OurProcess />
        <Faq />
        <Stats />
      </Container>
    </>
  );
}
