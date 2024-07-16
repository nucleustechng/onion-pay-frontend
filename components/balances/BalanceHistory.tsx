import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import React from "react";
import SearchIcon from "../../Assets/icon/Search.svg";
import BalanceHistoryHeader from "./BalanceHistoryHeader";
import DownloadIcon from "../../Assets/icon/Download.svg";
import BalanceHistoryTable from "./BalanceHistoryTable";
import { useAppDispatch, useAppSelector } from "../../redux/redux-hooks/hooks";
import { RootState } from "../../redux/store";
import { setShowSidebar } from "../../redux/sidebarSlice";
import Hamburger from "../../Assets/icon/HamburgerIcon.svg";

const MyBalanceHistory = () => {
  const dispatch = useAppDispatch();
  const sidebarShow = useAppSelector(
    (state: RootState) => state.sidebar.sidebarShow,
  );
  return (
    <div>
      <div className="w-[28rem] sm:w-[38rem] md:w-[45rem] lg:w-[58rem] xl:w-[71.5rem] mx-6">
        <div className="flex flex-col mt-5 lg:flex lg:flex-row lg:items-center  lg:mt-6 lg:justify-between">
          <div className="flex justify-between items-center ml-0  mb-5  lg:mb-5">
            <h1 className="text-[#262626] text-[2rem] font-WorkSans font-medium leading-9">
              Balance history
            </h1>
            {!sidebarShow && (
              <div
                className="mr-4  sm:mr-10 md:mr-5 lg:hidden"
                onClick={() => dispatch(setShowSidebar(true))}
              >
                <Image src={Hamburger} alt="Hamburger Icon" />
              </div>
            )}
          </div>
          <div className="flex items-center gap-[1.13rem] mt-5">
            <div className="flex gap-0 md:gap-4 ">
              <div className="w-[18.8rem] md:w-[34.5rem] h-11 flex items-center  rounded-[0.65rem]">
                <div className="absolute  pl-[1.13rem] ">
                  <Image
                    src={SearchIcon}
                    alt="Search Icon"
                    className="w-5 h-5"
                  />
                </div>
                {/* <FontAwesomeIcon icon={faSearch} className='absolute pl-[1.13rem] text-2xl '/> */}
                <input
                  type="text"
                  className="w-[17rem] sm:w-[18.8rem] md:w-[40rem] h-11 text-sm font-normal font-WorkSans pl-12 leading-4 rounded-[0.65rem] border-solid border-[0.07rem] border-[#F5F5F5]"
                  placeholder="Search"
                />
              </div>
              <div>
                <div className="flex justify-center items-center w-[9.4rem] h-11 rounded-[0.32rem] bg-[#F5F5F5]">
                  <div className="flex items-center gap-7">
                    <h1 className="text-sm">Last 7 days</h1>
                    <FontAwesomeIcon icon={faChevronDown} className="text-sm" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex items-center justify-end mt-12 ">
          <div className="flex gap-4">
            <div>
              <div className="flex  items-center w-[9.4rem] h-11 rounded-[0.32rem] bg-[#F5F5F5]">
                <div className="flex  items-center mx-4 gap-20">
                  <h1 className="text-sm">All</h1>
                  <FontAwesomeIcon icon={faChevronDown} className="text-sm" />
                </div>
              </div>
            </div>
            <div className="flex justify-between items-center ">
              <div className="flex justify-center items-center gap-4 rounded-[0.32rem] text-white bg-[#F5F5F5] w-[9.15rem] h-11 text-base font-WorkSans font-normal leading-4">
                <h1 className="text-sm text-[#1B1A1A] font-WorkSans font-normal font">
                  Download
                </h1>
                <div>
                  <Image src={DownloadIcon} alt="Download Icon" />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="overflow-x-scroll xl:overflow-hidden">
          <BalanceHistoryHeader />
          <div className="mt-6">
            <BalanceHistoryTable />
            <hr className="border-[#F5F5F5]" />
            <BalanceHistoryTable />
            <hr className="border-[#F5F5F5]" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyBalanceHistory;
