import Image from "next/image";
import Link from "next/link";
import React from "react";
import ButtonIcon from "../components/Buttons/ButtonIcon";
import SendmoneyImg from "../Assets/img/sendmoney/Sendmoney.svg";
import CurvedArrow from "../Assets/img/sendmoney/CurvedArrow.svg";

const Sendmoney = () => {
  const listData = [
    {
      header: "Select the type of transfer you want to make",
      subText:
        "There are three types of transfer; Transfer to Bank account, transfer to Mobile money and transfer to Onion Pay account.",
    },
    {
      header: "Select who you would like to make a transfer to",
      subText: "Transfer to an individual, or transfer to Multiple people.",
    },
    {
      header: "Fill out the transfer form and send!",
      subText:
        "Fill out the details on the form provided and complete the transfer.",
    },
  ];

  type Props = {
    header: string;
    subText: string;
    itemNumber: number;
  };

  const ListComponent = ({ header, subText, itemNumber }: Props) => (
    <div className="flex items-start gap-7 mx-4 md:mx-[5rem]  xl:mx-[9.375rem] mt-8 md:mt-16 lg:mt-[5.625rem]">
      <div className="flex justify-center items-center w-8 h-8 md:w-11 md:h-11 bg-[#FF9635] rounded-full">
        <h1 className="text-white text-lg font-WorkSans font-normal leading-5">
          {itemNumber}
        </h1>
      </div>
      <div className="w-[18rem] md:w-[36rem]  flex flex-col gap-3">
        <h1 className="text-[#1B1A1A] text-xl md:text-2xl font-WorkSans font-semibold leading-6 md:leading-7">
          {header}
        </h1>
        <p className="text-xl text-[#1B1A1A] font-WorkSans font-normal leading-7">
          {subText}
        </p>
      </div>
    </div>
  );
  return (
    <div className="relative  mb-[45rem] xl:mb-[60rem]">
      <div className="hidden lg:absolute xl:left-[43rem] xl:bottom-[22rem]">
        <Image src={CurvedArrow} alt="Curved arrow" />
      </div>
      <div className="h-[30rem] md:h-[50rem] mt-32">
        <div className="lg:flex lg:justify-between ">
          <div className="flex flex-col gap-6  w-[22rem] md:w-[35rem] mx-4 md:pt-32 md:ml-[5rem] lg:ml-[4rem] xl:ml-[9.375rem]">
            <h1
              className="text-[3.2rem] md:text-[5rem]
                    text-[#303778] font-SpaceGrotesk 
                    font-bold leading-[3.5rem] md:leading-[5rem]"
            >
              Send money to <span className="text-[#FF9635]">anyone</span> or{" "}
              <span className="text-[#FF9635]">
                any business<span className="italic">!</span>
              </span>
            </h1>
            <p className="w-[22rem] md:w-[35rem] h-[1.875rem] text-lg  md:text-2xl text-[#1B1A1A] font-WorkSans font-normal  leading-[1.875rem]">
              Make single or bulk transfers to bank accounts from your Onion Pay
              dashboard.
            </p>
            <Link href="/auth/signup" className="mt-16 md:mt-8">
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
            <Image
              src={SendmoneyImg}
              loading="lazy"
              alt="Collect Payments Illustration"
            />
          </div>
        </div>
        <div className="mx-4 md:mx-[5rem]  xl:mx-[9.375rem] mt-6 md:mt-16 lg:mt-[3.325rem]">
          <h1 className="text-[#1B1A1A] text-4xl lg:text-[5rem] font-WorkSans font-normal leading-9 lg:leading-[4rem] xl:leading-[5.875rem]">
            Here are basic steps on Sending money
          </h1>
        </div>

        {listData.map((item, index) => (
          <div key={index}>
            <ListComponent
              itemNumber={index + 1}
              header={item.header}
              subText={item.subText}
            />
          </div>
        ))}
        <div className="mx-4 md:mx-[5rem]  xl:mx-[9.375rem] mt-6 md:mt-20 lg:mt-[9.325rem]">
          <Link href="/auth/signup">
            <ButtonIcon
              backgroundColor="bg-primary"
              color="text-white"
              width="w-[12.325rem]"
              height="h-11"
              mainText="Make a transfer"
            />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Sendmoney;
