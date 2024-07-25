import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import HomeIcon from "../../Assets/icon/Home.svg";

const HomeItem = () => {
  const router = useRouter();
  return (
    <div>
      {/* <div className='flex justify-center w-12 lg:hidden '>
            <div className='flex items-center lg:w-[1.1rem] lg:h-[1.5rem]'>
                <Image src={HomeIcon}  alt='Home Icon' className='w-[1.1rem] h-[1.5rem]'/>
            </div>
        </div> */}
      <div className="flex lg:flex">
        <Link href="/dashboard">
          <div className="flex justify-center lg:w-60">
            <div
              className={`w-[0.26rem] h-11 rounded-tr-lg rounded-br-lg ${router.pathname === "/dashboard" ? "bg-primary" : "bg-transparent"}`}
            />
            <div
              className={`flex items-center gap-[0.6rem] w-[13.5rem] h-[2.75rem] mx-4 px-2
                                ${router.pathname === "/dashboard" ? "bg-[#E7EDFF] rounded-[0.32rem]" : ""}
                                `}
            >
              <div className="flex items-center lg:w-[1.1rem] lg:h-[1.5rem]">
                <Image
                  src={HomeIcon}
                  alt="Home Icon"
                  className="w-[1.1rem] h-[1.5rem]"
                />
              </div>
              <h1 className="text-[#262626] text-base font-WorkSans">Home</h1>
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default HomeItem;
