import { ChevronLeftIcon } from "lucide-react";
import Image from "next/image";
import CloseIcon from "../../../Assets/icon/CloseIcon.svg"; // Update path if necessary

import { Button } from "../../../@/components/ui/button";

interface Step6Props {
  setSteps: (step: number) => void;
  closeModal: () => void;
}

const Step6: React.FC<Step6Props> = ({ setSteps, closeModal }) => (
  <div>
    <div className="flex justify-between items-center">
      <div className="flex items-center gap-6">
        <ChevronLeftIcon
          className="cursor-pointer"
          onClick={() => setSteps(4)}
        />
        <h1 className="text-lg text-[#262626] font-WorkSans font-medium leading-5">
          Upgrade your wallet
        </h1>
      </div>
      <div>
        <Image
          src={CloseIcon}
          className="cursor-pointer"
          onClick={closeModal}
          alt="Close Icon"
        />
      </div>
    </div>
    <div className="flex items-center gap-[2.3rem] md:gap-[4.2rem] mt-6">
      <div className="flex items-center justify-center w-[5.32rem] h-5 rounded-[1.25rem] border-primary border-[0.065rem]">
        <h1 className="text-primary text-sm font-WorkSans font-normal leading-4">
          Step 6 of 6
        </h1>
      </div>
      <div>
        <h1 className="text-base text-[#1B1A1A] text-center font-WorkSans font-medium leading-5">
          Confirmation
        </h1>
      </div>
    </div>
    <div className="mt-6 flex flex-col items-center">
      <h1 className="text-base text-[#1B1A1A] font-WorkSans font-medium leading-5">
        All done! Your documents have been uploaded.
      </h1>
      {/* <Image
        src="/confirmation-icon.svg" // Adjust the path to your Confirmation Icon
        width={100}
        height={100}
        alt="Confirmation Icon"
        className="mt-6"
      /> */}
      <Button onClick={closeModal} className="w-full text-white mt-6">
        Close
      </Button>
    </div>
  </div>
);

export default Step6;
