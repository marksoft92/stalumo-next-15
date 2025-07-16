"use client";

import Image from "next/image";

interface BeforeAfterImagesProps {
  beforeUrl: any;
  afterUrl: any;
  beforeLabel: any;
  afterLabel: any;
}

export default function BeforeAfterImages({
  beforeUrl,
  afterUrl,
  beforeLabel,
  afterLabel,
}: BeforeAfterImagesProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* BEFORE */}
      <div className="relative aspect-[4/3] overflow-hidden rounded-xl border border-[#2e2e2e] shadow-md">
        <Image
          src={beforeUrl}
          alt={beforeLabel}
          fill
          className="object-cover"
           loading="lazy"
        />
         <div className="absolute top-4 left-4 bg-white text-red-600 border-2 border-red-600 text-sm px-3 py-1 rounded-full uppercase font-semibold tracking-wide">

          {beforeLabel}
        </div>
      </div>

      {/* AFTER */}
      <div className="relative aspect-[4/3] overflow-hidden rounded-xl border border-[#2e2e2e] shadow-md">
        <Image
          src={afterUrl}
          alt={afterLabel}
          fill
          className="object-cover"
           loading="lazy"
        />
    <div className="absolute top-4 left-4 bg-white text-red-600 border-2 border-red-600 text-sm px-3 py-1 rounded-full uppercase font-semibold tracking-wide">
    {afterLabel}
        </div>
      </div>
    </div>
  );
}
