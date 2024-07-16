import Image from "next/image";
import React from "react";
import CloseIcon from "../../../Assets/icon/CloseIcon.svg";
import Verify from "../../../Assets/img/VerifyTimeSquare.svg";

interface Props {
  isVisible: boolean;
  onClose: () => {};
}

const Verifying = ({ isVisible, onClose }: Props) => {
  const handleClose = (e: any) => {
    if (e.target.id === "wrapper") {
      onClose();
    }
  };

  if (!isVisible) return null;
  return (
    <div>
      <div
        className="fixed inset-0 bg-[#262626] bg-opacity-50 backdrop-blur-[0.05rem] flex justify-center items-center"
        id="wrapper"
        onClick={handleClose}
      >
        <div className="w-[25rem] h-[19rem] rounded-[0.63rem] bg-white">
          <div className="mx-6 mt-6">
            <div className="relative flex justify-center items-center">
              <h1 className="w-[14rem] text-xl text-[#1B1A1A] text-center font-WorkSans font-semibold leading-6">
                We are now verifying your details
              </h1>
              <div
                className="absolute left-[20rem] cursor-pointer right-0"
                onClick={() => {
                  onClose();
                }}
              >
                <Image src={CloseIcon} alt="Close Icon" />
              </div>
            </div>
            <div className="flex justify-center mt-10">
              <Image src={Verify} alt="Verify account" />
            </div>
            <div className="flex flex-col gap-3 mt-6">
              <p className="text-base text-[#1B1A1A] text-center font-WorkSans font-normal leading-5">
                We will send you an email once we are done verifying your
                documents.
              </p>
            </div>
            <div className="flex justify-center mt-6">
              <button
                onClick={() => onClose()}
                className="w-[22rem] h-11 bg-[#3063E9] rounded-[0.313rem] text-base text-white font-WorkSans font-normal leading-5"
              >
                Continue
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Verifying;
