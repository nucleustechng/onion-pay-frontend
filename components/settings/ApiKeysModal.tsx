import Image from "next/image";
import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import CloseIcon from "../../Assets/icon/CloseIcon.svg";
import CopyIcon from "../../Assets/icon/CopyIcon.svg";
import {
  useGenerateKeysMutation,
  useLoadDevSettingsQuery,
} from "../../modules/ApiKeys/generateApiKeys";
import { useUpdateWebhookMutation } from "../../modules/Webhook/webhookApi";
import Input from "../input fields/Input";
import Loader from "../Loader";
import { ChevronLeftIcon } from "@radix-ui/react-icons";
import { useRouter } from "next/router";
import { SwitchForm } from "./SwitchForm";

type Props = {
  businessName?: string;
};

const ApiKeysModal = ({ businessName }: Props) => {
  const router = useRouter();
  const {
    data: settingsData,
    isSuccess: settingSuccess,
    refetch,
  } = useLoadDevSettingsQuery();
  const [
    generateNewKeys,
    { data: generateData, isSuccess: generatedKey, isLoading: generateLoading },
  ] = useGenerateKeysMutation();

  const handleGenerateKeysClick = () => {
    generateNewKeys();
  };

  const [apiKeys, setApiKeys] = useState<any>([]);

  useEffect(() => {
    if (generatedKey) {
      if (generateData?.success === true) {
        toast.success("Your api keys have been regenerated");
        setApiKeys(generateData);
      }
    } else {
      toast.error(generateData?.reason);
    }
  }, [generatedKey, generateData, settingSuccess, refetch]);

  useEffect(() => {
    if (settingSuccess) {
      setApiKeys(settingsData["business"]);
    }
  }, [settingSuccess]);

  const webHookInfo = settingsData && settingsData["business"];

  const [updateWebhookDetails, setUpdateWebhookDetails] = useState({
    url: webHookInfo?.webhook_url,
    auth_token: webHookInfo?.webhook_auth_token,
  });

  const [
    updateWebhook,
    { data: updatedData, isSuccess: webhookSuccess, isLoading: webhookLoading },
  ] = useUpdateWebhookMutation();

  console.log("apikeys", apiKeys);

  const handleUpdateWebhook = async () => {
    console.log("updateWebhook", updateWebhookDetails);
    try {
      if (updateWebhookDetails?.url && updateWebhookDetails?.auth_token) {
        await updateWebhook({
          url: updateWebhookDetails?.url,
          auth_token: updateWebhookDetails?.auth_token,
        });
      } else {
        toast.error("All fields are required");
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (webhookSuccess) {
      if (updatedData?.success === true) {
        toast.success("You have successfully updated your webhook");
      } else {
        toast.error(updatedData?.reason);
      }
    }
  }, [webhookSuccess]);

  interface IApiKey {
    title: string;
    devKey: string;
  }
  const ApiKeyContainer = ({ title, devKey }: IApiKey) => (
    <div>
      <h1 className="text-sm text-[#1B1A1A] font-WorkSans font-normal leading-4">
        {title}
      </h1>
      <div className="flex items-center w-[19rem] md:w-[29rem] lg:w-[44rem] h-[3.125rem] mt-[0.375rem] border-[0.0625rem] border-[#CACACA] rounded-[0.313rem]">
        <h1 className="w-[15rem] md:w-[22rem] break-words ml-2 md:ml-6 text-sm text-[#1B1A1A] font-WorkSans font-normal leading-4">
          {devKey}
        </h1>
        <div className="flex justify-end w-[30rem]">
          <div
            onClick={() => copyToClipboard(devKey)}
            className="flex items-center justify-center w-[3rem] md:w-[5.25rem] h-[3rem] cursor-pointer bg-[#E7EDFF] border-l-primary border-l-[0.0625rem] rounded-r-[0.313rem]"
          >
            <div className="flex justify-center items-center gap-2">
              <h1 className="text-xs md:text-sm text-primary font-WorkSans font-normal leading-4">
                Copy
              </h1>
              <Image
                src={CopyIcon}
                alt="Copy Icon"
                className="hidden md:flex"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const copyToClipboard = (copyItem: any) => {
    navigator.clipboard.writeText(copyItem);
    toast.success("Copied!!", { autoClose: 150 });
  };
  return (
    <div>
      <ToastContainer />
      <div
        className="w-full h-screen overflow-auto scrollbar-hide pb-20 "
        id="wrapper"
      >
        {/* h-[57.2rem] */}

        <div className="">
          <div className="flex flex-col  mx-6  mt-6 ">
            <div
              className="flex items-center gap-1 mb-12 text-primary text-base font-normal font-WorkSans cursor-pointer"
              onClick={() => router.back()}
            >
              <ChevronLeftIcon className="w-[24px] h-[24px]" />
              Back
            </div>
            <div className="flex items-center justify-between">
              <h1 className="text-lg text-[#1B1A1A] font-WorkSans font-semibold leading-5">
                API Keys for {businessName}
              </h1>
              {/* <div className="cursor-pointer">
								<Image
									src={CloseIcon}
									alt="Close Icon"
								/>
							</div> */}
            </div>
            <div className="flex flex-col gap-6 mt-7 ">
              <ApiKeyContainer
                title="Test Secret Key"
                devKey={apiKeys?.test_sec_key}
              />
              <ApiKeyContainer
                title="Test Public key"
                devKey={apiKeys?.test_pub_key}
              />
              <ApiKeyContainer
                title="Live Secret key"
                devKey={apiKeys?.live_sec_key}
              />
              <ApiKeyContainer
                title="Live Public key"
                devKey={apiKeys?.live_pub_key}
              />
            </div>
            <div className="flex justify-end  w-[19rem] md:w-[29rem] lg:w-[44rem]">
              <div
                onClick={handleGenerateKeysClick}
                className="flex justify-center items-center w-[10.525rem] h-11 cursor-pointer bg-primary rounded-[0.313rem] mt-6"
              >
                {generateLoading ? (
                  <Loader isWhite={true} />
                ) : (
                  <h1 className="text-sm text-white font-WorkSans font-normal leading-4">
                    Regenerate API Keys
                  </h1>
                )}
              </div>
            </div>
          </div>
          <hr className="w-auto  border-primary border-[0.0625rem] mx-6 my-6" />
          <div className="mx-6 flex flex-col gap-6">
            <h1 className="text-lg text-[#1B1A1A] font-WorkSans font-semibold leading-5">
              Update fee payment
            </h1>
            <SwitchForm />
          </div>
          <hr className="w-auto  border-primary border-[0.0625rem] mx-6 my-6" />

          <div className="mx-6">
            <h1 className="text-lg text-[#1B1A1A] font-WorkSans font-semibold leading-5">
              Update webhook
            </h1>
            <div className="mt-6 flex flex-col gap-4">
              <Input
                type="text"
                width=" w-[19rem] md:w-[29rem] lg:w-[44rem]"
                name="url"
                placeholder="URL"
                label="URL"
                value={updateWebhookDetails.url}
                onChange={(e) => {
                  setUpdateWebhookDetails({
                    ...updateWebhookDetails,
                    url: e.target.value,
                  });
                }}
              />
              <Input
                type="text"
                width=" w-[19rem] md:w-[29rem] lg:w-[44rem]"
                name="auth_token"
                placeholder="Authentication token"
                label="Authentication token"
                value={updateWebhookDetails.auth_token}
                onChange={(e) => {
                  setUpdateWebhookDetails({
                    ...updateWebhookDetails,
                    auth_token: e.target.value,
                  });
                }}
              />
              <div className="flex justify-end  w-[19rem] md:w-[29rem] lg:w-[44rem]">
                <div
                  onClick={handleUpdateWebhook}
                  className="flex justify-center items-center w-[10.525rem] h-11 cursor-pointer bg-primary rounded-[0.313rem] mt-2"
                >
                  {webhookLoading ? (
                    <Loader isWhite={true} />
                  ) : (
                    <h1 className="text-sm text-white font-WorkSans font-normal leading-4">
                      Update Webhook
                    </h1>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApiKeysModal;
