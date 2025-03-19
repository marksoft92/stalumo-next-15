import React from "react";
import Image from "next/image";
import { before } from "node:test";
import { isAbsolute } from "path";
import Link from "next/link";

interface RealizationBoxProps {
  iconUrl: string;
  title: string;
  subTitle: string;
  href: string;
}

const RealizationBox: React.FC<RealizationBoxProps> = ({
  iconUrl,
  title,
  subTitle,
  href,
}) => {
  return (
    <Link href={href}>
      <div
        className="realization-box-background relative flex items-start p-5 min-h-[320px] justify-end rounded-lg shadow-md flex-col border border-solid border-[#222222] bg-no-repeat bg-cover bg-center h-full height-max-[320px]"
        style={{ backgroundImage: `url(${iconUrl})` }}
      >
        <div className="flex  flex-col items-start z-[1]">
          <h4 className="text-[#EB4036] text-[1rem]  font-semibold uppercase">
            {subTitle}
          </h4>
          <h3 className="flex text-[2rem] font-semibold uppercase   my-[1rem]">
            {title}
          </h3>
        </div>
      </div>
    </Link>
  );
};

export default RealizationBox;
