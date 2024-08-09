import React from "react";
import {  toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CloseIcon from "../../../Assets/icon/CloseIcon.svg"; // Update path if necessary
import { ArrowRightIcon, ChevronLeftIcon } from "lucide-react";
import Image from "next/image";
import { Button } from "../../../@/components/ui/button";
import { Input } from "../../../@/components/ui/input";

interface Step4Props {
  setSteps: (step: number) => void;
  closeModal: () => void;
  handleAddressChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  address: {
    houseNumber: number;
    streetName: string;
    city: string;
    localGovernment: string;
    nearestLandmark: string;
    state: string;
  };
}

const Step4: React.FC<Step4Props> = ({
  setSteps,
  closeModal,
  handleAddressChange,
 
  address,
}) => {
  const validateForm = () => {
    let hasError = false;

    if (!address.houseNumber) {
      toast.error("Please enter the house number.");
      hasError = true;
    }
    if (!address.streetName) {
      toast.error("Please enter the street name.");
      hasError = true;
    }
    if (!address.city) {
      toast.error("Please enter the city.");
      hasError = true;
    }
    if (!address.localGovernment) {
      toast.error("Please enter the local government.");
      hasError = true;
    }
    if (!address.nearestLandmark) {
      toast.error("Please enter the nearest landmark.");
      hasError = true;
    }
    if (!address.state) {
      toast.error("Please enter the state.");
      hasError = true;
    }

    if (hasError) return;

    setSteps(4)
  };

  return (
    <div>

      <div className="flex justify-between items-center">
        <div className="flex items-center gap-6">
          <ChevronLeftIcon
            className="cursor-pointer"
            onClick={() => setSteps(2)}
          />
          <h1 className="text-lg text-[#262626] font-WorkSans font-medium leading-5">
            Upgrade your wallet
          </h1>
        </div>
        <div>
          <Image
            src={CloseIcon} // Adjust the path to your Close Icon
            className="cursor-pointer"
            onClick={closeModal}
            alt="Close Icon"
          />
        </div>
      </div>
      <div className="flex items-center gap-[2.3rem] md:gap-[4.2rem] mt-6">
        <div className="flex items-center justify-center w-[5.32rem] h-5 rounded-[1.25rem] border-primary border-[0.065rem]">
          <h1 className="text-primary text-sm font-WorkSans font-normal leading-4">
            Step 4 of 6
          </h1>
        </div>
        <div>
          <h1 className="text-base text-[#1B1A1A] text-center font-WorkSans font-medium leading-5">
            Address info
          </h1>
        </div>
      </div>
      <div className="mt-6">
        <Input
          type="text"
          id="houseNumber"
          placeholder="House Number"
          name="houseNumber"
          onChange={handleAddressChange}
          className="w-full h-[3.13rem] border-solid border-[#CACACA] border-[0.063rem] rounded-[0.32rem] px-4 mb-4"
        />
        <Input
          type="text"
          id="streetName"
          placeholder="Street Name"
          name="streetName"
          onChange={handleAddressChange}
          className="w-full h-[3.13rem] border-solid border-[#CACACA] border-[0.063rem] rounded-[0.32rem] px-4 mb-4"
        />
        <Input
          type="text"
          id="city"
          placeholder="City"
          name="city"
          onChange={handleAddressChange}
          className="w-full h-[3.13rem] border-solid border-[#CACACA] border-[0.063rem] rounded-[0.32rem] px-4 mb-4"
        />
        <Input
          type="text"
          id="localGovernment"
          placeholder="Local Government"
          name="localGovernment"
          onChange={handleAddressChange}
          className="w-full h-[3.13rem] border-solid border-[#CACACA] border-[0.063rem] rounded-[0.32rem] px-4 mb-4"
        />
        <Input
          type="text"
          id="nearestLandmark"
          placeholder="Nearest Landmark"
          name="nearestLandmark"
          onChange={handleAddressChange}
          className="w-full h-[3.13rem] border-solid border-[#CACACA] border-[0.063rem] rounded-[0.32rem] px-4 mb-4"
        />
        <Input
          type="text"
          id="state"
          placeholder="State"
          name="state"
          onChange={handleAddressChange}
          className="w-full h-[3.13rem] border-solid border-[#CACACA] border-[0.063rem] rounded-[0.32rem] px-4 mb-4"
        />
      </div>
      <div className="flex justify-end mt-6">
        <Button onClick={validateForm} className="w-[94px] text-white">
          Next
          <ArrowRightIcon className="w-5 h-5 ml-2" />
        </Button>
      </div>
    </div>
  );
};

export default Step4;
