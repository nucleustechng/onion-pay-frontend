import { faCalendar, faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import React from "react";
import HelpButton from "../HelpButton";
import SearchIcon from "../../Assets/icon/Search.svg";
import { useAppDispatch, useAppSelector } from "../../redux/redux-hooks/hooks";
import { RootState } from "../../redux/store";
import Hamburger from "../../Assets/icon/HamburgerIcon.svg";
import { setShowSidebar } from "../../redux/sidebarSlice";
import ChargebackHeader from "./ChargebackHeader";
import ChargebackTable from "./ChargebackTable";

const ChargeBacks = () => {
  const dispatch = useAppDispatch();
  const sidebarShow = useAppSelector(
    (state: RootState) => state.sidebar.sidebarShow,
  );

  return (
    <div>
      <div className="">
        <div className="w-screen  sm:w-[42rem] md:w-screen     overflow-hidden xl:w-[72rem] mx-5 mt-4 lg:mt-7">
          <div className="flex flex-col lg:flex xl:flex xl:flex-row  mx-1 md:mx-3 lg:mx-5 lg:flex-col lg:justify-between">
            <div className="flex justify-between items-center ml-0  mb-5  lg:mb-5">
              <h1 className="text-[#262626] text-[2rem] font-WorkSans font-medium leading-9">
                Chargebacks
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
            {/* Small screen search input */}
            <div className="w-[21rem] h-11  sm:w-[35rem] flex items-center  rounded-[0.65rem] md:hidden lg:hidden">
              <div className="absolute  pl-[0.7rem] ">
                <Image src={SearchIcon} alt="Search Icon" className="w-4 h-4" />
              </div>
              <input
                type="text"
                className="w-screen h-11 text-sm font-normal font-WorkSans pl-10 leading-4 rounded-[0.32rem] border-solid border-[0.07rem] border-[#CACACA]"
                placeholder="Search"
              />
            </div>
            <div className="flex flex-col">
              <div className="flex flex-row gap-3 mt-4  lg:gap-3 lg:mt-0">
                <div className="hidden  md:flex  md:items-center md:w-[15rem] md:h-11  lg:w-[18.75rem] lg:h-11 lg:flex lg:items-center  lg:rounded-[0.65rem]">
                  <div className="absolute  pl-[0.7rem] ">
                    <Image
                      src={SearchIcon}
                      alt="Search Icon"
                      className="w-4 h-4"
                    />
                  </div>
                  <input
                    type="text"
                    className="w-[18.75rem] h-11 text-sm font-normal font-WorkSans pl-10 leading-4 rounded-[0.32rem] border-solid border-[0.07rem] border-[#CACACA]"
                    placeholder="Search"
                  />
                </div>
                <div>
                  <div className="flex justify-center items-center w-[3.7rem] h-9  md:w-[9.4rem] md:h-11 lg:ml-0 lg:w-[9.4rem] lg:h-11 rounded-[0.32rem] bg-[#F5F5F5]">
                    <div className="flex items-center gap-3 md:gap-7 lg:gap-7">
                      <h1 className="hidden md:inline-flex md:text-sm lg:inline-flex lg:text-sm">
                        Last 7days
                      </h1>
                      <FontAwesomeIcon
                        className="w-5 h-5 inline-flex md:hidden lg:hidden "
                        icon={faCalendar}
                      />
                      <FontAwesomeIcon
                        icon={faChevronDown}
                        className="text-sm w-5 h-5"
                      />
                    </div>
                  </div>
                </div>
                <div>
                  <div className="w-[3.7rem] h-9 md:w-[9.4rem]  md:h-11 lg:w-[9.4rem] lg:h-11 rounded-[0.32rem] bg-[#F5F5F5]">
                    <div className="flex items-center justify-center pt-2 gap-3 md:pt-3 md:gap-20 lg:gap-20">
                      <h1 className="text-sm">All</h1>
                      <FontAwesomeIcon
                        icon={faChevronDown}
                        className="text-sm w-5 h-5"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="fixed left-auto top-3/4 right-0 mr-7 z-50 mt-[8.5rem]">
            <HelpButton />
          </div>
          <div className="ml-0 md:ml-2">
            <div className="flex flex-col gap-4 mt-6 ml-2 lg:ml-0 overflow-x-scroll xl:overflow-hidden ">
              <ChargebackHeader />
              <ChargebackTable status="Successful" />
              <ChargebackTable status="Pending" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChargeBacks;
