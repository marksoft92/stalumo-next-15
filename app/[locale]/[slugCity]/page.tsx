import services from "@/data/services.json"; // 10 usług
import cities from "@/data/city.json";     // 20 miast
import { notFound } from "next/navigation";
import ViewCity from "./viewCity";

export async function generateStaticParams() {
  return services.flatMap(service =>
    cities.map(city => ({
      slugCity: `${service.service_slug}~${city.slugCity}`
    }))
  );
}

export default async function Page({ params }: any) {

  const [serviceSlug, citySlug] = params.slugCity.split("~");

  const serviceEntry = services.find(s => s.service_slug === serviceSlug);
  const cityEntry = cities.find((c: any) => c.slugCity === citySlug);

  if (!serviceEntry || !cityEntry) notFound();

  // Podmiana placeholderów {city} i {defCity}
  const entry = {
    ...serviceEntry,
    description: serviceEntry.description.replace("{defCity}", cityEntry.defCity).replace("{city}", cityEntry.city),
    seo: {
      title: serviceEntry.seo.title.replace("{city}", cityEntry.city),
      description: serviceEntry.seo.description.replace("{city}", cityEntry.city),
      keywords: serviceEntry.seo.keywords.replace("{city}", cityEntry.city)
    },
    faq: serviceEntry.faq.map(faq => ({
      question: faq.question.replace("{defCity}", cityEntry.defCity).replace("{city}", cityEntry.city),
      answer: faq.answer.replace("{defCity}", cityEntry.defCity).replace("{city}", cityEntry.city)
    })),

    review: serviceEntry.review.map(rev => ({
      comment: rev.comment.replace("{defCity}", cityEntry.city).replace("{city}", cityEntry.city),
      address: rev.address.replace("{defCity}", cityEntry.city).replace("{city}", cityEntry.city),
      data: rev.data.replace("{defCity}", cityEntry.city).replace("{city}", cityEntry.city),
      author: rev.author.replace("{defCity}", cityEntry.city).replace("{city}", cityEntry.city),
    })),
    defCity: cityEntry.defCity,
    slugCity: cityEntry.slugCity,
    city: cityEntry.city,
    regio:cityEntry.regio,
    regioDef:cityEntry.regioDef,
    slugRegio: cityEntry.slugRegio
  };


  // return <></>;
  return <ViewCity entry={entry} />;
}
