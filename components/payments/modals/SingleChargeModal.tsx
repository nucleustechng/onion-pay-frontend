import Image from "next/image";
import React, { useEffect, useState } from "react";
import CloseIcon from "../../../Assets/icon/CloseIcon.svg";
import {
  useCreatePaymentPageMutation,
  useLoadPaymentLinksQuery,
} from "../../../modules/PaymentPageApi/paymentPageApi";
import Input from "../../input fields/Input";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loader from "../../Loader";
import CustomToggle from "../../CustomToggle";
import { useQueryClient } from "@tanstack/react-query";

interface Props {
  isVisible: boolean;
  onClose: () => {};
}

const SingleChargeModal = ({ isVisible, onClose }: Props) => {
  const queryClient = useQueryClient();

  const [isFixed, setFixed] = useState<boolean>(true);
  const [paymentLinkInfo, setPaymentLinkInfo] = useState({
    title: "",
    fixed: isFixed,
    amount: 0,
    description: "",
    redirect_url: "",
  });

  const [createPaymentLink, { data: paymentLinkData, isSuccess, isLoading }] =
    useCreatePaymentPageMutation();

  const paymentPages = useLoadPaymentLinksQuery();

  const handleCreatePaymentLink = async () => {
    console.log(paymentLinkInfo);
    console.log(paymentLinkInfo);
    try {
      // Conditionally remove the amount property if isFixed is false
      if (!isFixed) {
        const { amount, ...infoWithoutAmount } = paymentLinkInfo;
        await createPaymentLink(infoWithoutAmount);
      } else if (
        paymentLinkInfo.title &&
        paymentLinkInfo.fixed &&
        paymentLinkInfo.amount &&
        paymentLinkInfo.description &&
        paymentLinkInfo.redirect_url &&
        isFixed
      ) {
        await createPaymentLink(paymentLinkInfo);
      } else {
        toast.error("Please fill all the fields");
      }
      paymentPages.refetch();
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    setPaymentLinkInfo({ ...paymentLinkInfo, fixed: isFixed });

    if (isSuccess) {
      if (paymentLinkData?.success === true) {
        queryClient.invalidateQueries({ queryKey: ["paymentLinks"] });
        onClose();
      }
      setPaymentLinkInfo({
        title: "",
        fixed: isFixed,
        amount: 0,
        description: "",
        redirect_url: "",
      });
    }
  }, [isSuccess, isFixed]);

  useEffect(() => {
    if (paymentLinkData?.success === true) {
      // Show the toast notification after a slight delay
      toast.success("Your payment link has been successfully created!");
    } else {
      // Show the toast notification immediately
      toast.error(paymentLinkData?.reason);
    }
  }, [isSuccess, paymentLinkData]);

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
        className="fixed inset-0 bg-[#262626] bg-opacity-50 backdrop-blur-[0.05rem] z-20 flex justify-center items-center"
        id="wrapper"
        onClick={handleClose}
      >
        <div
          className={`w-[22rem] md:w-[33.01rem] md:mb-80 lg:mb-0 ${
            !isFixed ? "h-[31rem]" : "h-[38.5rem]"
          } ${
            !isFixed ? "md:h-[31rem]" : "md:h-[38rem]"
          } rounded-[0.63rem] bg-white`}
        >
          <div className="flex flex-col mx-6 mt-6">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2 cursor-pointer">
                <h1 className="text-lg text-[#1B1A1A] font-WorkSans font-semibold ">
                  New Payment Link
                </h1>
              </div>
              <div
                className="cursor-pointer"
                onClick={() => {
                  onClose();
                }}
              >
                <Image src={CloseIcon} alt="Close Icon" />
              </div>
            </div>
            <div className="flex flex-col gap-5 mt-6 ">
              <Input
                name="title"
                value={paymentLinkInfo.title}
                onChange={(e) =>
                  setPaymentLinkInfo({
                    ...paymentLinkInfo,
                    title: e.target.value,
                  })
                }
                label="Page Name"
                type="text"
                width="w-[19rem] md:w-[30rem]"
              />
              {/* <Input label='Description' type='text' width='w-[30rem]' height='h-[9.4rem]'/>
               */}
              <div>
                <Input
                  name="description"
                  value={paymentLinkInfo.description}
                  onChange={(e) =>
                    setPaymentLinkInfo({
                      ...paymentLinkInfo,
                      description: e.target.value,
                    })
                  }
                  label="Description"
                  type="text"
                  width="w-[19rem] md:w-[30rem]"
                />
              </div>
              <div className="flex justify-between items-center">
                <h1 className="text-[#262626] text-sm font-WorkSans font-normal leading-4 mb-2">
                  Fixed amount
                </h1>
                <CustomToggle
                  onChange={() => {
                    setFixed(!isFixed);
                    setPaymentLinkInfo({ ...paymentLinkInfo, fixed: isFixed });
                  }}
                  value={isFixed}
                />
              </div>
              {isFixed && (
                <div className="flex flex-col ">
                  <h1 className="text-[#262626] text-sm font-WorkSans font-normal leading-4 mb-2">
                    Amount
                  </h1>
                  <div className="">
                    {/* <div className='flex justify-center gap-2 md:justify-between px-5 items-center border-[0.07rem]  border-solid border-[#CACACA] md:gap-0 rounded-[0.315rem] w-[5rem] md:w-[7.15rem] h-[3.15rem]'>
                                <h1 className='text-base text-[#262626] font-WorkSans font-normal leading-5'>NGN</h1>
                                <FontAwesomeIcon icon={faChevronDown} className="w-5 h-5"/>
                                </div> */}
                    <div>
                      <input
                        name="amount"
                        value={paymentLinkInfo.amount}
                        onChange={(e) =>
                          setPaymentLinkInfo({
                            ...paymentLinkInfo,
                            amount: parseFloat(e.target.value),
                          })
                        }
                        type="number"
                        inputMode="numeric"
                        placeholder="0.00"
                        className="flex px-5 items-center border-[0.07rem] outline-none  border-solid border-[#CACACA] rounded-[0.315rem] w-[19rem] md:w-[29.9rem] h-[3.15rem]"
                      />
                    </div>
                  </div>
                  <h1 className="mt-1 text-sm text-[#1B1A1A] font-WorkSans font-medium leading-4 ">
                    Leave empty to allow customers enter desired amount
                  </h1>
                </div>
              )}
              <div>
                <div className="flex flex-col gap-2">
                  <label
                    htmlFor="redirect"
                    className="text-[#262626] text-sm font-WorkSans font-normal leading-4"
                  >
                    Redirect after payment
                  </label>
                  <input
                    name="redirect_url"
                    value={paymentLinkInfo.redirect_url}
                    onChange={(e) =>
                      setPaymentLinkInfo({
                        ...paymentLinkInfo,
                        redirect_url: e.target.value,
                      })
                    }
                    type="url"
                    placeholder="https://"
                    className="w-[19rem] md:w-[30rem] h-[3.15rem] border-[0.07rem] border-solid border-[#CACACA] outline-none rounded-[0.32rem] text-base text-[#1B1A1A] font-WorkSans font-normal leading-4 px-4"
                  />
                </div>
              </div>
              {/* <div className='flex flex-col '>
                            <h1 className='text-[#262626] text-sm font-WorkSans font-normal leading-4 mb-2'>Upload image</h1>
                            <div  className='flex justify-between items-center bg-[#F5F5F5] w-[30rem] h-[3.15rem] border-[0.07rem] border-solid border-[#CACACA] outline-none rounded-[0.32rem] text-base text-[#1B1A1A] font-WorkSans font-normal cursor-pointer leading-4 px-4'
                            onClick={handleClick}
                            >
                              <h1 className='text-base text-[#1B1A1A] font-WorkSans font-normal leading-5'>Select an image</h1>
                              <FontAwesomeIcon icon={faChevronRight}/>
                            </div>
                            <input type='file' ref={hiddenFileInput} onChange={handleChange} className='hidden'/>
                            <p className='mt-1 text-sm text-[#1B1A1A] font-WorkSans font-medium leading-4 '>Leaving this field blank adds the default image to the link</p>
                        </div> */}
              <div className="flex items-center justify-end gap-4 mt-5">
                <button
                  onClick={onClose}
                  className="flex items-center justify-center w-[5.4rem] h-11 bg-[#F5F5F5] rounded-[0.313rem] text-base text-[#262626] font-WorkSans font-normal leading-5"
                >
                  Cancel
                </button>
                <button
                  onClick={handleCreatePaymentLink}
                  className="w-[7.5rem] h-11 bg-[#3063E9] rounded-[0.313rem] text-base text-white font-WorkSans font-normal leading-5"
                >
                  <div className="flex justify-center items-center">
                    {isLoading ? <Loader isWhite={true} /> : "Create Link"}
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleChargeModal;
