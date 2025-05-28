// app/components/ProductCard.tsx
import Image from "next/image";
import Link from "next/link";

type ProductCardProps = {
  title: string;
  description: string;
  imageUrl: string;
  price: number;
  slug: string;
  currency: string;
};

export default function ProductCard({
  title,
  description,
  imageUrl,
  price,
  slug,
  currency
}: ProductCardProps) {
  return (
    <Link href={`${slug}`} className="block group">
      <div  className="bg-neutral-800 p-4 rounded-lg text-center">
              <Image
                src={imageUrl}
                alt={title}
                width={300}
                height={300}
                className="w-full h-52 object-cover rounded-md mb-4"
              />
              <h3 className="text-white font-semibold mb-1">{title}</h3>
              <p className="text-red-500 font-bold"> {price.toFixed(2) +' ' + currency} </p>
              <button className="mt-3 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-full text-sm">
                Zobacz produkt
              </button>
            </div>
    </Link>
  );
}
