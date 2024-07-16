import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import React, { useState } from "react";
import CustomersHeader from "./CustomersHeader";
import CustomerTable from "./CustomerTable";
import DownloadIcon from "../../Assets/icon/Download.svg";
import AddCustomerModal from "./modals/AddCustomerModal";

const BlackListed = () => {
  const [showModal, setShowModal] = useState(false);

  return (
    <div>
      <div>
        <div className="flex items-center justify-between mt-3 mx-5 lg:mx-0">
          <h1 className="text-[#262626] text-xl font-WorkSans font-normal leading-6">
            5 customers
          </h1>
          <div className="flex gap-4">
            <div className="flex justify-between items-center ">
              <div className="flex justify-center items-center gap-4 rounded-[0.32rem] text-white bg-[#F5F5F5] w-[3.5rem] md:w-[9.15rem] h-11 text-base font-WorkSans font-normal leading-4">
                <h1 className="md:inline-flex  text-[#1B1A1A] text-sm font-WorkSans font-normal leading-4 hidden">
                  Download
                </h1>
                <div>
                  <Image src={DownloadIcon} alt="Download Icon" />
                </div>
              </div>
            </div>
            <div className="flex justify-between items-center ">
              <div
                className="flex justify-center items-center gap-4 rounded-[0.32rem] text-white bg-[#3063E9] w-[11.4rem] cursor-pointer h-11 text-base font-WorkSans font-normal leading-4"
                onClick={() => {
                  setShowModal(true);
                }}
              >
                <h1 className="text-white text-sm font-WorkSans font-normal leading-4">
                  New customer
                </h1>
                <div>
                  <FontAwesomeIcon icon={faPlus} />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-4 mt-6 ml-2 lg:ml-0 overflow-x-scroll xl:overflow-hidden ">
          <CustomersHeader />
          <div className="flex flex-col divide-y-2 divide-[#F5F0F3] mt-4">
            <CustomerTable isBlackList={true} />
            <CustomerTable isBlackList={true} />
            <CustomerTable isBlackList={true} />
          </div>
        </div>
        <AddCustomerModal
          isVisible={showModal}
          onClose={async () => setShowModal(false)}
        />
      </div>
    </div>
  );
};

export default BlackListed;
