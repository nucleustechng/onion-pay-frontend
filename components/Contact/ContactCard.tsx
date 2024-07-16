import Image from "next/image";
import React from "react";
import ArrowRight from "../../Assets/icons/ArrowRight.svg";

interface Props {
  backgroundColor: string;
  img: any;
  header: string;
  mainText: string;
  top: string;
  left: string;
  height?: string;
  borderRadius?: string;
}

const ContactCard = ({
  backgroundColor,
  img,
  header,
  mainText,
  top,
  left,
  height,
  borderRadius,
}: Props) => {
  return (
    <div>
      <div
        className={`relative w-[21.945rem] cursor-pointer  ${height ? height : "h-[8.75rem] xl:h-[9.5rem]"} ${backgroundColor} pl-[0.625rem] pt-[0.625rem] 
        ${borderRadius ? borderRadius : "rounded-[0.625rem]"}
        sm:w-[28rem] lg:w-[20rem] xl:w-[23.25rem] 
        `}
      >
        <div className="flex flex-col gap-[0.195rem]">
          <h1 className="text-xl text-white font-WorkSans font-medium leading-6">
            {header}
          </h1>
          <p
            className="text-sm text-white font-WorkSans font-normal leading-4
                lg:w-[10rem] xl:w-[18rem]
                "
          >
            {mainText}
          </p>
        </div>
        <div className={`absolute ${top} ${left}`}>
          <Image src={img} alt="" />
        </div>
        <div className="hidden xl:absolute xl:flex xl:top-[6.8rem] xl:rotate-90">
          <Image src={ArrowRight} alt="" />
        </div>
      </div>
    </div>
  );
};

export default ContactCard;
