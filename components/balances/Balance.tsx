import NextImage from "next/image";
import React, { useState } from "react";
// import UpgradeWalletModal from "./modals/UpgradeWalletModal";
import { useLoadWalletQuery } from "../../modules/WalletApi";
import { Button } from "../../@/components/ui/button";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../../@/components/ui/popover";
import { Calendar } from "../../@/components/ui/calendar";
// import { upgradeWalletTest } from "../../modules/upgradeWallet";
import FundBalanceModal from "./modals/FundBalanceModal";
import { BalanceTable } from "../Tables/BalanceTable";
import { useQuery } from "@tanstack/react-query";
import { getBalances } from "../../modules/balancesApi";
import { ReloadIcon } from "@radix-ui/react-icons";
import useBalanceHooks from "./useBalanceHooks";
import DownloadIcon from "../../Assets/icon/Download.svg";
import Header from "../new/Header";

const Balance = () => {
  const [showModal, setShowModal] = useState<boolean>(false);
  // const [isDownload, setIsDownload] = useState<boolean>(true);
  const { downloadBalanceHistory, isDownloading } = useBalanceHooks();

  const [downloadDate, setDownloadDate] = useState<any>({
    from: null,
    to: null,
  });
  const handleDownloadDate = (selectedDate: any) => {
    if (downloadDate.from === null) {
      // Selecting start date
      setDownloadDate((prevState: any) => ({
        ...prevState,
        from: selectedDate.from,
      }));
    } else {
      // Selecting end date
      if (downloadDate.from === selectedDate.to) {
        // Resetting from date
        setDownloadDate((prevState: any) => ({ ...prevState, from: null }));
      } else {
        // Setting to date and making filter request
        setDownloadDate((prevState: any) => ({
          ...prevState,
          to: selectedDate.to,
        }));

        // Call your filter function with start and end dates
        // Convert start and end dates to timestamps
        const startTimestamp = Date.parse(downloadDate.from);
        const endTimestamp = Date.parse(selectedDate.to);
        // setFilterMore({ start: startTimestamp, end: endTimestamp });
        // if (isDownload) {
        downloadBalanceHistory({ start: startTimestamp, end: endTimestamp });
        // }
        // else {
        // 	filterByDate({ start: startTimestamp, end: endTimestamp });
        // 	setFilterMore({ start: startTimestamp, end: endTimestamp });
        // }
        setTimeout(() => {
          setDownloadDate({
            from: null,
            end: null,
          });
        }, 1000);
      }
    }
  };

  const { data: walletData } = useLoadWalletQuery();

  const walletBalance = walletData
    ? walletData["wallet"]?.balance_string
    : "--";
  const walletNumber = walletData ? walletData["wallet"]?.walletNumber : "--";
  const walletName = walletData ? walletData["wallet"]?.walletName : "---";

  const { data: balances, isLoading: isBalanceLoading } = useQuery({
    queryKey: ["balances"],
    queryFn: getBalances,
  });

  return (
    <div className="">
      <div className="flex flex-col w-full h-screen overflow-y-auto px-2 lg:px-6">
        <Header mainText="Balance" />
        <div className="flex flex-wrap gap-4 items-center justify-between pb-2">
          <div>
            <h1 className="text-[24px] text-[#1B1A1A] font-semibold font-WorkSans">
              <span style={{ fontSize: "16px", marginRight: "4px" }}>
                &#8358;
              </span>
              <span>{walletBalance ? walletBalance?.slice(1) : "****"}</span>
            </h1>
          </div>
          <div className="flex items-center gap-4 md:gap-6">
            <div className="flex items-center gap-4">
              {/* <button className="w-[8.3rem] h-11 text-sm text-[#1B1A1A] font-WorkSans font-normal leading-5 bg-[#F5F5F5] rounded-[0.32rem]">
							Set low limit
						</button> */}
              <Button
                className="hidden md:flex text-sm text-white font-WorkSans font-normal leading-5 bg-[#3063E9]"
                onClick={() => {
                  setShowModal(true);
                }}
              >
                Fund balance
              </Button>
              <Button
                className="flex md:hidden text-sm text-white font-WorkSans font-normal leading-5 bg-[#3063E9]"
                onClick={() => {
                  setShowModal(true);
                }}
              >
                Fund
              </Button>
            </div>
            <div className="flex items-center gap-4">
              <Popover>
                {/* <PopoverTrigger asChild>
									<Button
										// variant={"outline"}
										className="bg-[#F5F5F5] text-primary-foreground"
									>
										Filter By Date
										<CalendarIcon className="ml-2 h-4 w-4" />
										{date?.from ? (
									format(date?.from, "PPP")
								) : (
									<span>Pick a date</span>
								)} 
									</Button>
								</PopoverTrigger> */}
                <PopoverTrigger
                  // onClick={() => {
                  // 	setIsDownload(true);
                  // }}
                  asChild
                >
                  <Button
                    disabled={isDownloading}
                    className="bg-[#F5F5F5] text-primary-foreground"
                  >
                    Download
                    {isDownloading ? (
                      <ReloadIcon className="ml-4 h-4 w-4 animate-spin" />
                    ) : (
                      <NextImage
                        src={DownloadIcon}
                        alt="Download Icon"
                        className="ml-4"
                      />
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="range"
                    selected={downloadDate}
                    onSelect={handleDownloadDate}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>
        </div>
        <hr className="border-[#898989]" />

        {/* <div
          onClick={openModal}
          className="flex items-center gap-2 cursor-pointer mt-5 mb-5"
        >
          <div className="flex items-center gap-1">
            <NextImage
              src={InfoCircle}
              width={14}
              height={14}
              alt="Info circle icon"
            />
            <h1 className="text-primary text-xs font-WorkSans font-normal leading-4">
              Upgrade Wallet
            </h1>
          </div>
          <FontAwesomeIcon
            icon={faArrowRight}
            className="w-5 h-5 text-primary"
          />
        </div> */}
        <BalanceTable
          balances={balances}
          showMore={() => {}}
          isLoading={isBalanceLoading}
        />
        <div>
          <FundBalanceModal
            isVisible={showModal}
            walletName={walletName}
            walletNumber={walletNumber}
            onClose={async () => setShowModal(false)}
          />
        </div>
      </div>
    </div>
  );
};

export default Balance;
