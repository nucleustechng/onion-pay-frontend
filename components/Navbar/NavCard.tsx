import Image from "next/image";
import Link from "next/link";
import React from "react";

interface Props {
  header: string;
  mainText: string;
  icon: any;
  backgroundColor: string;
  alt: string;
  link: string;
}

const NavCard = ({
  header,
  mainText,
  icon,
  backgroundColor,
  alt,
  link,
}: Props) => {
  return (
    <div>
      <Link href={link} className="flex items-center gap-[0.1875rem]">
        <div
          className={`flex justify-center items-center w-[2.94rem] h-[2.94rem] rounded-[0.625rem] ${backgroundColor}`}
        >
          <div className="w-[2.1875rem] h-[2.1875rem]">
            <Image src={icon} alt={alt} />
          </div>
        </div>
        <div className="flex flex-col gap-[0.1875rem]">
          <h1 className="text-[#303778] text-base font-WorkSans font-medium leading-5">
            {header}
          </h1>
          <h2 className="text-primaryText text-sm font-WorkSans font-normal leading-4">
            {mainText}
          </h2>
        </div>
      </Link>
    </div>
  );
};

export default NavCard;
