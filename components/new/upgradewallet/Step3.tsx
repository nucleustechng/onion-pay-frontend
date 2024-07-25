import React from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CloseIcon from "../../../Assets/icon/CloseIcon.svg"; // Update path if necessary
import { ArrowRightIcon, ChevronLeftIcon } from "lucide-react";
import Image from "next/image";
import { Button } from "../../../@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../@/components/ui/select";
import { Label } from "../../../@/components/ui/label";
import { Input } from "../../../@/components/ui/input";

interface Step3Props {
  setSteps: (step: number) => void;
  handleIdTypeChange: (value: string) => void;
  setIdNumber: (value: string) => void;
  setIssueDate: (value: any) => void;
  setExpiryDate: (value: any) => void;
  closeModal: () => void;
  idType: string;
  idNumber: string;
  issueDate: string;
  expiryDate: string;
}

export default function Step3({
  setSteps,
  closeModal,
  handleIdTypeChange,
  setExpiryDate,
  setIdNumber,
  setIssueDate,
  expiryDate,
  idNumber,
  idType,
  issueDate,
}: Step3Props) {
  const handleNextClick = () => {
    let hasError = false;

    if (!idType) {
      toast.error("Please select an ID type.");
      hasError = true;
    }
    if (!idNumber) {
      toast.error("Please enter the ID number.");
      hasError = true;
    }
    if (!issueDate) {
      toast.error("Please enter the issue date.");
      hasError = true;
    }
    if (!expiryDate) {
      toast.error("Please enter the expiry date.");
      hasError = true;
    }

    if (hasError) return;

    setSteps(3);
  };

  return (
    <div>
      <ToastContainer />
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-6">
          <ChevronLeftIcon
            className="cursor-pointer"
            onClick={() => setSteps(1)}
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
            Step 3 of 6
          </h1>
        </div>
        <div>
          <h1 className="text-base text-[#1B1A1A] text-center font-WorkSans font-medium leading-5">
            Progress
          </h1>
        </div>
      </div>
      <div className="mt-6">
        <div>
          <div>
            <Select
              onValueChange={(value: string) => handleIdTypeChange(value)}
            >
              <SelectTrigger className="w-full  h-[3.13rem] mt-6 px-6 border-solid border-[#CACACA] border-[0.063rem] rounded-[0.32rem]">
                <SelectValue placeholder="Select ID Type" />
              </SelectTrigger>
              <SelectContent className="w-[332px] md:w-[400px] bg-slate-100 px-4">
                <SelectGroup className="flex flex-col gap-2 py-2">
                  <SelectItem value="nic">National Identity Card</SelectItem>
                  <SelectItem value="dlc">{`Driver's License`}</SelectItem>
                  <SelectItem value="vtc">{`Voter's Card`}</SelectItem>
                  <SelectItem value="ipp">International Passport</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          <div className="flex flex-col gap-2  mt-6">
            <Label className="text-[#262626] text-sm font-WorkSans font-normal leading-4">
              ID number
            </Label>
            <Input
              type="text"
              id="idNumber"
              placeholder=""
              name="idNumber"
              onChange={(e: any) => setIdNumber(e.target.value)}
              className="w-full h-[3.13rem] border-solid border-[#CACACA] border-[0.063rem] rounded-[0.32rem] px-4 "
            />
          </div>
          <div className="flex flex-col gap-2 mt-6">
            <Label className="text-[#262626] text-sm font-WorkSans font-normal leading-4">
              Issue date
            </Label>
            <Input
              type="date"
              id="idIssueDate"
              placeholder=""
              name="idIssueDate"
              onChange={(e: any) => setIssueDate(e.target.value)}
              className="w-full h-[3.13rem] border-solid border-[#CACACA] border-[0.063rem] rounded-[0.32rem] px-4 "
            />
          </div>
          <div className="flex flex-col gap-2 mt-6">
            <Label className="text-[#262626] text-sm font-WorkSans font-normal leading-4">
              Expiry date
            </Label>
            <Input
              type="date"
              id="idExpiryDate"
              placeholder=""
              name="idExpiryDate"
              onChange={(e: any) => setExpiryDate(e.target.value)}
              className="w-full h-[3.13rem] border-solid border-[#CACACA] border-[0.063rem] rounded-[0.32rem] px-4 "
            />
          </div>
          <div className="flex justify-end">
            <Button
              onClick={handleNextClick}
              className="w-[94px] text-white mt-6"
            >
              Next
              <ArrowRightIcon className="w-5 h-5 ml-2" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
