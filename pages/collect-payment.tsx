import Image from "next/image";
import Link from "next/link";
import React from "react";
import ButtonIcon from "../components/Buttons/ButtonIcon";
import CollectPayments from "../Assets/img/collect-payments/CollectPayment.svg";

const CollectPayment = () => {
  return (
    <div>
      <div className="h-[30rem] md:h-[50rem] mt-32">
        <div className="lg:flex lg:justify-between ">
          <div className="flex flex-col gap-6  w-[10rem] mx-4 md:pt-32 md:ml-[5rem] lg:ml-[4rem] xl:ml-[9.375rem]">
            <h1
              className="text-[4rem] md:text-[5rem]
                    text-[#303778] font-SpaceGrotesk 
                    font-bold leading-[4.5rem] md:leading-[5rem]"
            >
              Collect payments{" "}
              <span className="text-[#FF9635]">
                anywhere<span className="italic">!</span>
              </span>
            </h1>
            <p className="w-[22rem] md:w-[26.125rem] h-[1.875rem] text-xl  md:text-2xl text-[#1B1A1A] font-WorkSans font-normal  leading-[1.875rem]">
              Receive money from anyone, at any time, anywhere in the world.
            </p>
            <Link href="/auth/signup" className="mt-8">
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
          <div className="hidden lg:flex lg:items-center">
            <Image src={CollectPayments} alt="Collect Payments Illustration" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CollectPayment;
