import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import React, { useEffect, useState } from "react";
// import DownloadIcon from '../../Assets/icon/Download.svg'
import { useLoadPaymentLinksQuery } from "../../modules/PaymentPageApi/paymentPageApi";
import { useAppDispatch, useAppSelector } from "../../redux/redux-hooks/hooks";
import { setShowSidebar } from "../../redux/sidebarSlice";
import { RootState } from "../../redux/store";
import Loader from "../Loader";
// import PaymentLinkModal from './modals/PaymentLinkModal'
// import SingleChargeModal from './modals/SingleChargeModal'
// import SubscriptionLinkModal from './modals/SubscriptionLinkModal'
import PaymentsHeader from "./PaymentsHeader";
import PaymentTable from "./PaymentTable";
import Hamburger from "../../Assets/icon/HamburgerIcon.svg";
// import dynamic from 'next/dynamic'
import SingleChargeModal from "./modals/SingleChargeModal";
import PaymentLinksEmpty from "./PaymentLinksEmpty";

const PaymentLinks = () => {
  const [showModal, setShowModal] = useState(false);
  const [paymentLinksArray, setPaymentLinksArray] = useState<any>([]);

  const handleEllipsisClick = () => {
    console.log(`Clicked ellipsis for payment link`);
    // Do whatever you need to with the clicked payment link data
  };

  const [loading, setLoading] = useState<boolean>(true);

  //
  // const isCompleted  = useAppSelector((state:RootState) => state.paymentLink.isCompleted);
  const {
    data: paymentPageData,
    isSuccess,
    isLoading,
  } = useLoadPaymentLinksQuery();

  useEffect(() => {
    if (isSuccess && paymentPageData.success == true) {
      setPaymentLinksArray(paymentPageData.pages);
      setLoading(false);
    } else {
      console.log("An error occured");
    }
  }, [isSuccess, paymentLinksArray, paymentPageData]);

  const dispatch = useAppDispatch();
  const sidebarShow = useAppSelector(
    (state: RootState) => state.sidebar.sidebarShow,
  );

  return (
    <div>
      {loading ? (
        <div className="flex justify-center  items-center w-[72rem] mt-20">
          <Loader width="w-[5rem]" height="h-[5rem]" />
        </div>
      ) : (
        <div>
          {paymentLinksArray?.length == 0 ? (
            <PaymentLinksEmpty />
          ) : (
            <div className="relative">
              <div className="w-[23rem] sm:w-[40rem] md:w-[32rem]  xl:w-[70rem] mx-6 mt-6">
                <div className="flex justify-between items-center mr-9 mb-12">
                  <h1 className="text-[2rem] text-[#262626]  font-WorkSans font-medium leading-[2.4rem]">
                    Payment Links
                  </h1>
                  {!sidebarShow && (
                    <div
                      className="lg:hidden"
                      onClick={() => dispatch(setShowSidebar(true))}
                    >
                      <Image src={Hamburger} alt="Hamburger Icon" />
                    </div>
                  )}
                </div>
                <div>
                  <div className="flex gap-4 justify-end md:justify-start items-center mt-[3.2rem]">
                    {/* <div className='flex justify-between items-center '>
                  <div className='flex justify-center items-center gap-4 rounded-[0.32rem] bg-[#F5F5F5] w-[3.5rem]  md:w-[9.15rem] h-11 text-base font-WorkSans font-normal leading-4'>
                    <h1 className='text-sm text-[#1B1A1A] font-WorkSans font-normal leading-4 hidden md:inline-flex'>Download</h1>
                    <div>
                      <Image src={DownloadIcon} alt='Download Icon'/> 
                    </div> 
                  </div>
                </div> */}
                    {/* <div> */}
                    {/* <div className='flex  items-center md:w-[12.5rem] lg:w-[13rem]  h-11 rounded-[0.32rem] bg-[#F5F5F5] '>
                    <div className='flex  items-center mx-4 gap-4'>
                      <h1 className='text-base font-WorkSans font-normal text-[#262626] hidden md:inline-flex'>All payment links</h1>
                      <h1 className='text-base font-WorkSans font-normal text-[#262626] inline-flex md:hidden'>All</h1>
                      <FontAwesomeIcon icon={faChevronDown} className='w-5 h-5 text-base text-[#262626]'/>
                    </div>
                  </div> */}
                    {/* </div> */}
                    <div>
                      <div className="flex  items-center  lg:w-[13.7rem] mr-9 md:mr-0 h-11 rounded-[0.32rem] bg-[#3063E9] ">
                        <div
                          className="flex  items-center mx-4 gap-4 cursor-pointer"
                          onClick={() => {
                            setShowModal(true);
                          }}
                        >
                          <h1 className="text-base font-WorkSans font-normal text-white">
                            New payment link
                          </h1>
                          <FontAwesomeIcon
                            icon={faPlus}
                            className="w-5 h-5 text-base text-white"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mt-6">
                  {isLoading ? (
                    <div className="flex justify-center">
                      <Loader width="w-16" height="h-16" />
                    </div>
                  ) : (
                    <div className="w-[21rem] md:w-[32rem] xl:w-[71.5rem] h-[40rem] overflow-y-auto scrollbar-hide">
                      <div className="relative">
                        <div className="sticky top-0 z-10 bg-white">
                          <PaymentsHeader />
                        </div>
                        {isLoading ? (
                          <div className="  h-56 flex justify-center items-center">
                            <Loader width="w-16" height="h-16" />
                          </div>
                        ) : (
                          <div className="pl-2 mt-5">
                            {paymentLinksArray?.map((item: any) => (
                              <div key={item?.url}>
                                <PaymentTable
                                  redirectUrl={item?.redirect_url}
                                  amount={item?.amount}
                                  description={item?.description}
                                  pageId={item?.p_id}
                                  pageName={item?.title}
                                  paymentLink={item?.url}
                                  onEllipsisClick={handleEllipsisClick}
                                />
                                <hr className="border-[#F5F5F5] border-[1px]" />
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
                <div>
                  <SingleChargeModal
                    isVisible={showModal}
                    onClose={async () => setShowModal(false)}
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default PaymentLinks;
