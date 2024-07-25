import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import SettingIcon from "../../Assets/icon/Setting.svg";
import { useLoadSettingsQuery } from "../../modules/LoadSettings/settingsApi";

const SettingsItem = () => {
  const router = useRouter();
  const [businessData, setBusinessData] = useState<any>();

  // const {data:generateKeyData,isSuccess} = useGenerateKeysQuery()
  const { data: settingsData, isSuccess: settingSuccess } =
    useLoadSettingsQuery();

  useEffect(() => {
    // businessUpdated ? setRefetch(true) :   setRefetch(false)
    if (settingSuccess && settingsData.success == true) {
      setBusinessData(settingsData["business"]);
    } else {
      console.log("An error occured");
    }
  }, [settingSuccess, settingsData]);
  const [account, setAccount] = useState<boolean>(false);
  const dropAccount = () => {
    account ? setAccount(false) : setAccount(true);
  };

  const businessSettingRoute = router.pathname == "/settings";
  const merchantRoute = router.pathname == "/settings/merchant";

  const isAccountRoute = businessSettingRoute;
  const isActiveRoute = merchantRoute || businessSettingRoute;

  useEffect(() => {
    if (!isActiveRoute) {
      setAccount(false);
    }
  }, [isActiveRoute]);
  return (
    <div>
      {/* <div className='flex justify-center w-12 lg:hidden'>
            <div className='flex items-center lg:w-[1.1rem] lg:h-[1.5rem]'>
                <Image src={FolderIcon}  alt='Home Icon' className='w-[1.1rem] h-[1.5rem]'/>
            </div>
        </div> */}
      <div>
        <Link href={isAccountRoute ? router.pathname : "/settings/merchant"}>
          <div className={`flex justify-center lg:w-60`}>
            <div
              className={`w-[0.26rem] h-11  rounded-tr-lg rounded-br-lg ${
                isActiveRoute ? "bg-primary" : "bg-transparent"
              }`}
            />
            <div
              className={`flex items-center gap-[0.67em] w-[13.5rem] h-[2.75rem] 
                            mx-4 px-2
                            ${
                              isActiveRoute
                                ? "bg-[#E7EDFF] rounded-[0.32rem]"
                                : ""
                            }
                            `}
            >
              <div className="flex items-center justify-center bg-[#EEB625] rounded-full w-[1.5rem] h-[1.5rem] lg:w-[1.6rem] lg:h-[1.6rem]">
                <Image
                  src={SettingIcon}
                  alt="Customers Icon"
                  className="lg:w-[1.2rem] lg:h-[1.5rem]"
                />
              </div>
              <div className="flex items-center justify-between w-[9rem]">
                <h1 className="text-[#262626] text-base font-WorkSans">
                  Settings
                </h1>
                <FontAwesomeIcon
                  icon={faChevronDown}
                  className={`w-5 h-5 ${
                    account
                      ? "rotate-180 ease-in-out duration-500 cursor-pointer"
                      : "rotate-0 duration-500 ease-in-out cursor-pointer"
                  }`}
                  onClick={() => {
                    dropAccount();
                  }}
                />
              </div>
            </div>
          </div>
          <ul
            className={`${
              account
                ? "flex flex-col h-16 translate-x-0 ease-in-out duration-500"
                : "overflow-hidden p-0 h-0 ease-in-out -translate-x-28 duration-500"
            }   gap-[0.63rem]  mb-0 mt-[0.5rem] mx-6`}
          >
            <Link href="/settings/merchant">
              <li
                className={`text-sm 
                                   ${
                                     merchantRoute
                                       ? "text-primary"
                                       : "text-[#262626]"
                                   } font-WorkSans font-normal leading-4`}
              >
                Merchant
              </li>
            </Link>
            {businessData && (
              <Link href="/settings">
                <li
                  className={`text-sm 
                                   ${
                                     businessSettingRoute
                                       ? "text-primary"
                                       : "text-[#262626]"
                                   } font-WorkSans font-normal leading-4`}
                >
                  Business
                </li>
              </Link>
            )}
          </ul>
        </Link>
      </div>
    </div>
  );
};

export default SettingsItem;
