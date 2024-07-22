import Image from "next/image";
import CloseIcon from "../../../Assets/icon/CloseIcon.svg"; // Update path if necessary
import { ArrowRightIcon, ChevronLeftIcon } from "lucide-react";
import { Button } from "../../../@/components/ui/button";

interface Step2Props {
  handleSignatureClick: () => void;
  handleUtilityClick: () => void;
  handleDocumentClick: () => void;

  hiddenSignatureInput: React.RefObject<HTMLInputElement>;
  hiddenUtilityBillInput: React.RefObject<HTMLInputElement>;
  hiddenDocumentInput: React.RefObject<HTMLInputElement>;
  signatureChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  utilitybillChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  documentChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  setSteps: (step: number) => void;
  closeModal: () => void;
  signature: File | null;
  utilityBill: File | null;
  document: File | null;
}

const Step2: React.FC<Step2Props> = ({
  handleDocumentClick,
  handleSignatureClick,
  handleUtilityClick,
  hiddenSignatureInput,
  hiddenUtilityBillInput,
  hiddenDocumentInput,
  documentChange,
  signatureChange,
  utilitybillChange,
  setSteps,
  closeModal,
  signature,
  utilityBill,
  document,
}) => (
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
    <div className="grid grid-cols-2 gap-8">
      <div className="flex flex-col items-center">
        <input
          type="file"
          accept="image/*"
          ref={hiddenSignatureInput}
          onChange={signatureChange}
          className="hidden"
        />
        <div
          className="w-[14.5rem] h-[14.5rem] bg-gray-100 flex justify-center items-center cursor-pointer"
          onClick={handleSignatureClick}
        >
          {signature ? (
            <img
              src={URL.createObjectURL(signature)}
              alt="Signature  Preview"
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="text-gray-400">Upload signature</div>
          )}
        </div>
      </div>
      <div className="">
        <input
          type="file"
          accept="image/*"
          ref={hiddenUtilityBillInput}
          onChange={utilitybillChange}
          className="hidden"
        />
        <div
          className="w-[14.5rem] h-[14.5rem] bg-gray-100 flex justify-center items-center cursor-pointer"
          onClick={handleUtilityClick}
        >
          {utilityBill ? (
            <img
              src={URL.createObjectURL(utilityBill)}
              alt="Utility bill Preview"
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="text-gray-400">Upload utility bill</div>
          )}
        </div>
      </div>
      <div className="">
        <input
          type="file"
          accept="image/*"
          ref={hiddenDocumentInput}
          onChange={documentChange}
          className="hidden"
        />
        <div
          className="w-[14.5rem] h-[14.5rem] bg-gray-100 flex justify-center items-center cursor-pointer"
          onClick={handleDocumentClick}
        >
          {document ? (
            <img
              src={URL.createObjectURL(document)}
              alt="Document Preview"
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="text-gray-400">Upload document</div>
          )}
        </div>
      </div>
      <div className="flex justify-end mt-6">
        <Button onClick={() => setSteps(2)} className="w-[94px] text-white">
          Next
          <ArrowRightIcon className="w-5 h-5 ml-2" />
        </Button>
      </div>
    </div>
  </div>
);

export default Step2;
