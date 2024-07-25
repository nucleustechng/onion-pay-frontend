import React, { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useBusiness } from "../../modules/services/useBusiness";
import {
  DirectoryForm,
  OrganizationForm,
  SignatoryForm,
} from "../../components/corporate-account/forms";
import CertificateForm from "../../components/corporate-account/forms/CertificateForm";

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

  console.log("step", activeTab);

  return (
    <div className="flex-1 h-screen overflow-y-auto">
      <div className="h-auto mt-32 mb-[20px] lg:mb-[50px]">
        <div className="">
          <div className="flex items-center pb-4">
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
                4. Directories
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
