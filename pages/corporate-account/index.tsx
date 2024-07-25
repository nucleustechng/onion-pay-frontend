import React, { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useBusiness } from "../../modules/services/useBusiness";
import {
  DirectoryForm,
  OrganizationForm,
  SignatoryForm,
} from "../../components/corporate-account/forms";
import CertificateForm from "../../components/corporate-account/forms/CertificateForm";
import Header from "../../components/new/Header";

export default function CorporateAccount() {
  const { getBusinessInfo } = useBusiness();

  const { data: businessData } = useQuery({
    queryKey: ["business"],
    queryFn: getBusinessInfo,
  });

  const currentStep = businessData?.step ?? 0;
  const [activeTab, setActiveTab] = useState<number>(currentStep);

  const handleTabClick = (index: number) => {
    setActiveTab(index);
  };

  useEffect(() => {
    if (businessData && businessData.step !== undefined) {
      setActiveTab(businessData.step);
    } else {
      setActiveTab(0);
    }
  }, [businessData]);

  return (
    // <div className="flex-1 h-screen overflow-y-auto">
    <div className="flex flex-col w-full h-screen overflow-y-auto px-2 lg:px-6">
      <Header mainText="Corporate account" />
      <div className="h-auto  mb-[20px] lg:mb-[50px]">
        <div className="">
          <div className="flex items-center pb-4 overflow-x-auto">
            <div
              onClick={() => handleTabClick(0)}
              className={`flex items-center justify-start w-full border-r border-r-[#CACACA] ${
                activeTab === 0 ? "bg-[#E7EDFF]" : ""
              } h-[40px] px-4 py-[10px] cursor-pointer`}
            >
              <p className="text-xs lg:text-base text-black font-WorkSans font-semibold">
                1. Organization information
              </p>
            </div>
            <div
              onClick={() => handleTabClick(1)}
              className={`flex items-center justify-start w-full border-r border-r-[#CACACA] ${
                activeTab === 1 ? "bg-[#E7EDFF]" : ""
              } h-[40px] px-4 py-[10px] cursor-pointer`}
            >
              <p className="text-xs lg:text-base text-black font-WorkSans font-semibold">
                2. Certificates
              </p>
            </div>
            <div
              onClick={() => handleTabClick(2)}
              className={`flex items-center justify-start w-full border-r border-r-[#CACACA] ${
                activeTab === 2 ? "bg-[#E7EDFF]" : ""
              } h-[40px] px-4 py-[10px] cursor-pointer`}
            >
              <p className="text-xs lg:text-base text-black font-WorkSans font-semibold">
                3. Directories
              </p>
            </div>
            <div
              onClick={() => handleTabClick(3)}
              className={`flex items-center justify-start w-full border-r border-r-[#CACACA] ${
                activeTab === 3 ? "bg-[#E7EDFF]" : ""
              } h-[40px] px-4 py-[10px] cursor-pointer`}
            >
              <p className="text-xs lg:text-base text-black font-WorkSans font-semibold">
                4. Signatories
              </p>
            </div>
          </div>
          <div className="w-full">
            {activeTab === 0 && (
              <OrganizationForm
                nextStep={(value: number) => setActiveTab(value)}
                business={businessData}
              />
            )}
            {activeTab === 1 && (
              <CertificateForm
                nextStep={(value: number) => setActiveTab(value)}
                business={businessData}
              />
            )}
            {activeTab === 2 && (
              <DirectoryForm
                business={businessData}
                nextStep={(value: number) => setActiveTab(value)}
              />
            )}
            {activeTab === 3 && (
              <SignatoryForm
                business={businessData}
                nextStep={(value: number) => setActiveTab(value)}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
