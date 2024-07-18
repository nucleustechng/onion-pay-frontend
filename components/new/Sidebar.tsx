import Image from "next/image";
import React from "react";
import Logo from "../../Assets/logo/OnionPayLogo.svg";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../../@/components/ui/tooltip";
import { Button } from "../../@/components/ui/button";
import TransactionItem from "../SidebarItems/TransactionItem";
import TransfersItem from "../SidebarItems/TransfersItem";
import BalanceItem from "../SidebarItems/BalanceItem";
import BusinessItem from "../SidebarItems/BusinessItem";
import CorporateItem from "../SidebarItems/CorporateItem";
import PaymentItem from "../SidebarItems/PaymentItem";
import LogOutIcon from "../../Assets/icon/LogOut.svg";
import CustomToggle from "../CustomToggle";
import { ArrowUpIcon } from "lucide-react";
import SettingsItem from "../SidebarItems/SettingsItem";

type Props = {};

export default function Sidebar({}: Props) {
  return (
    <div className="hidden md:flex flex-col w-[280px] h-screen  pt-0  border border-r-[1px] overflow-y-auto">
      <div className="w-full px-5">
        <div className="flex items-center">
          <Image src={Logo} width={123} height={30} alt="Onion Pay Logo" />
        </div>
        <div className="flex flex-col gap-4">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger className="w-fit" asChild>
                <Button
                  variant="outline"
                  color="#3063E9"
                  className="font-WorkSans font-bold border-solid px-3  text-sm"
                >
                  Tier Wallet
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>
                  Single Inflow Limit: N50,000 Cumulative Balance Limit:
                  N300,000
                  {/* {walletTier === 1 */}
                  {/* ? "Single Inflow Limit: N50,000 Cumulative Balance Limit: N300,000" */}
                  {/* : "Single Inflow Limit: N5,000,000 Unlimited Cumulative Balance"} */}
                </p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <h1 className=" text-[#898989]  lg:text-sm">Menu</h1>
        </div>
      </div>

      <div className="flex flex-col gap-2 pt-4">
        <TransactionItem />
        <TransfersItem />
        <BalanceItem />
        <PaymentItem />
        <BusinessItem />
        <CorporateItem />
      </div>
      <div>
        <div
          className={`flex flex-col lg:flex-col gap-[1.63rem] lg:h-32  mt-8 }`}
        >
          <div className="flex justify-between items-center mx-6">
            <h1 className="text-base text-[#1B1A1A] font-WorkSans font-normal leading-5">
              {/* {isSwitchOn ? "Live Mode" : "Test Mode"} */}
              Test Mode
            </h1>
            {/* <CustomToggle
                value={isSwitchOn}
                onChange={switch_onChange_handle}
              /> */}
          </div>
          <hr className="border-solid border-[0.068rem] border-[#F5F0F3]" />

          <div
            //   onClick={openModal}
            className="flex items-center gap-5 pl-7 lg:gap-2 lg:pl-7 cursor-pointer "
          >
            <div className="flex items-center justify-center  rounded-full w-[1.5rem] h-[1.5rem] lg:w-[1.6rem] lg:h-[1.6rem]">
              <ArrowUpIcon className="text-primary w-5 h-5" />
            </div>
            <h1 className="text-primary text-base leading-[1.19rem] font-WorkSans font-normal">
              Upgrade wallet
            </h1>
          </div>
          <hr className="border-solid border-[0.068rem] border-[#F5F0F3]" />
          <div className="flex lg:flex  mt-0">
            <SettingsItem />
          </div>
          <div
            className="flex items-center gap-5 pl-7 lg:gap-2 lg:pl-7 cursor-pointer pb-12"
            //   onClick={logoutUser}
          >
            <div className="flex items-center justify-center bg-[#F31212] rounded-full w-[1.5rem] h-[1.5rem] lg:w-[1.6rem] lg:h-[1.6rem]">
              <Image
                src={LogOutIcon}
                alt="Settings"
                className="lg:w-[1.6rem] lg:h-[1.6rem]"
              />
            </div>
            <h1 className="text-[#262626] text-base leading-[1.19rem] font-WorkSans font-normal">
              Log out
            </h1>
          </div>
        </div>
      </div>
    </div>
  );
}
