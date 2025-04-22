import React from "react";
import Image from "next/image";

interface IconBoxProps {
  iconUrl: string;
  title: string;
  description: string;
}

const IconBox: React.FC<IconBoxProps> = ({ iconUrl, title, description }) => {
  return (
    <div className="flex items-center p-10  rounded-lg shadow-md flex-col border border-solid border-[#222222]">
      <Image
        src={iconUrl}
        width={70}
        height={70}
        alt="Icon"
        loading="lazy"
      />
      <div className="flex items-center flex-col">
        <h3 className="flex text-[1.6rem] font-semibold text-center  my-[1rem]">
          {title}
        </h3>
        <p className="text-[#A5A5A5]">{description}</p>
      </div>
    </div>
  );
};

export default IconBox;
