import Image from "next/image";
import React, { useEffect, useState } from "react";
import CloseIcon from "../../Assets/icon/CloseIcon.svg";
import Input from "../input fields/Input";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loader from "../Loader";
import { setBusinessUpdated } from "../../redux/Modal-Processes/createBusinessSlice";
import { useAppDispatch } from "../../redux/redux-hooks/hooks";
import { useUpdateAccountDetailsMutation } from "../../modules/LoadSettings/settingsApi";
import { useRouter } from "next/router";

interface Props {
  isVisible: boolean;
  onClose: () => {};
  r_f_name: string;
  r_l_name: string;
  r_o_name: string;
  r_email: string;
  r_phone: string;
  r_address: string;
  r_dob: string;
}

type MerchantForm = {
  f_name: string;
  l_name: string;
  o_name: string;
  email: string;
  phone: string;
  address: string;
  dob: string;
};

const EditAccountDetails = ({
  isVisible,
  onClose,
  r_f_name,
  r_l_name,
  r_o_name,
  r_email,
  r_phone,
  r_address,
  r_dob,
}: Props) => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [isFocused, setIsFocused] = useState<boolean>(false);

  const [merchantInfo, setMerchantInfo] = useState<MerchantForm>({
    f_name: r_f_name,
    l_name: r_l_name,
    o_name: r_o_name,
    email: r_email,
    phone: r_phone,
    address: r_address,
    dob: r_dob,
  });

  const [updateAccountDetails, { data: merchantData, isSuccess, isLoading }] =
    useUpdateAccountDetailsMutation();

  const handleUpdateAccountDetails = async () => {
    setMerchantInfo({
      ...merchantInfo,
      o_name: "--",
    });
    try {
 
        await updateAccountDetails(merchantInfo);
  
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    setMerchantInfo({
      f_name: r_f_name,
      l_name: r_l_name,
      o_name: r_o_name,
      email: r_email,
      phone: r_phone,
      address: r_address,
      dob: r_dob,
    });
  }, [r_f_name, r_l_name, r_o_name, r_address, r_email, r_dob, r_phone]);

  useEffect(() => {
    if (isSuccess) {
      dispatch(setBusinessUpdated(true));
      onClose();
      localStorage.setItem("email", merchantInfo?.email);

      // Redirect to "auth/verifyemail" if the email has changed
      setTimeout(() => {
        if (r_email !== merchantInfo.email) {
          router.push("/auth/verifyemail");
        }
      }, 5000);
    } else {
      dispatch(setBusinessUpdated(false));
    }
  }, [
    isSuccess,
    dispatch,
    r_f_name,
    r_l_name,
    r_o_name,
    r_address,
    r_email,
    r_dob,
    r_phone,
    merchantInfo.email,
    router, // Don't forget to include router as a dependency
  ]);

  useEffect(() => {
    if (isSuccess) {
      toast.success("Your account details have been successfully updated!");
    } else {
      toast.error(merchantData?.reason);
    }
  }, [isSuccess, merchantData]);

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
        {/* h-[57.2rem] */}
        <div className="w-[22rem] md:w-[33rem] h-[43rem] mt-36 mb-6 rounded-[0.63rem] bg-white">
          <div className="flex flex-col mx-6 mt-6 ">
            <div className="flex items-center justify-between">
              <h1 className="text-lg text-[#1B1A1A] font-WorkSans font-semibold leading-5">
                Update Account details
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
                name="f_name"
                value={merchantInfo.f_name}
                onChange={(e) =>
                  setMerchantInfo({ ...merchantInfo, f_name: e.target.value })
                }
                placeholder="First name"
                label="First name"
                type="text"
                width="w-[19rem] md:w-[30rem]"
                height="h-[3.13rem]"
              />
              <Input
                name="l_name"
                value={merchantInfo.l_name}
                onChange={(e) =>
                  setMerchantInfo({ ...merchantInfo, l_name: e.target.value })
                }
                placeholder="Last name"
                label="Last name"
                type="text"
                width="w-[19rem] md:w-[30rem]"
                height="h-[3.13rem]"
              />
              <Input
                name="email"
                value={merchantInfo.email}
                onChange={(e) =>
                  setMerchantInfo({ ...merchantInfo, email: e.target.value })
                }
                placeholder="example@gmail.com"
                label="Email"
                type="email"
                width="w-[19rem] md:w-[30rem]"
                height="h-[3.13rem]"
              />
              <Input
                name="phone"
                value={merchantInfo.phone}
                onChange={(e) =>
                  setMerchantInfo({ ...merchantInfo, phone: e.target.value })
                }
                placeholder="+234"
                label="Phone"
                type="text"
                width="w-[19rem] md:w-[30rem]"
                height="h-[3.13rem]"
              />
              <Input
                name="address"
                value={merchantInfo.address}
                onChange={(e) =>
                  setMerchantInfo({ ...merchantInfo, address: e.target.value })
                }
                placeholder=""
                label="Address"
                type="text"
                width="w-[19rem] md:w-[30rem]"
                height="h-[3.13rem]"
              />
              <div className="flex flex-col gap-[0.375rem]">
                <h1
                  className={`text-sm ${!isFocused && "text-primaryText"} 
                          ${
                            isFocused && "text-primary"
                          } font-WorkSans font-normal leading-4 `}
                >
                  Date of birth
                </h1>
                <input
                  name="dob"
                  type="date"
                  value={merchantInfo?.dob}
                  onChange={(e) => {
                    const inputDate = e.target.value; // Assuming e.target.value is in "YYYY-MM-DD" format
                    const timestamp = new Date(inputDate).getTime();
                    const newTimestamp = timestamp.toString();
                    setMerchantInfo({ ...merchantInfo, dob: newTimestamp });
                  }}
                  onFocus={() => setIsFocused(true)}
                  onBlur={() => setIsFocused(false)}
                  className="w-[19rem] md:w-[30rem] lg:w-[25rem] xl:w-[30rem] h-[3.125rem]
                            focus:caret-primary  focus:border-primary outline-none 
                            text-[#898989] font-WorkSans font-normal leading-4 p-6
                            rounded-[0.313rem] border-[0.0625rem] border-[#CACACA]
                            "
                />
              </div>
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
                onClick={handleUpdateAccountDetails}
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

export default EditAccountDetails;
