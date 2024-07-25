import Image from "next/image";
import React from "react";
import CloseIcon from "../../../Assets/icon/CloseIcon.svg";

interface Props {
  isVisible: boolean;
  onClose: () => {};
  walletNumber: string;
  walletName: string;
}

const FundBalanceModal = ({
  isVisible,
  onClose,
  walletNumber,
  walletName,
}: Props) => {
  const handleClose = (e: any) => {
    if (e.target.id === "wrapper") {
      onClose();
    }
  };
  if (!isVisible) return null;
  return (
    <div>
      <div
        className="fixed inset-0 bg-[#262626] bg-opacity-50 backdrop-blur-[0.05rem] flex justify-center pt-16 overflow-y-scroll "
        id="wrapper"
        onClick={handleClose}
      >
        <div className="w-[28rem] lg:w-[33.01rem] h-[28.14rem] rounded-[0.63rem] bg-white ">
          <div className="mx-6 my-6">
            <div className="flex items-center justify-between mb-8">
              <h1 className="text-lg text-[#262626] font-WorkSans font-medium leading-5">
                NGN wallet funding
              </h1>
              <div>
                <Image
                  src={CloseIcon}
                  className="cursor-pointer"
                  onClick={() => {
                    onClose();
                  }}
                  alt="Close Icon"
                />
              </div>
            </div>
            <p className="text-base text-[#262626] font-WorkSans font-normal leading-5">
              Your customers can pay you with this account number. You can also
              fund your NGN balance by doing a transfer to the account number.
            </p>

            <div className="flex flex-col gap-6 mt-6">
              <div>
                <h1 className="text-base text-[#3063E9] font-WorkSans font-medium leading-5">
                  Account Details
                </h1>
                {/* Infer type of value gotten from input field to number */}
                <div className="flex flex-col gap-4 mt-4">
                  <div className="flex items-center justify-between">
                    <h1 className="text-sm text-[#898989] font-WorkSans font-normal leading-4">
                      Wallet Name
                    </h1>
                    <h2 className="text-sm text-[#262626] font-WorkSans font-normal leading-5">
                      {walletName}
                    </h2>
                  </div>
                  <hr className="border-[#898989] " />

                  <div className="flex items-center justify-between">
                    <h1 className="text-sm text-[#898989] font-WorkSans font-normal leading-4">
                      Wallet Number
                    </h1>
                    <h2 className="text-sm text-[#262626] font-WorkSans font-normal leading-5">
                      {walletNumber}
                    </h2>
                  </div>
                  <hr className="border-[#898989] " />
                  <div className="flex items-center justify-between">
                    <h1 className="text-sm text-[#898989] font-WorkSans font-normal leading-4">
                      Bank Name
                    </h1>
                    <h2 className="text-sm text-[#262626] font-WorkSans font-normal leading-5">
                      9 Payment Service Bank
                    </h2>
                  </div>
                  <hr className="border-[#898989] " />
                </div>
              </div>
            </div>
            <div className="flex justify-end" onClick={() => onClose()}>
              <div className="flex justify-center items-center cursor-pointer mt-6 rounded-[0.313rem] w-[4.75rem] h-11 bg-[#F5F5F5]">
                <h1 className="text-base text-[#262626] font-WorkSans font-normal leading-5">
                  Close
                </h1>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FundBalanceModal;
