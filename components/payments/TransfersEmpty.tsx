import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
// import Image from 'next/image'
import React, { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/redux-hooks/hooks";
import { setShowSidebar } from "../../redux/sidebarSlice";
import { RootState } from "../../redux/store";
// import DownloadIcon from '../../Assets/icon/Download.svg'
import SingleAccountModal from "./modals/bankaccount/SingleAccountModal";
import Hamburger from "../../Assets/icon/HamburgerIcon.svg";
import ExternalTransferModal from "./modals/bankaccount/ExternalTransferModal";
import { faCheckCircle, faCircle } from "@fortawesome/free-regular-svg-icons";

const TransfersEmpty = () => {
  const [showModal, setShowModal] = useState<boolean>(false);
  // const [secondStep, setSecondStep] = useState<number>(1);
  // const [isSecondStep,setSecondStep] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const sidebarShow = useAppSelector(
    (state: RootState) => state.sidebar.sidebarShow,
  );
  // const bankAccount = useAppSelector(
  // 	(state: RootState) => state.payment.isBankAccount
  // );

  // const onionPayAccount = useAppSelector(
  // 	(state: RootState) => state.payment.isOnionPay
  // );

  const [active, setActive] = useState<number>(0);

  const handleActive = (activeTab: number) => {
    active === activeTab ? setActive(0) : setActive(activeTab);
  };

  return (
    <div>
      <div>
        <div className="w-[22rem] md:w-[32rem] lg:w-[72rem] mt-6 mx-4 lg:mx-6">
          <div className="flex flex-col gap-5 lg:gap-0 lg:flex-row lg:justify-between lg:items-center ">
            <div className="flex justify-between items-center mx-4 mb-12 w-auto">
              <h1 className="text-[#262626] text-xl md:text-[2rem] lg:text-[2rem] font-WorkSans font-medium leading-9">
                Transfers
              </h1>
              {!sidebarShow ? (
                <div
                  className="lg:hidden"
                  onClick={() => dispatch(setShowSidebar(true))}
                >
                  <Image src={Hamburger} alt="Hamburger Icon" />
                </div>
              ) : null}
            </div>
            {/* <div className='flex items-center gap-4'>
                <div className='flex justify-center items-center w-[7rem] lg:w-[9.4rem] h-11  rounded-[0.32rem] bg-[#F5F5F5]'>
                <div className='flex items-center gap-3 lg:gap-7'>
                  <h1 className='text-sm'>Last 7days</h1>
                  <FontAwesomeIcon icon={faChevronDown} className='w-4 h-4 lg:w-5 lg:h-5 text-sm'/>
                </div>
              </div>
              <div className='flex justify-center items-center w-[9.8rem] lg:w-[11.1rem] h-11 rounded-[0.32rem] bg-[#F5F5F5]'>
                <div className='flex items-center gap-4 lg:gap-7'>
                  <h1 className='text-sm'>Filters applied: 2</h1>
                  <FontAwesomeIcon icon={faChevronDown} className='w-4 h-4 lg:w-5 lg:h-5 text-sm'/>
                </div>
              </div>
                </div> */}
          </div>
          <div>
            <div className="flex items-center justify-end mt-12">
              <div className="flex gap-4">
                <div className="flex justify-between items-center ">
                  {/* <div className='flex justify-center items-center gap-4 rounded-[0.32rem] bg-[#F5F5F5] text-black  w-[9.15rem] h-11 text-base font-WorkSans font-normal leading-4'>
                    <h1>Download</h1>
                    <div>
                      <Image src={DownloadIcon} alt='Download Icon'/> 
                    </div> 
                  </div> */}
                </div>
                {/* <div>
                  <div className='flex  items-center lg:w-[15rem] h-11 rounded-[0.32rem] bg-[#3063E9] '>
                    <div className='flex items-center mx-4 gap-4'>
                      <h1 className='text-base font-WorkSans font-normal text-white'>Make a new transfer</h1>
                      <FontAwesomeIcon icon={faPlus} className='w-5 h-5 text-base text-white'/>
                    </div>
                  </div>
                </div> */}
              </div>
            </div>
          </div>
          {/* <div className="lg:mt-6 w-[20rem] lg:w-[31.5rem] h-16 ">
						<h1 className="text-[2rem] text-[#262626]">
							You have not made any transfers in the last 7 days.
						</h1>
						<div className="flex mt-6  items-center w-[13rem] md:w-[15rem] lg:w-[15rem] h-11 rounded-[0.32rem] bg-[#3063E9] ">
							<div
								className="flex  items-center mx-4 gap-4 cursor-pointer"
								onClick={() => {
									setShowModal(true);
								}}
							>
								<h1 className="text-sm md:text-base font-WorkSans font-normal text-white">
									Make a new transfer
								</h1>
								<FontAwesomeIcon
									icon={faPlus}
									className="w-5 h-5 text-base text-white"
								/>
							</div>
						</div>
					</div> */}
          <div
            className=" flex justify-center items-center"
            // id="wrapper"
          >
            <div className="w-full h-[32.75rem] md:mb-72 lg:mb-0 rounded-[0.63rem] bg-white">
              <div className="mx-6 my-6">
                <div className="flex items-center justify-center">
                  <h1 className="text-lg text-[#262626] font-WorkSans font-semibold leading-5">
                    Make a Transfer
                  </h1>
                  {/* <div>
								<Image
									src={CloseIcon}
									className="cursor-pointer"
									onClick={() => {
										onClose();
									}}
									alt="Close Icon"
								/>
							</div> */}
                </div>
                <div className="mt-6">
                  <h1 className="text-xl text-center text-[#262626] font-WorkSans font-semibold  leading-6">
                    How would you like to make your Transfer?
                  </h1>
                </div>
                <div className="flex flex-col lg:flex-row  justify-center gap-4 mt-6">
                  {/* First Card */}
                  <div
                    className={`w-auto h-[8.85rem] border-[0.063rem] ${
                      active === 1 ? "border-[#3063E9]" : "border-[#CACACA]"
                    } border-solid cursor-pointer rounded-[0.313rem]`}
                    onClick={() => {
                      handleActive(1);
                      setShowModal(true);
                      // dispatch(setBankAccount(true));
                      // dispatch(setOnionPay(false));
                    }}
                  >
                    <div className="mx-6 my-3 md:my-6">
                      <div className="flex items-center justify-between mb-3">
                        <h1 className="text-xl text-[#262626] font-WorkSans font-semibold leading-6">
                          Transfer to Bank Account
                        </h1>
                        <div className="flex justify-end w-6 h-6">
                          {active === 1 ? (
                            <FontAwesomeIcon
                              icon={faCheckCircle}
                              className="text-2xl  text-[#3063E9]"
                            />
                          ) : (
                            <FontAwesomeIcon
                              icon={faCircle}
                              className="text-2xl  text-[#CACACA] "
                            />
                          )}
                        </div>
                      </div>
                      <p className="text-base  text-[#262626] font-WorkSans font-normal leading-5">
                        Send money directly from your Onion Pay wallet to a Bank
                        Account instantly.
                      </p>
                    </div>
                  </div>

                  {/* Third card */}
                  <div
                    className={`w-auto h-[8.85rem] border-[0.063rem] ${
                      active === 2 ? "border-[#3063E9]" : "border-[#CACACA]"
                    } border-solid cursor-pointer rounded-[0.313rem]`}
                    onClick={() => {
                      handleActive(2);
                      setShowModal(true);

                      // dispatch(setOnionPay(true));
                      // dispatch(setBankAccount(false));
                    }}
                  >
                    <div className="mx-6 my-3 md:my-6">
                      <div className="flex items-center justify-between mb-3">
                        <h1 className="text-xl text-[#262626] font-WorkSans font-semibold leading-6">
                          Transfer to Onion Pay Wallet
                        </h1>
                        <div className="flex justify-end w-6 h-6">
                          {active === 2 ? (
                            <FontAwesomeIcon
                              icon={faCheckCircle}
                              className="text-2xl  text-[#3063E9]"
                            />
                          ) : (
                            <FontAwesomeIcon
                              icon={faCircle}
                              className="text-2xl  text-[#CACACA] "
                            />
                          )}
                        </div>
                      </div>
                      <p className="text-base  text-[#262626] font-WorkSans font-normal leading-5">
                        Send money from your Onion Pay Wallet to another using a
                        Wallet ID.
                      </p>
                    </div>
                  </div>
                </div>
                {/* <div
							className="flex justify-center mt-6"
							onClick={handlerFunc}
						>
							<button
								disabled={active ? false : true}
								className="w-[24.69rem] h-11 bg-[#3063E9] rounded-[0.313rem] text-base text-white font-WorkSans font-normal leading-5"
							>
								Start Transfer
							</button>
						</div> */}
              </div>
            </div>
          </div>
        </div>
        <div>
          {/* {secondStep == 1 && (
						<TransferModal
							handlerFunc={() => setSecondStep(2)}
							isVisible={showModal}
							onClose={async () => setShowModal(false)}
						/>
					)} */}
          {/* <TransferTypeModal isVisible={showModal} onClose={async () => setShowModal(false)}/> */}
          {active == 1 && (
            <ExternalTransferModal
              // handleModal={(secondStep) => setSecondStep(secondStep)}
              isVisible={showModal}
              onClose={async () => {
                setShowModal(false);
                // setSecondStep(1);
                setActive(0);
              }}
            />
          )}
          {active == 2 && (
            <SingleAccountModal
              // handleModal={(secondStep) => setSecondStep(secondStep)}
              isVisible={showModal}
              onClose={async () => {
                setShowModal(false);
                // setSecondStep(1);
                setActive(0);
              }}
            />
          )}
          {/* {secondStep == 2 && bankAccount == true  ? (
						<ExternalTransferModal
							handleModal={(secondStep) => setSecondStep(secondStep)}
							isVisible={showModal}
							onClose={async () => {
								setShowModal(false);
								setSecondStep(1);
							}}
						/>
					) : (
					
					)} */}

          {/* <SingleTransferModal isVisible={showModal} onClose={async () => setShowModal(false)} /> */}
          {/* <SingleMobileTransferModal isVisible={showModal} onClose={async () => setShowModal(false)}/> */}
        </div>
      </div>
    </div>
  );
};

export default TransfersEmpty;
