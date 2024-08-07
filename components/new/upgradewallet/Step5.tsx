import CloseIcon from "../../../Assets/icon/CloseIcon.svg"; // Update path if necessary

import { Progress } from "antd"; // Assuming you're using Ant Design for Progress component
import {  ChevronLeftIcon } from "lucide-react";
import Image from "next/image";
// import { Button } from "../../../@/components/ui/button";
import { useEffect } from "react";

interface Step5Props {
  progress: number;
  handleSubmit: () => void; // Add your form submission logic here
  setSteps: (step: number) => void;
  closeModal: () => void;
}

export default function Step5({ progress, setSteps, closeModal,handleSubmit }:Step5Props){
  useEffect(() => {
    handleSubmit()
  },[])
  return (<div>
    <div className="flex justify-between items-center">
      <div className="flex items-center gap-6">
        <ChevronLeftIcon
          className="cursor-pointer"
          onClick={() => setSteps(3)}
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
          Step 5 of 6
        </h1>
      </div>
      <div>
        <h1 className="text-base text-[#1B1A1A] text-center font-WorkSans font-medium leading-5">
          Progress
        </h1>
      </div>
    </div>
    <div className="mt-6">
      <Progress percent={progress} showInfo={false} strokeColor="#3063E9" />
      <div className="flex justify-between mt-4">
        <h1 className="text-xs text-[#898989] font-WorkSans">
          Upload all files
        </h1>
        <h1 className="text-xs text-[#898989] font-WorkSans">
          {progress}% Complete
        </h1>
      </div>
    </div>
    {/* <div className="flex justify-end mt-6">
      <Button onClick={() => handleSubmit()} className="w-[94px] text-white">
        Next
        <ArrowRightIcon className="w-5 h-5 ml-2" />
      </Button>
    </div> */}
  </div>)
}


