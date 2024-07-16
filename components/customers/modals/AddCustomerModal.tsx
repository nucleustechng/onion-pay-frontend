import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import React from "react";
import Input from "../../input fields/Input";
import Flag from "../../../Assets/img/Flag.svg";
import CloseIcon from "../../../Assets/icon/CloseIcon.svg";

interface Props {
  isVisible: boolean;
  onClose: () => {};
}

const AddCustomerModal = ({ isVisible, onClose }: Props) => {
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
        <div className="w-[33rem] h-[27.14rem] rounded-[0.63rem] bg-white">
          <div className="mx-6 my-6">
            <div className="flex items-center justify-between">
              <h1 className="text-[#262626] text-lg font-WorkSans font-medium leading-5">
                Add new customer
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
            <div className="flex flex-col gap-6 mt-6">
              <Input
                label="Customer name"
                placeholder="Customer name"
                type="text"
                horizontalPadding="px-6"
                width="w-[30rem]"
                height="h-[3.15rem]"
              />
              <Input
                label="Email address"
                placeholder="email@example.com"
                type="text"
                horizontalPadding="px-6"
                width="w-[30rem]"
                height="h-[3.15rem]"
              />
              <div>
                <h1 className="font-WorkSans font-normal text-sm leading-4 text-[#262626]">
                  Phone number
                </h1>
                <div className="flex items-center gap-2 mt-2">
                  <div className="flex items-center justify-center gap-4 w-[6.4rem] h-[3.15rem] border-[0.065rem] border-solid border-[#CACACA] rounded-[0.315rem]">
                    <div>
                      <Image src={Flag} alt="Nigerian flag" />
                    </div>
                    <div>
                      <FontAwesomeIcon icon={faChevronDown} />
                    </div>
                  </div>
                  <div>
                    <input
                      type="tel"
                      className="w-[23.25rem] h-[3.15rem] pl-6 border-[0.065rem] border-solid outline-none border-[#CACACA] rounded-[0.315rem]"
                      placeholder="+234"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-4 justify-end  mt-6">
              <button className="bg-[#F5F5F5] rounded-[0.315rem] w-[5.38rem] h-11 text-base text-[#262626] font-WorkSans font-normal">
                Cancel
              </button>
              <button className="bg-[#3063E9] rounded-[0.315rem] w-[9.32rem] h-11 text-base text-white font-WorkSans font-normal">
                Save customer
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddCustomerModal;
