import React from "react";
import { Link } from "@/i18n/routing";
import LazyBackground from "./lazyBackground";

interface RealizationBoxProps {
  iconUrl: string;
  title: string;
  subTitle: string;
  href: string | any;
}

const RealizationBox: React.FC<RealizationBoxProps> = ({
  iconUrl,
  title,
  subTitle,
  href,
}) => {
  return (
    <Link href={href}>

<LazyBackground
        imageUrl={iconUrl}
        className="realization-box-background relative flex items-start p-5 min-h-[320px] justify-end rounded-lg shadow-md flex-col border border-solid border-[#222222] bg-no-repeat bg-cover  bg-center h-full height-max-[320px] transition-all duration-900 ease-out hover:bg-[length:103%]"
      >
        <div className="flex  flex-col items-start z-[1]">
          <h4 className="text-[#EB4036] text-[1rem]  font-semibold uppercase">
            {subTitle}
          </h4>
          <h3 className="flex text-[2rem] font-semibold uppercase   my-[1rem] max-lg:text-[1.6rem]">
            {title}
          </h3>
        </div>
        </LazyBackground>


    </Link>
  );
};

export default RealizationBox;
