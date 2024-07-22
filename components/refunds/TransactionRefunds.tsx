import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import HelpButton from "../HelpButton";
import Header from "../new/Header";
import RefundHeader from "./RefundHeader";
import RefundTable from "./RefundTable";
import SingleRefundModal from "./modals/SingleRefundModal";

const TransactionRefunds = () => {
  const [showModal, setShowModal] = useState(false);
  const [showEmpty] = useState(true);

  const handleLogRefund = () => {
    setShowModal(true);
  };

  const renderEmptyState = () => (
    <div className="w-full px-2 lg:px-6">
      <Header mainText="Refunds" />
      <div className="flex flex-col gap-5 mt-6 w-auto ">
        <div className="w-auto">
          <h1 className="text-[2rem] text-[#262626] font-WorkSans font-normal leading-9">
            You do not have any refunds yet.
          </h1>
        </div>
        <div className="w-[21rem]">
          <p className="text-base text-[#262626] font-WorkSans font-normal leading-5">
            You will see the record of all your refunds to your customers here
            when you log a refund.
          </p>
        </div>
        <div>
          <div
            className="flex items-center justify-center gap-3 w-[12.75rem] h-11 bg-primary rounded-[0.33rem] cursor-pointer"
            onClick={handleLogRefund}
          >
            <h1 className="text-base text-[#FFFFFF] font-normal font-WorkSans leading-5">
              Log a refund
            </h1>
            <FontAwesomeIcon icon={faPlus} className="text-[#FFFFFF] w-5 h-5" />
          </div>
        </div>
        <div className="flex justify-center items-center">
          <SingleRefundModal
            isVisible={showModal}
            onClose={async () => setShowModal(false)}
          />
        </div>
      </div>
      <div className="fixed left-auto top-2/3 right-0 mr-7 z-30 mt-[8.5rem]">
        <HelpButton />
      </div>
    </div>
  );

  const renderContent = () => (
    <div className="w-full mt-5 lg:mt-7 px-2 lg:px-6">
      <div className="w-screen sm:w-[42rem] md:w-screen overflow-hidden xl:w-[72rem] mx-5 mt-4 lg:mt-7">
        <div>
          <Header mainText="Refunds" />
        </div>
        <div className="fixed left-auto top-3/4 right-0 mr-7 z-50 mt-[8.5rem]">
          <HelpButton />
        </div>
        <div className="ml-0 md:ml-2">
          <div className="flex flex-col gap-4 mt-6 ml-2 lg:ml-0 overflow-x-scroll xl:overflow-hidden">
            <RefundHeader />
            <RefundTable status="Successful" />
            <RefundTable status="Pending" />
          </div>
        </div>
      </div>
    </div>
  );

  return <div>{showEmpty ? renderEmptyState() : renderContent()}</div>;
};

export default TransactionRefunds;
