import Image from "next/image";
import React, { useEffect, useState } from "react";
import CloseIcon from "../../Assets/icon/CloseIcon.svg";
import Input from "../input fields/Input";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loader from "../Loader";
import { setBusinessUpdated } from "../../redux/Modal-Processes/createBusinessSlice";
import { useAppDispatch } from "../../redux/redux-hooks/hooks";
import { useUpdateBusinessInfoMutation } from "../../modules/LoadSettings/settingsApi";

interface Props {
  isVisible: boolean;
  onClose: () => {};
  r_name: string;
  r_email: string;
  r_phone: string;
  r_address: string;
  r_website: string;
  r_bvn: string;
}

type BusinessForm = {
  name: string;
  email: string;
  phone: string;
  // address: string;
  website: string;
  bvn: string;
};

const UpdateDetailsModal = ({
  isVisible,
  onClose,
  r_email,
  // r_address,
  r_bvn,
  r_phone,
  r_website,
  r_name,
}: Props) => {
  const dispatch = useAppDispatch();

  const [businessInfo, setBusinessInfo] = useState<BusinessForm>({
    name: r_name,
    email: r_email,
    phone: r_phone,
    // address: r_address,
    website: r_website,
    bvn: r_bvn,
  });

  const [updateBusinessDetails, { data: businessData, isSuccess, isLoading }] =
    useUpdateBusinessInfoMutation();

  const handleUpdateBusiness = async () => {
    try {
      if (
        businessInfo.name &&
        businessInfo.email &&
        // businessInfo.address &&
        businessInfo.phone &&
        businessInfo.website &&
        businessInfo.bvn
      ) {
        await updateBusinessDetails(businessInfo);
      }
    } catch (err) {
      console.log(err);
    }
  };

  // const [showToast, setShowToast] = useState(false);
  // const showToastRef = useRef(false);

  useEffect(() => {
    setBusinessInfo({
      name: r_name,
      email: r_email,
      phone: r_phone,
      // address: r_address,
      website: r_website,
      bvn: r_bvn,
    });
    if (isSuccess) {
      dispatch(setBusinessUpdated(true));
      onClose();
      console.log(businessData);
    } else {
      // toast.error(businessData?.reason);
      dispatch(setBusinessUpdated(false));
    }
  }, [
    isSuccess,
    businessData,
    dispatch,
    // r_address,
    r_bvn,
    r_website,
    r_phone,
    r_email,
    r_name,
  ]);

  useEffect(() => {
    if (isSuccess) {
      toast.success("Your business details have been successfully updated!", {
        autoClose: 700,
      });
    } else {
      toast.error(businessData?.reason);
    }
  }, [businessData]);

  const handleClose = (e: any) => {
    if (e.target.id === "wrapper") {
      onClose();
    }
  };
  if (!isVisible) return null;

  return (
    <div>
      <ToastContainer />
      <div
        className="fixed inset-0 bg-[#262626] bg-opacity-50 backdrop-blur-[0.05rem] z-40 flex justify-center items-center overflow-y-scroll"
        id="wrapper"
        onClick={handleClose}
      >
        <div className="w-[20rem] max-[280px]:w-[16rem] md:w-[33rem] h-[38rem] max-[280px]:h-[44rem] mt-36 mb-6 md:mb-[30rem] lg:mb-0 rounded-[0.63rem] bg-white">
          <div className="flex flex-col mx-6 mt-6 ">
            <div className="flex items-center justify-between">
              <h1 className="text-lg text-[#1B1A1A] font-WorkSans font-semibold leading-5">
                Update business details
              </h1>
              <div
                className="cursor-pointer"
                onClick={() => {
                  onClose();
                }}
              >
                <Image src={CloseIcon} alt="Close Icon" />
              </div>
            </div>
            <div className="flex flex-col gap-4 mt-6">
              <Input
                name="name"
                value={businessInfo?.name}
                onChange={(e) =>
                  setBusinessInfo({ ...businessInfo, name: e.target.value })
                }
                placeholder="Business name"
                label="Business name"
                type="text"
                width="w-[17rem] max-[280px]:w-[13rem] md:w-[30rem]"
                height="h-[3.13rem]"
              />
              <Input
                name="email"
                value={businessInfo.email}
                onChange={(e) =>
                  setBusinessInfo({ ...businessInfo, email: e.target.value })
                }
                placeholder="Business email"
                label="Business email"
                type="text"
                width="w-[17rem] max-[280px]:w-[13rem] md:w-[30rem]"
                height="h-[3.13rem]"
              />
              <Input
                name="phone"
                value={businessInfo.phone}
                onChange={(e) =>
                  setBusinessInfo({ ...businessInfo, phone: e.target.value })
                }
                placeholder="+234"
                label="Business phone"
                type="tel"
                width="w-[17rem] max-[280px]:w-[13rem] md:w-[30rem]"
                height="h-[3.13rem]"
              />
              {/* <Input 
                        name='address'
                        value={businessInfo.address}
                        onChange={(e) => setBusinessInfo({...businessInfo, address: e.target.value})}
                        placeholder='Business address'
                        label='Business address' 
                        type='text' 
                        width='w-[17rem] max-[280px]:w-[13rem] md:w-[30rem]'
                        height='h-[3.13rem]'
                        /> */}
              <Input
                name="website"
                value={businessInfo.website}
                onChange={(e) =>
                  setBusinessInfo({ ...businessInfo, website: e.target.value })
                }
                placeholder="https://"
                label="Business website"
                type="url"
                width="w-[17rem] max-[280px]:w-[13rem] md:w-[30rem]"
                height="h-[3.13rem]"
              />
              <Input
                name="bvn"
                value={businessInfo.bvn}
                onChange={(e) =>
                  setBusinessInfo({ ...businessInfo, bvn: e.target.value })
                }
                placeholder=""
                label="Bank Verification Number"
                type="url"
                width="w-[17rem] max-[280px]:w-[13rem] md:w-[30rem]"
                height="h-[3.13rem]"
              />
            </div>
            <div className="flex items-center justify-end gap-4 mt-6">
              <button
                onClick={() => {
                  onClose();
                }}
                className="flex items-center cursor-pointer justify-center w-[5.4rem] h-11 bg-[#F5F5F5] rounded-[0.313rem] text-base text-[#262626] font-WorkSans font-normal leading-5"
              >
                Cancel
              </button>
              <button
                onClick={handleUpdateBusiness}
                className="w-[10.21rem] h-11 bg-[#3063E9] rounded-[0.313rem] text-base text-white font-WorkSans font-normal leading-5"
              >
                <div className="flex justify-center items-center">
                  {isLoading ? <Loader isWhite={true} /> : "Update details"}
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateDetailsModal;
