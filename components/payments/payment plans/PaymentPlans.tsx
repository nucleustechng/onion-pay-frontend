import { faChevronDown, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import React from "react";
import DownloadIcon from "../../../Assets/icon/Download.svg";
import PaymentPlanHeader from "./PaymentPlanHeader";
import PaymentPlanTable from "./PaymentPlanTable";

const PaymentPlans = () => {
  return (
    <div>
      <div className="lg:mx-6 lg:mt-6">
        <div>
          <h1 className="text-[#262626] lg:text-[2rem] font-WorkSans font-medium leading-9">
            Payment Plans
          </h1>
        </div>
        <div className="flex lg:gap-[32rem] items-center mt-[3.2rem]">
          <h1 className="text-base text-[#262626] font-WorkSans font-normal leading-5">
            3 payment plans
          </h1>
          <div className="flex gap-4   items-center ">
            <div className="flex justify-between items-center ">
              <div className="flex justify-center items-center gap-4 rounded-[0.32rem] bg-[#F5F5F5] text-black  w-[9.15rem] h-11 text-base font-WorkSans font-normal leading-4">
                <h1>Download</h1>
                <div>
                  <Image src={DownloadIcon} alt="Download Icon" />
                </div>
              </div>
            </div>
            <div>
              <div className="flex  items-center lg:w-[12.5rem] lg:h-11 rounded-[0.32rem] bg-[#F5F5F5] ">
                <div className="flex  items-center mx-4 gap-4">
                  <h1 className="text-base font-WorkSans font-normal text-[#262626]">
                    All payment links
                  </h1>
                  <FontAwesomeIcon
                    icon={faChevronDown}
                    className="text-base text-[#262626]"
                  />
                </div>
              </div>
            </div>
            <div>
              <div className="flex  items-center lg:w-[13.2rem] lg:h-11 rounded-[0.32rem] bg-[#3063E9] ">
                <div className="flex  items-center mx-4 gap-4">
                  <h1 className="text-base font-WorkSans font-normal text-white">
                    New payment plan
                  </h1>
                  <FontAwesomeIcon
                    icon={faPlus}
                    className="text-base text-white"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div>
          {/* Payment table */}
          <PaymentPlanHeader />
          <div className="mt-6 ">
            <PaymentPlanTable />
            <hr />
            <PaymentPlanTable />
            <hr />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentPlans;
