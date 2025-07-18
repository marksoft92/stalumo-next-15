import PerformanceSlider from "@/components/PerformanceSlider";
import Container from "@/components/ui/container";
import { getTranslations } from "next-intl/server";
import Link from "next/link";
import Button from "@/components/ui/button";

export default async function NotFound() {
    const images: string[] = [
        "/assets/images/spawanie1.jpg",
        "/assets/images/spawanie2.jpg",
        "/assets/images/spawanie3.jpg",
        "/assets/images/spawanie4.jpg",
        "/assets/images/spawanie5.jpg",
    ];
    const t = await getTranslations("NotFound");
    return (
        <Container>
            <div>
                <PerformanceSlider images={images} maxHeight={"500px"} />
                <div className="flex flex-col items-center relative min-h-[500px] justify-center">
                    <h2 className="text-[6rem] font-semibold uppercase text-[#EB4036]">404</h2>
                    <h3 className="max-lg:text-center flex flex-col items-center text-center">


                        <span className="text-[1.6rem] font-semibold uppercase ">
                            {t("title")}
                        </span>
                        <span className="text-[1.6rem] font-semibold uppercase ">
                            {t("description")}
                        </span>


                    </h3>
                    <Button href="/contact" title={t("button")} />
                </div>
            </div>
        </Container>
    );
}