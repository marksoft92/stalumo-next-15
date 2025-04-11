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
import ScrollAnimation from "@/components/ScrollAnimation";

export default async function HomePage() {
    return (
        <>
            {" "}
            <Container>
                <Excellence/>
                <ScrollAnimation direction="left"><Steps/></ScrollAnimation>
                <ScrollAnimation direction="left"> <About/></ScrollAnimation>
                <ScrollAnimation direction="left"><VisionMission/></ScrollAnimation>
                <ScrollAnimation direction="left"> <OurServices/></ScrollAnimation>
                <ScrollAnimation direction="left"><Realization/></ScrollAnimation>
                <ScrollAnimation direction="left"> <OurProcess/></ScrollAnimation>
                <ScrollAnimation direction="left"> <Faq/></ScrollAnimation>
                <ScrollAnimation direction="left"> <Stats/></ScrollAnimation>
            </Container>
        </>
    );
}
