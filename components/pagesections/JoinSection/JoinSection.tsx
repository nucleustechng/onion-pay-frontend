import ButtonIcon from "../../Buttons/ButtonIcon";
import React from "react";
import Link from "next/link";

const JoinSection = () => {
  return (
    <div className="flex justify-center  ">
      <div
        className="w-[21.875rem] h-[17.125rem] bg-[#F5F5F5] rounded-[1.255rem] p-5
        sm:w-[37rem] md:w-[45rem] xl:w-[71.25rem] xl:pl-[3.75rem] xl:pt-[3.75rem] xl:h-[22.875rem]
        "
      >
        <h1
          className="text-[2.75rem] text-[#1B1A1A] font-SpaceGrotesk font-bold leading-[2.75rem]
            md:text-[3rem] xl:text-[4.625rem]
            "
        >
          Are you ready to
          <span className="text-primary"> head in?</span>
        </h1>
        <p
          className="text-primaryText text-base text-left font-WorkSans font-normal leading-5 mt-4
            md:text-xl xl:pt-6 xl:w-[35rem] mb-6 
            "
        >
          Create an account to instantly start accepting payments, and build a
          successful business.
        </p>
        <Link href="/auth/signup">
          <ButtonIcon
            width="w-[10.2rem]"
            height="h-11"
            mainText="Get started"
            backgroundColor="bg-primary"
            color="text-white"
            textSize="text-base"
          />
        </Link>
      </div>
    </div>
  );
};

export default JoinSection;
