import About from "@/components/sections/home/AboutUs";
import Excellence from "@/components/sections/home/Excellence";
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
      </Container>
    </>
  );
}
