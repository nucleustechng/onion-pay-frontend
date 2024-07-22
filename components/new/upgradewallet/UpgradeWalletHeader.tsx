// Header.js
import { ChevronLeftIcon } from "lucide-react";
import Image from "next/image";
import CloseIcon from "../../../Assets/icon/CloseIcon.svg";

type Props = {
  title: string;
  onBack?: () => void;
  onClose?: () => void;
};

const UpgradeWalletHeader = ({ title, onBack, onClose }: Props) => {
  return (
    <div className="flex justify-between items-center">
      <div className="flex items-center gap-6">
        {onBack && (
          <ChevronLeftIcon className="cursor-pointer" onClick={onBack} />
        )}
        <h1 className="text-lg text-[#262626] font-WorkSans font-medium leading-5">
          {title}
        </h1>
      </div>
      {onClose && (
        <Image
          src={CloseIcon}
          className="cursor-pointer"
          onClick={onClose}
          alt="Close Icon"
        />
      )}
    </div>
  );
};

export default UpgradeWalletHeader;
