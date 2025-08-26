import rawDescriptions from "@/data/spawanie_zachodniopomorskie_uslugi.json";
import { notFound } from "next/navigation";
import ViewCity from "./viewCity"
const descriptions = rawDescriptions as any[];



export async function generateStaticParams() {
  return descriptions.map((entry) => ({
    slugCity: `${entry.service_slug}~${entry.slugCity}`,
  }));
}

export default async function Page({ params }: any) {
    const [slug, city] = params.slugCity.split("~");
  
    const entry = descriptions.find(
      (item) => item.slugCity === city && item.service_slug === slug
    );
  
    if (!entry) notFound();
  
    return <ViewCity entry={entry} />;
  }