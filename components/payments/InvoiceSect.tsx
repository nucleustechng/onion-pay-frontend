import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import Image from "next/image";
import React, { useEffect, useState } from "react";
import HelpButton from "../HelpButton";
// import SearchIcon from "../../Assets/icon/Search.svg";
// import CreateInvoiceModal from './modals/CreateInvoiceModal'
// import Hamburger from "../../Assets/icon/HamburgerIcon.svg";
import { useAppSelector } from "../../redux/redux-hooks/hooks";
// import { setShowSidebar } from "../../redux/sidebarSlice";
import { RootState } from "../../redux/store";
import CreateInvoiceModal from "../transactions/modals/CreateInvoiceModal";
import CompleteInvoiceModal from "../transactions/modals/CompleteInvoiceModal";
import { useLoadInvoicesQuery } from "../../modules/Invoices/invoiceApi";
import InvoiceHeader from "./InvoiceHeader";
import InvoiceTable from "./InvoiceTable";
import Loader from "../Loader";
import Header from "../new/Header";

const InvoiceSect = () => {
  const [outputData, setOutputData] = useState("");

  const handleDataSubmit = (data: any) => {
    setOutputData(data);
  };

  const [showModal, setShowModal] = useState<boolean>(false);
  // const dispatch = useAppDispatch();
  // const sidebarShow = useAppSelector(
  //   (state: RootState) => state.sidebar.sidebarShow,
  // );
  const isSecondStep = useAppSelector(
    (state: RootState) => state.invoice.isSecondStep,
  );

  const [invoicesArray, setInvoicesArray] = useState<any>([]);
  // const [loading, setLoading] = useState(true);

  const { data: invoiceData, isSuccess, isLoading } = useLoadInvoicesQuery();
  // const  [showEmpty,setShowEmpty] = useState<boolean>(true)

  useEffect(() => {
    // invoicesArray.length >= 1 ?  setShowEmpty(false) : setShowEmpty(true);

    if (isSuccess && invoiceData.success == true) {
      setInvoicesArray(invoiceData["invoices"]);

      // setLoading(false)
    } else {
      console.log("An error occured");
    }
  }, [isSuccess, invoicesArray, invoiceData]);

  return (
    <div>
      {invoicesArray?.length == 0 ? (
        <div className="flex flex-col w-full h-screen overflow-y-auto px-2 lg:px-6">
          <Header mainText="Invoices" />
          {/* Button to add subaccounts */}
          {/* <div className='flex justify-end'>
    <div className='flex items-center justify-center gap-3 w-[12.75rem] h-11 mr-9 md:mr-0 bg-primary rounded-[0.33rem] mt-10 cursor-pointer'  onClick={()=>{
      setShowModal(true)
      }}>
      <h1 className='text-base text-[#FFFFFF] font-normal font-WorkSans leading-5'>Create an invoice</h1>
      <FontAwesomeIcon icon={faPlus} className='text-[#FFFFFF] w-5 h-5'/>
    </div>
  </div> */}
          <div className="flex flex-col gap-5 mt-6">
            <div className="w-[21rem] md:w-[27.65rem]">
              <h1 className="text-[2rem] text-[#262626] font-WorkSans font-normal leading-9">
                You have no transactions in the last 30 days, but you can change
                that.
              </h1>
            </div>
            <div className="w-[21rem] md:w-[27.65rem]">
              <p className="text-base text-[#262626] font-WorkSans font-normal leading-5">
                Your customers might be looking for ways to pay you, create a
                payment link or send them invoices.
              </p>
            </div>
            <div>
              <div
                className="flex items-center justify-center gap-3 w-[12.75rem] h-11 bg-primary rounded-[0.33rem] cursor-pointer"
                onClick={() => {
                  setShowModal(true);
                }}
              >
                <h1 className="text-base text-[#FFFFFF] font-normal font-WorkSans leading-5">
                  Create an invoice
                </h1>
                <FontAwesomeIcon
                  icon={faPlus}
                  className="text-[#FFFFFF] w-5 h-5"
                />
              </div>
            </div>
            <div>
              <CreateInvoiceModal
                onSubmit={handleDataSubmit}
                isVisible={isSecondStep ? false : showModal}
                onClose={async () => setShowModal(false)}
              />
              <CompleteInvoiceModal
                data={outputData}
                isVisible={!isSecondStep ? false : showModal}
                onClose={async () => setShowModal(false)}
              />
            </div>
          </div>
          <div className="fixed left-auto top-3/4 right-0 mr-7 z-30 mt-[8.5rem]">
            <HelpButton />
          </div>
        </div>
      ) : (
        <div className="w-full">
          <div className="flex flex-col w-full h-screen overflow-y-auto px-2 lg:px-6">
            <Header mainText="Invoices" />
            <div className="flex flex-col lg:flex lg:justify-between lg:flex-row">
              {/* Small screen search input */}
              {/* <div className="relative w-screen h-11 px-5 sm:w-[35rem] flex items-center  rounded-[0.65rem] md:hidden lg:hidden">
							<div className="absolute  pl-[0.7rem] ">
								<Image
									src={SearchIcon}
									alt="Search Icon"
									className="w-4 h-4"
								/>
							</div>
							<input
								type="text"
								className="w-screen h-11 text-sm font-normal font-WorkSans pl-10 leading-4 rounded-[0.32rem] border-solid border-[0.07rem] border-[#CACACA]"
								placeholder="Search"
							/>
						</div> */}
              <div className="flex flex-row gap-3 mt-4 md:pl-5 lg:gap-3 lg:mt-0">
                {/* <div className="hidden md:flex  md:items-center md:w-[15rem] md:h-11  lg:w-[18.75rem] lg:h-11 lg:flex lg:items-center  lg:rounded-[0.65rem]">
								<div className="absolute  pl-[0.7rem] ">
									<Image
										src={SearchIcon}
										alt="Search Icon"
										className="w-4 h-4"
									/>
								</div>
								<input
									type="text"
									className="w-[19.75rem] h-11 text-sm font-normal font-WorkSans pl-10 leading-4 rounded-[0.32rem] border-solid border-[0.07rem] border-[#CACACA]"
									placeholder="Search"
								/>
							</div> */}
                <div className="">
                  {/* <div className='flex justify-center items-center w-[3.7rem] h-9 ml-5 md:w-[9.4rem] md:h-11 lg:ml-0 lg:w-[9.4rem] lg:h-11 rounded-[0.32rem] bg-[#F5F5F5]'>
                    <div className='flex items-center gap-3 md:gap-7 lg:gap-7'>
                      <h1 className='hidden md:inline-flex md:text-sm lg:inline-flex lg:text-sm'>Last 7days</h1>
                      <FontAwesomeIcon className='inline-flex md:hidden lg:hidden w-5 h-5 ' icon={faCalendar}/>
                      <FontAwesomeIcon icon={faChevronDown} className='w-5 h-5  text-sm'/>
                    </div>
                  </div> */}
                </div>
                <div className=" ">
                  {/* <div className='w-[3.7rem] h-9 md:w-[9.4rem]  md:h-11 lg:w-[9.4rem] lg:h-11 rounded-[0.32rem] bg-[#F5F5F5]'>
                    <div className='flex items-center justify-center pt-2 gap-3 md:pt-3 md:gap-20 lg:gap-20'>
                      <h1 className='text-sm'>All</h1>
                      <FontAwesomeIcon icon={faChevronDown} className='w-5 h-5  text-sm'/>
                    </div>
                  </div> */}
                </div>
                {/* Create invoice button for small screens */}
                <div className="flex justify-start lg:hidden cursor-pointer">
                  <div
                    onClick={() => {
                      setShowModal(true);
                    }}
                    className="flex justify-center items-center gap-4 rounded-[0.32rem] text-white bg-[#3063E9]
                    w-[12rem] h-9 text-sm md:w-[12rem] md:h-11
                    lg:hidden font-WorkSans font-normal leading-4"
                  >
                    Create an Invoice
                    <FontAwesomeIcon icon={faPlus} className="w-5 h-5" />
                  </div>
                </div>
              </div>
            </div>

            <div className="hidden lg:flex lg:justify-start lg:mt-12 cursor-pointer">
              <div
                onClick={() => {
                  setShowModal(true);
                }}
                className="flex justify-center items-center gap-4 rounded-[0.32rem] text-white bg-[#3063E9]
            w-[10rem] h-9 text-sm
            lg:w-[13.4rem] lg:h-11 lg:text-base font-WorkSans font-normal leading-4"
              >
                Create an Invoice
                <FontAwesomeIcon icon={faPlus} className="w-5 h-5" />
              </div>
            </div>
            <div className="fixed mr-3 left-auto top-3/4 right-0 lg:mr-7 z-40 mt-[8.5rem]">
              <HelpButton />
            </div>
            <div className="w-[23rem] ml-4 md:ml-0 md:w-[32rem] xl:w-[71.5rem] h-[35rem] overflow-y-auto scrollbar-hide mt-10">
              <div className="relative">
                <div className="sticky top-0 z-10 bg-white">
                  <InvoiceHeader />
                </div>
                {isLoading ? (
                  <div className="  h-56 flex justify-center items-center">
                    <Loader width="w-16" height="h-16" />
                  </div>
                ) : (
                  <div className="mt-5">
                    {invoicesArray.map((invoice: any, index: any) => (
                      <div key={invoice.i_id}>
                        <InvoiceTable
                          clientName={invoicesArray[index]["client"]?.full_name}
                          email={invoicesArray[index]["client"]?.email}
                          status={invoice.paid ? "Successful" : "Pending..."}
                          amount={invoice.amount_string}
                          date={invoice.paid_on ? invoice.paid_on : "--"}
                          createdOn={
                            invoice.created_on ? invoice.created_on : "--"
                          }
                          paymentId={invoice.i_id}
                        />
                      </div>
                    ))}
                    {/* {invoicesArray.map((invoice:any,index:number) => (
                      <div key={index}>
                          <TransactionTable 
                          status={invoice.paid ? 'Successful' : 'Pending...'}
                          amount={invoice.amount_string ? invoice.amount_string : '--'}
                          date={invoice.paid_on ? invoice.paid_on : '--'}
                          paymentId={invoice.i_id ? invoice.i_id : '---'}
                          />
                      </div>
                      ))} */}
                  </div>
                )}
              </div>
            </div>
            <div>
              <div>
                <CreateInvoiceModal
                  onSubmit={handleDataSubmit}
                  isVisible={isSecondStep ? false : showModal}
                  onClose={async () => setShowModal(false)}
                />
                <CompleteInvoiceModal
                  data={outputData}
                  isVisible={!isSecondStep ? false : showModal}
                  onClose={async () => setShowModal(false)}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default InvoiceSect;
