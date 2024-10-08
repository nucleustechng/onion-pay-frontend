import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loader from "../../Loader";
import Input from "../../Input";
import {
  useLoadPaymentLinksQuery,
  useUpdatePaymentPageMutation,
} from "../../../modules/PaymentPageApi/paymentPageApi";

interface Props {
  isVisible: boolean;
  onClose: () => {};
  prevPageID: string;
  prevPageName: string;
  prevAmount: number;
  prevDescription: string;
  prevRedirect: string;
}

const EditLinkModal = ({
  isVisible,
  onClose,
  prevPageID,
  prevPageName,
  prevAmount,
  prevDescription,
  prevRedirect,
}: Props) => {
  // const [showSuccessToast, setShowSuccessToast] = useState(false);
  // const [showErrorToast, setShowErrorToast] = useState(false);

  const [paymentLinkInfo, setPaymentLinkInfo] = useState({
    title: prevPageName && prevPageName,
    p_id: prevPageID && prevPageName,
    amount: prevAmount && prevAmount,
    description: prevDescription && prevDescription,
    redirect_url: prevRedirect && prevRedirect,
  });

  const [updatePaymentLink, { data: updateLinkData, isSuccess, isLoading }] =
    useUpdatePaymentPageMutation();

  const paymentPages = useLoadPaymentLinksQuery();

  const handleUpdatePaymentLink = async () => {
    try {
      if (
        paymentLinkInfo.title &&
        paymentLinkInfo.p_id &&
        paymentLinkInfo.amount &&
        paymentLinkInfo.description &&
        paymentLinkInfo.redirect_url
      ) {
        await updatePaymentLink(paymentLinkInfo);
        paymentPages.refetch();
      } else {
        toast.error("Fill in all fields!");
      }
    } catch (err) {
      console.log(err);
    }
    // onClose()
  };

  useEffect(() => {
    setPaymentLinkInfo({ ...paymentLinkInfo, p_id: prevPageID });
    if (isSuccess) {
      // setShowSuccessToast(true);
      // toast.success('You have successfully edited your paymentlink!');

      // setTimeout(() => {
      onClose();
      // },500)
      // setPaymentLinkInfo({
      //   title: '',
      //   p_id: '',
      //   amount: 0,
      //   description: '',
      //   redirect_url: '',
      // });
    }
  }, [isSuccess]);

  useEffect(() => {
    if (isSuccess) {
      toast.success("You have successfully edited your paymentlink!");
    } else {
      toast.error(updateLinkData?.reason);
    }
  }, [isSuccess, updateLinkData]);

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
        className="fixed inset-0 bg-[#262626] z-50 bg-opacity-50 backdrop-blur-[0.05rem] flex justify-center overflow-y-scroll "
        id="wrapper"
        onClick={handleClose}
      >
        <div className="w-[22rem] md:w-[33.26rem] h-[35rem] mt-32 rounded-[0.63rem] bg-white">
          <div className="mx-6 mt-6">
            <div className="flex justify-between items-center">
              <div className="flex items-center ">
                <h1 className="text-lg text-[#262626] font-WorkSans font-semibold leading-5">
                  Edit payment link
                </h1>
              </div>
              <div className="cursor-pointer" onClick={() => onClose()}>
                <FontAwesomeIcon icon={faXmark} className="w-5 h-5" />
              </div>
            </div>

            <div className="flex flex-col gap-6 mt-7">
              <Input
                name="title"
                value={paymentLinkInfo.title}
                onChange={(e) =>
                  setPaymentLinkInfo({
                    ...paymentLinkInfo,
                    title: e.target.value,
                  })
                }
                label="Page name"
                type="text"
                width="w-[19rem] md:w-[30rem]"
                placeholder=""
                height="h-[3.125rem]"
                textSize={""}
              />
              {/* <div className='flex flex-col gap-4'>
                            <h1 className={`text-sm  text-[#1B1A1A] font-WorkSans font-normal leading-4 `}>Page ID</h1>
                            <h2 className='text-sm text-[#1B1A1A] font-WorkSans font-semibold'>{pageID}</h2>
                        </div> */}
              <div className="flex flex-col ">
                <h1 className="text-[#262626] text-sm font-WorkSans font-normal leading-4 mb-2">
                  Amount
                </h1>
                <div className="flex items-center justify-between">
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
                      className="flex px-5 items-center border-[0.07rem] outline-none  border-solid border-[#CACACA] rounded-[0.315rem] w-[19rem] md:w-[30rem] h-[3.15rem]"
                    />
                  </div>
                </div>
                <h1 className="mt-1 text-sm text-[#1B1A1A] font-WorkSans font-normal leading-4 ">
                  Leave empty to allow customers enter desired amount
                </h1>
              </div>
              <div className="flex flex-col gap-2">
                <label
                  htmlFor="redirect"
                  className="text-[#262626] text-sm font-WorkSans font-normal leading-4"
                >
                  Redirect url
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
                placeholder=""
                height="h-[3.125rem]"
                textSize={""}
              />
            </div>

            {/* Action buttons */}
            <div className="flex items-center justify-end gap-4 mt-5">
              <div
                onClick={handleUpdatePaymentLink}
                className="flex justify-center cursor-pointer items-center w-[5rem] h-11 bg-[#3063E9] rounded-[0.313rem] text-base text-white font-WorkSans font-normal leading-5"
              >
                {isLoading ? <Loader isWhite={true} /> : <h1>Done</h1>}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditLinkModal;
