import Image from "next/image";
import React, { useEffect, useState } from "react";
import EditIcon from "../../Assets/icon/EditIcon.svg";
import EditBlueIcon from "../../Assets/icon/EditBlueIcon.svg";
// import CopyIcon from '../../Assets/icon/CopyIcon.svg'
import { RootState } from "../../redux/store";
import { setShowSidebar } from "../../redux/sidebarSlice";
import Hamburger from "../../Assets/icon/HamburgerIcon.svg";
import "react-toastify/dist/ReactToastify.css";
// import { useLoadSettingsQuery } from "../../modules/LoadSettings/settingsApi";
import { useAppDispatch, useAppSelector } from "../../redux/redux-hooks/hooks";
import EditAccountDetails from "./EditAccountDetails";
import {  ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import EditBankAccountDetails from "./EditBankAccountDetails";
import {
  useLoadBankDetailsQuery,
  useLoadBanksQuery,
} from "../../modules/BankAccountApi/bankaccountApi";
import { useQuery } from "@tanstack/react-query";
import { useSetting } from "../../modules/services/useSetting";
import { querykeys } from "../../lib/constants";

const MerchantSettings = () => {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [showBankModal, setShowBankModal] = useState<boolean>(false);
  const [banksArray, setBanksArray] = useState<any>();
  const {getSettings} = useSetting()
  const dispatch = useAppDispatch();
  const sidebarShow = useAppSelector(
    (state: RootState) => state.sidebar.sidebarShow,
  );
  const businessUpdated = useAppSelector(
    (state: RootState) => state.business.businessUpdated,
  );
  // const [refetch,setRefetch] = useState<boolean>();
  const [bankDetails, setBankDetails] = useState<any>();

  // const  [apiKey,setApiKey]  = useState<string>('')
  // const [merchantData, setMerchantData] = useState<any>();

  const { data: banksData, isSuccess } = useLoadBanksQuery();
  // const {
  //   data: settingsData,
  //   isSuccess: settingSuccess,
  //   refetch,
  // } = useLoadSettingsQuery();
  const {data:settingsData,refetch} = useQuery({
    queryFn:getSettings,
    queryKey:[querykeys.settings],
    refetchInterval: 1000, // Fetch every 60 second
  })
  const { data: bankDetailsData, isSuccess: bankDetailSuccess } =
    useLoadBankDetailsQuery();
  // const [hasBusiness,setHasBusiness] = useState<boolean>(false);

  // const webHook  = 'http://yourapp.com/data/12345?Customer=bob&value=10.00&item=paper'
  useEffect(() => {
    if (isSuccess) {
      setBanksArray(banksData["banks"]);
    }
  }, [isSuccess]);

  // useEffect(() => {
  //   // businessUpdated ? setRefetch(true) :   setRefetch(false)
  //   if (settingSuccess && settingsData.success == true) {
  //     setMerchantData(settingsData["merchant"]);
  //   } else {
  //     toast.error(settingsData?.reason);
  //   }
  // }, [settingSuccess, businessUpdated, settingsData]);
  useEffect(() => {
    if (businessUpdated) {
      refetch();
    }
  }, [businessUpdated, refetch]);

  useEffect(() => {
    if (bankDetailSuccess) {
      setBankDetails(bankDetailsData["account"]);
    }
  }, [bankDetailSuccess, bankDetails]);

  const filteredArray = banksArray?.find(
    (bank: any) => bank.bankCode === bankDetails?.bank,
  );

  function formatDate(timestamp: any) {
    const date = new Date(timestamp);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  }

  function formatDateString(dateString:any) {
    const date = new Date(dateString);
  
    if (isNaN(date.getTime())) {
      return 'Invalid date string';
    }
  
    // Extract the year, month, and day
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-indexed
    const day = String(date.getDate()).padStart(2, '0');
  
    // Return the formatted date in yyyy-MM-dd format
    return `${year}-${month}-${day}`;
  }
  const merchant = settingsData?.merchant;


  const formattedDate = formatDate(merchant?.dob);
  const formattedDob = formatDateString(merchant?.dob)
  // const formattedDate = new Date(merchantData?.dob)

  // useEffect(() => {
  //     if (isSuccess && generateKeyData.success == true){
  //         setApiKey(generateKeyData?.live_pub_key)
  //     } else{
  //         console.log(generateKeyData?.reason)
  //     }
  // },[isSuccess,generateKeyData])

  // const [showPop, setShowPop] = useState(false);

  // const copyToClipboard = (copyItem:any) => {
  //     navigator.clipboard.writeText(copyItem);
  //     toast.success('Copied!!',{autoClose:2000})
  // };

  return (
    <div className="">
      <ToastContainer />
      <div className="w-auto md:w-[32rem] xl:w-[71.5rem]">
        <div className="mx-3 my-6">
          <div className="flex justify-between items-center mr-9 mb-12">
            <h1 className="text-[2rem] text-[#262626]  font-WorkSans font-medium leading-[2.4rem]">
              Settings
            </h1>
            {!sidebarShow && (
              <div
                className="md:hidden"
                onClick={() => dispatch(setShowSidebar(true))}
              >
                <Image src={Hamburger} alt="Hamburger Icon" />
              </div>
            )}
          </div>
          <div className="w-auto flex justify-between items-center pt-12">
            <div className="flex items-center gap-4">
              <div className="flex flex-col gap-1 md:gap-[0.375rem]">
                <h1 className="text-sm md:text-base text-[#1B1A1A] font-WorkSans font-medium leading-5">
                  {merchant?.f_name} {merchant?.l_name}
                </h1>
                {/* <h2 className='text-xs md:text-sm text-[#898989] font-WorkSans font-normal leading-4 '>ID: OP49867466389</h2> */}
              </div>
            </div>
            <div className="flex justify-end">
              <div
                onClick={() => {
                  setShowModal(true);
                }}
                className="flex justify-center items-center cursor-pointer w-[10rem] md:w-[12.5625rem] h-11 gap-[0.625rem] rounded-[0.3125rem] bg-primary"
              >
                <h1 className="text-xs md:text-sm text-white font-WorkSans font-normal leading-4">
                  Edit account details
                </h1>
                <Image src={EditIcon} alt="Edit Icon" />
              </div>
            </div>
          </div>

          <hr className="w-auto sm:w-[37rem] md:w-[32rem] lg:w-[50rem] xl:w-[70rem] border-primary border-[0.0625rem] my-6" />
          {/* {businessData.map((item:any) => ( */}
          <div>
            <div className="w-auto sm:w-[37rem] md:w-[29rem] lg:w-[50rem] xl:w-[70rem] mb-6 flex justify-between items-center">
              <h1 className="text-sm text-[#898989] font-WorkSans font-normal leading-4">
                Merchant name
              </h1>
              <h2 className="text-sm text-[#1B1A1A] font-WorkSans font-normal leading-4">
                {merchant?.f_name} {merchant?.l_name}
              </h2>
            </div>
            <div className="w-auto sm:w-[37rem] md:w-[29rem] lg:w-[50rem] xl:w-[70rem] mb-6 flex justify-between items-center">
              <h1 className="text-sm text-[#898989] font-WorkSans font-normal leading-4">
                {" "}
                Merchant email
              </h1>
              <h2 className="text-sm text-[#1B1A1A] font-WorkSans font-normal leading-4">
                {merchant?.email ? merchant?.email : "--"}
              </h2>
            </div>
            <div className="w-auto sm:w-[37rem] md:w-[29rem] lg:w-[50rem] xl:w-[70rem] mb-6 flex justify-between items-center">
              <h1 className="text-sm text-[#898989] font-WorkSans font-normal leading-4">
                {" "}
                Merchant phone
              </h1>
              <h2 className="text-sm text-[#1B1A1A] font-WorkSans font-normal leading-4">
                {merchant?.phone ? merchant?.phone : "--"}
              </h2>
            </div>
            <div className="w-auto sm:w-[37rem] md:w-[29rem] lg:w-[50rem] xl:w-[70rem] mb-6 flex justify-between items-center">
              <h1 className="text-sm text-[#898989] font-WorkSans font-normal leading-4">
                {" "}
                Merchant address
              </h1>
              <h2 className="text-sm text-[#1B1A1A] font-WorkSans font-normal leading-4">
                {merchant?.address ? merchant?.address : "--"}
              </h2>
            </div>
            {/* <div  className='w-[25rem] sm:w-[37rem] md:w-[47rem] lg:w-[50rem] xl:w-[70rem] mb-6 flex justify-between items-center'>
                            <h1 className='text-sm text-[#898989] font-WorkSans font-normal leading-4'>Wallet name</h1>
                            <h2 className='text-sm text-[#1B1A1A] font-WorkSans font-normal leading-4'>{merchantData?.walletName ? merchantData?.walletName : '--'}</h2>
                        </div>
                        <div  className='w-[25rem] sm:w-[37rem] md:w-[47rem] lg:w-[50rem] xl:w-[70rem] mb-6 flex justify-between items-center'>
                            <h1 className='text-sm text-[#898989] font-WorkSans font-normal leading-4'>Wallet number</h1>
                            <h2 className='text-sm text-[#1B1A1A] font-WorkSans font-normal leading-4'>{merchantData?.walletNumber ? merchantData?.walletNumber : '--'}</h2>
                        </div>
                       <div  className='w-[25rem] sm:w-[37rem] md:w-[47rem] lg:w-[50rem] xl:w-[70rem] mb-6 flex justify-between items-center'>
                            <h1 className='text-sm text-[#898989] font-WorkSans font-normal leading-4'>Wallet ID</h1>
                            <h2 className='text-sm text-[#1B1A1A] font-WorkSans font-normal leading-4'>{merchantData?.walletId ? merchantData?.walletId : '--'}</h2>
                        </div> */}
          </div>
          {/* ))} */}
          <div className="w-auto sm:w-[37rem] md:w-[29rem] lg:w-[50rem] xl:w-[70rem] flex justify-between items-center mb-6">
            <h1 className="text-sm text-[#898989] font-WorkSans font-normal leading-4">
              NIN:
            </h1>
            <h2 className="text-sm text-[#1B1A1A] font-WorkSans font-normal leading-4">
              {merchant?.nin ? merchant?.nin : "--"}
            </h2>
          </div>
          <div className="w-[21rem] sm:w-[37rem] md:w-[29rem] lg:w-[50rem] xl:w-[70rem] mb-6 flex justify-between items-center">
            <h1 className="text-sm text-[#898989] font-WorkSans font-normal leading-4">
              {" "}
              Bank account details:
            </h1>
            <div className="flex items-center gap-2">
              <h2 className="text-sm text-[#1B1A1A] font-WorkSans font-normal leading-4">
                {bankDetails?.account_number} - {filteredArray?.bankName}
              </h2>
              <Image
                src={EditBlueIcon}
                onClick={() => {
                  setShowBankModal(true);
                }}
                className="cursor-pointer"
                alt="Edit icon"
              />
            </div>
          </div>
          {/* <div className='w-[25rem] sm:w-[37rem] md:w-[47rem] lg:w-[50rem] xl:w-[70rem] flex justify-between items-center mb-6'>
                    <h1 className='text-sm text-[#898989] font-WorkSans font-normal leading-4'>CAC Certificate:</h1>
                    <h2 className='text-sm text-[#1B1A1A] font-WorkSans font-normal leading-4'>Mintfool</h2>
                </div> */}
          <div className="w-auto sm:w-[37rem] md:w-[29rem] lg:w-[50rem] xl:w-[70rem] mb-6 flex justify-between items-center">
            <h1 className="text-sm text-[#898989] font-WorkSans font-normal leading-4">
              Date Of Birth:
            </h1>
            <h2 className="text-sm text-[#1B1A1A] font-WorkSans font-normal leading-4">
              {formattedDate}
            </h2>
          </div>
          {/* <hr className='w-[25rem] sm:w-[37rem] md:w-[47rem] lg:w-[50rem] xl:w-[70rem] border-primary border-[0.0625rem] my-6' />
               <div className='w-[25rem] sm:w-[37rem] md:w-[47rem] lg:w-[50rem] xl:w-[70rem] mb-6 flex justify-between items-center'>
                    <h1 className='text-sm text-[#898989] font-WorkSans font-normal leading-4'>API Keys:</h1>
                    <div className='flex items-center gap-3'>
                        <h2 className='text-sm text-[#1B1A1A] font-WorkSans font-normal leading-4'>{apiKey}</h2>
                        <div className='cursor-pointer' onClick={() => copyToClipboard(apiKey)}>
                            <Image src={CopyIcon} alt=''/>
                        </div>
                    </div>
                </div>
                <div className='w-[25rem] sm:w-[37rem] md:w-[47rem] lg:w-[50rem] xl:w-[70rem] mb-6 flex justify-between items-center'>
                    <h1 className='text-sm text-[#898989] font-WorkSans font-normal leading-4'>Web hooks:</h1>
                    <div className='flex items-center gap-3'>
                        <div className='w-[16rem] sm:w-auto cursor-pointer flex justify-center text-sm text-[#1B1A1A] font-WorkSans font-normal leading-4'>{webHook}</div>
                        <Image src={CopyIcon} alt='' className='cursor-pointer' onClick={() => copyToClipboard(webHook)}/>
                    </div>
                </div> */}
        </div>
      </div>
      <div>
        {!showBankModal && (
          <EditAccountDetails
            isVisible={showModal}
            onClose={async () => setShowModal(false)}
            r_f_name={merchant?.f_name}
            r_l_name={merchant?.l_name}
            r_address={merchant?.address}
            r_email={merchant?.email}
            r_dob={formattedDob}
            r_o_name={merchant?.o_name}
            r_phone={merchant?.phone}
          />
        )}
        {showBankModal && (
          <EditBankAccountDetails
            isVisible={showBankModal}
            onClose={async () => setShowBankModal(false)}
          />
        )}
      </div>
    </div>
  );
};

export default MerchantSettings;
