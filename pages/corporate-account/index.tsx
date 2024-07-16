import React, { useEffect, useState } from "react";
import CertificateForm from "../../components/corporate-account/forms/CertificateForm";
import { OrganizationForm } from "../../components/corporate-account/forms/OrganizationForm";
import { SignatoryForm } from "../../components/corporate-account/forms/SignatoryForm";
import { useQuery } from "@tanstack/react-query";
import { useBusiness } from "../../modules/services/businessService";

export default function CorporateAccount() {
  const { getBusinessInfo } = useBusiness();

  const { data: businessData } = useQuery({
    queryKey: ["business"],
    queryFn: getBusinessInfo,
  });

  const currentStep = businessData ? businessData?.step : 0;

  const [activeTab, setActiveTab] = useState(currentStep);

  const handleTabClick = (index: number) => {
    setActiveTab(index);
  };
  useEffect(() => {
    setActiveTab(currentStep);
  }, [businessData]);

  return (
    <div className="h-screen overflow-auto">
      <div className="h-auto mt-32 mb-[20px] lg:mb-[50px]">
        {/* <div className="lg:flex lg:justify-between">
          <div className="flex flex-col gap-6 w-[10rem] lg:w-[534px] mx-4 md:pt-32 md:ml-[5rem] lg:ml-[4rem] xl:ml-[9.375rem]">
            <h1 className="text-[4rem] md:text-[5rem] text-[#303778] font-SpaceGrotesk font-bold leading-[4.5rem] md:leading-[80px]">
              Open a corporate account
            </h1>
            <p className="w-[22rem] md:w-[26.125rem] h-[1.875rem] text-xl md:text-2xl text-[#1B1A1A] font-WorkSans font-normal leading-[1.875rem]">
              Make transfers to bank accounts from your Onion Pay dashboard.
            </p>
            <Link href="/auth/signup" className="mt-20 md:mt-28">
              <ButtonIcon
                width="w-[10.2rem]"
                height="h-11"
                mainText="Get started"
                backgroundColor="bg-primary"
                color="text-white"
                textSize="text-base"
              />
            </Link>
          </div>
        </div> */}

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
                3. Signatories
              </p>
            </div>
          </div>
          <div className="w-full">
            {activeTab === 0 && (
              <OrganizationForm nextStep={(value) => setActiveTab(value)} />
            )}
            {activeTab === 1 && <CertificateForm nextStep={(value) => setActiveTab(value)} />}
            {activeTab === 2 && <SignatoryForm />}
          </div>
        </div>
      </div>
    </div>
  );
}
