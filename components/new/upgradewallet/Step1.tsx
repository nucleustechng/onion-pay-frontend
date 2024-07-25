import React, { useState } from "react";
import { ChevronLeftIcon } from "lucide-react";
import Image from "next/image";
import CloseIcon from "../../../Assets/icon/CloseIcon.svg"; // Update path if necessary
import { Button } from "../../../@/components/ui/button";

interface Step1Props {
  selfie: File | null;
  handleSelfieClick: () => void;
  selfieChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  hiddenSelfieInput: React.RefObject<HTMLInputElement>;
  setSteps: (step: number) => void;
  closeModal: () => void;
}

const Step1: React.FC<Step1Props> = ({
  selfie,
  handleSelfieClick,
  selfieChange,
  hiddenSelfieInput,
  setSteps,
  closeModal,
}) => {
  const [error, setError] = useState<string | null>(null);

  const handleNextClick = () => {
    if (!selfie) {
      setError("Please upload a selfie.");
      return;
    }
    setError(null);
    setSteps(1);
  };

  return (
    <div>
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-6">
          <ChevronLeftIcon
            className="cursor-pointer"
            onClick={() => setSteps(0)}
          />
          <h1 className="text-lg text-[#262626] font-WorkSans font-medium leading-5">
            Upgrade your wallet
          </h1>
        </div>
        <div>
          <Image
            src={CloseIcon} // Adjust the path to your Close Icon
            className="cursor-pointer"
            onClick={() => closeModal()}
            alt="Close Icon"
          />
        </div>
      </div>
      <div className="flex flex-col items-center mt-6">
        <div className="flex flex-col items-center">
          <div className="relative">
            <input
              type="file"
              accept="image/*"
              ref={hiddenSelfieInput}
              onChange={(e) => {
                selfieChange(e);
                setError(null); // Clear error on new file select
              }}
              className="hidden"
            />
            <div
              className="w-[14.5rem] h-[14.5rem] bg-gray-100 flex justify-center items-center cursor-pointer"
              onClick={handleSelfieClick}
            >
              {selfie ? (
                <img
                  src={URL.createObjectURL(selfie)}
                  alt="Selfie Preview"
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="text-gray-400">Upload Selfie</div>
              )}
            </div>
          </div>
        </div>
        {error && <div className="text-red-500 mt-2">{error}</div>}
        <Button onClick={handleNextClick} className="w-full mt-6 text-white">
          Next
        </Button>
      </div>
    </div>
  );
};

export default Step1;
