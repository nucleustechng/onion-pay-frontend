import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import Hamburger from 'hamburger-react'
import React, { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/redux-hooks/hooks";
import { RootState } from "../../redux/store";
// import { setShowSidebar } from '../../redux/sidebarSlice'
import SingleChargeModal from "./modals/SingleChargeModal";
import Hamburger from "../../Assets/icon/HamburgerIcon.svg";
import Image from "next/image";
import { setShowSidebar } from "../../redux/sidebarSlice";

const PaymentLinksEmpty = () => {
  const [showModal, setShowModal] = useState<boolean>(false);
  const dispatch: any = useAppDispatch();
  const sidebarShow: any = useAppSelector(
    (state: RootState) => state.sidebar.sidebarShow,
  );

  return (
    <div>
      <div className="relative">
        <div className="w-[22rem] sm:w-[40rem] md:w-[58rem]  xl:w-[70rem] mx-6 mt-6">
          <div className="flex justify-between items-center mr-9 mb-12">
            <h1 className="text-[2rem] text-[#262626]  font-WorkSans font-medium leading-[2.4rem]">
              Payment link
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
            <div className="flex gap-4 justify-end md:justify-end items-center mt-[3.2rem]">
              <div>
                {/* <div className='flex  items-center md:w-[12.5rem]  h-11 rounded-[0.32rem] bg-[#F5F5F5] '>
                    <div className='flex  items-center mx-4 gap-4'>
                      <h1 className='text-base font-WorkSans font-normal text-[#262626] hidden md:inline-flex'>All payment links</h1>
                      <h1 className='text-base font-WorkSans font-normal text-[#262626] inline-flex md:hidden'>All</h1>
                      <FontAwesomeIcon icon={faChevronDown} className='w-5 h-5 text-base text-[#262626]'/>
                    </div>
                  </div> */}
              </div>
              {/* <div>
                  <div className='flex  items-center lg:w-[12.7rem] h-11 rounded-[0.32rem] bg-[#3063E9] '>
                    <div className='flex  items-center mx-4 gap-4 cursor-pointer' onClick={()=>{
                    setShowModal(true)
                    }}>
                      <h1 className='text-base font-WorkSans font-normal text-white'>New payment link</h1>
                      <FontAwesomeIcon icon={faPlus} className='w-5 h-5 text-base text-white'/>
                    </div>
                  </div>
                </div> */}
            </div>
          </div>
          <div className="lg:mt-6 w-[22rem] md:w-[31.5rem] h-16 ">
            <h1 className="text-[2rem] text-[#262626] font-WorkSans font-normal leading-9 mb-4">
              You do not have any payment links.
            </h1>
            <p className="text-sm font-WorkSans font-normal leading-4">
              This is the best way to receive money from your clients.
            </p>
            <div className="flex mt-6  items-center w-[12rem] lg:w-[14rem] h-11 rounded-[0.32rem] bg-[#3063E9] ">
              <div
                className="flex  items-center mx-4 gap-4 cursor-pointer"
                onClick={() => {
                  setShowModal(true);
                }}
              >
                <h1 className="text-sm md:text-base font-WorkSans font-normal text-white">
                  New payment link
                </h1>
                <FontAwesomeIcon
                  icon={faPlus}
                  className="w-5 h-5 text-base text-white"
                />
              </div>
            </div>
          </div>
          <div>
            {/* <PaymentLinkModal isVisible={isSecondStep ? false : showModal}  onClose={async () => setShowModal(false)}/> */}
            <SingleChargeModal
              isVisible={showModal}
              onClose={async () => setShowModal(false)}
            />
            {/* {!isSingleCharge && <SubscriptionLinkModal isVisible={!isSecondStep ?  false : showModal} onClose={async () => setShowModal(false)}/>} */}

            {/* <VerifyAccountModal isVisible={showModal} onClose={async () => setShowModal(false)}/> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentLinksEmpty;
