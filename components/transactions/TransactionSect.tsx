import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import React, { Fragment, useEffect, useState } from "react";
import HelpButton from "../HelpButton";
import TransactionHeader from "./TransactionHeader";
import TransactionTable from "./TransactionTable";
import SearchIcon from "../../Assets/icon/Search.svg";
// import { faCalendar } from "@fortawesome/free-regular-svg-icons";
import Hamburger from "../../Assets/icon/HamburgerIcon.svg";
import { useAppDispatch, useAppSelector } from "../../redux/redux-hooks/hooks";
import { setShowSidebar } from "../../redux/sidebarSlice";
import { RootState } from "../../redux/store";
// import CreateInvoiceModal from './modals/CreateInvoiceModal'
// import CompleteInvoiceModal from './modals/CompleteInvoiceModal'
import {
	useLoadSingleTransactionQuery,
	// useLoadSingleTransactionQuery,
	useLoadTransactionsQuery,
} from "../../modules/TransactionsApi/transactionsApi";
import Loader from "../Loader";
import CreateInvoiceModal from "./modals/CreateInvoiceModal";
import CompleteInvoiceModal from "./modals/CompleteInvoiceModal";
import { setSecondStep } from "../../redux/invoiceSlice";
// import { Button } from "../../@/components/ui/button";
// import { ReloadIcon } from "@radix-ui/react-icons";
import { Dialog, Transition } from "@headlessui/react";
import { formatDate } from "../../@/lib/utils";
import { XIcon } from "lucide-react";

const TransactionSect = () => {
	// const [showModal,setShowModal] = useState<boolean>(false);
	const dispatch: any = useAppDispatch();
	const [outputData, setOutputData] = useState("");
	const [isOpen, setIsOpen] = useState(false);

	function closeModal() {
		setIsOpen(false);
	}

	function openModal() {
		setIsOpen(true);
	}

	const handleDataSubmit = (data: any) => {
		setOutputData(data);
	};
	const sidebarShow = useAppSelector(
		(state: RootState) => state.sidebar.sidebarShow
	);
	const isSecondStep = useAppSelector(
		(state: RootState) => state.invoice.isSecondStep
	);
	const [showModal, setShowModal] = useState<boolean>(false);

	const [referenceID, setReferenceID] = useState<string>("");
	// const [mytransaction, setMyTransaction] = useState<any>();
	const [selectedIndex, setSelectedIndex] = useState(0);

	const [transactionsArray, setTransactionsArray] = useState<any>([]);

	const {
		data: transactionsData,
		isSuccess,
		isLoading,
	} = useLoadTransactionsQuery();

	const { data: searchData, isSuccess: isSearchSuccess } =
		useLoadSingleTransactionQuery(referenceID);

	// const { data: transaction, isSuccess: transactionSuccess } =
	// 	useLoadSingleTransactionQuery(transactionID);
	const [loading, setLoading] = useState<boolean>(true);
	// const  [showEmpty,setShowEmpty] = useState<boolean>(true)

	useEffect(() => {
		// invoicesArray.length >= 1 ?  setShowEmpty(false) : setShowEmpty(true);
		if (isSearchSuccess) {
			const strIndex: any = "transaction";
			setTransactionsArray(searchData[strIndex]);
		}

		if (isSuccess && transactionsData.success == true) {
			setTransactionsArray(transactionsData["records"]);
			setLoading(false);
		} else {
			console.log("An error occured");
		}
	}, [
		isSuccess,
		transactionsArray,
		transactionsData,
		isSearchSuccess,
		// transaction,
		// mytransaction,
		// transactionID,
		// transactionSuccess,
	]);

	type ICardItem = {
		mainHeader: string;
		subText: string;
	};
	const CardItem = ({ mainHeader, subText }: ICardItem) => {
		return (
			<div className="flex items-center justify-between">
				<h1 className="font-WorkSans text-sm font-normal text-[#898989]">
					{mainHeader}:
				</h1>
				<h2 className="font-WorkSans text-sm font-normal text-[#1B1A1A]">
					{subText}
				</h2>
			</div>
		);
	};
	return (
		<div>
			{loading ? (
				<div className="flex justify-center  items-center w-[72rem] mt-20">
					<Loader
						width="w-[5rem]"
						height="h-[5rem]"
					/>
				</div>
			) : (
				<div>
					{transactionsArray?.length == 0 ? (
						<div className="w-[25rem] sm:w-[45rem] md:w-[32rem] lg:w-[60rem] xl:w-[70rem] mt-6 mx-6">
							<div className="flex justify-between items-center mr-9 mb-12">
								<h1 className="text-[2rem] text-[#262626]  font-WorkSans font-medium leading-[2.4rem]">
									Collections
								</h1>
								{!sidebarShow ? (
									<div
										className="flex md:hidden lg:hidden"
										onClick={() => dispatch(setShowSidebar(true))}
									>
										<Image
											src={Hamburger}
											alt="Hamburger Icon"
										/>
									</div>
								) : null}
							</div>
							{/* Button to add subaccounts */}
							<div className="flex justify-end">
								<div
									className="flex items-center justify-center gap-3 w-[12.75rem] h-11 bg-primary rounded-[0.33rem] mt-10 cursor-pointer"
									onClick={() => {
										setShowModal(true);
									}}
								>
									<h1 className="text-base text-[#FFFFFF] font-normal font-WorkSans leading-5">
										Create an invoice
									</h1>
									<FontAwesomeIcon
										icon={faPlus}
										className="w-5 h-5 text-[#FFFFFF]"
									/>
								</div>
							</div>
							<div className="flex flex-col gap-5 mt-6">
								<div className="w-[27.65rem]">
									<h1 className="text-[2rem] text-[#262626] font-WorkSans font-normal leading-9">
										You have no transactions in the last 30 days, but you can
										change that.
									</h1>
								</div>
								<div className="w-[27.65rem]">
									<p className="text-base text-[#262626] font-WorkSans font-normal leading-5">
										Your customers might be looking for ways to pay you, create
										a payment link or send them invoices.
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
											className="text-[#FFFFFF]  w-5 h-5"
										/>
									</div>
								</div>
								<div>
									<CreateInvoiceModal
										onSubmit={handleDataSubmit}
										isVisible={isSecondStep ? false : showModal}
										onClose={async () => setShowModal(false)}
									/>
									{
										<CompleteInvoiceModal
											data={outputData}
											isVisible={!isSecondStep ? false : showModal}
											onClose={async () => {
												setShowModal(false);
												dispatch(setSecondStep(false));
											}}
										/>
									}
								</div>
							</div>
							<div className="fixed left-auto top-3/4 right-0 mr-7 z-30 mt-[8.5rem]">
								<HelpButton />
							</div>
						</div>
					) : (
						<div className="w-screen md:w-[32rem] lg:w-[72rem] mt-5 lg:mx-6 lg:mt-7">
							<div className="flex flex-col lg:flex lg:justify-between lg:flex-row">
								<div className="flex justify-between items-center mb-6 px-5 lg:px-0 lg:mb-0">
									<h1 className="inline-flex text-[2rem] lg:flex text-[#262626] lg:text-[2rem] font-WorkSans font-medium leading-9">
										Collections
									</h1>
									{!sidebarShow && (
										<div
											className="lg:hidden"
											onClick={() => dispatch(setShowSidebar(true))}
										>
											<Image
												src={Hamburger}
												alt="Hamburger Icon"
											/>
										</div>
									)}
								</div>
								{/* Small screen search input */}
								<div className="relative w-screen h-11 px-5 sm:w-[35rem] flex items-center  rounded-[0.65rem] md:hidden lg:hidden">
									<div className="absolute  pl-[0.7rem] ">
										<Image
											src={SearchIcon}
											alt="Search Icon"
											className="w-4 h-4"
										/>
									</div>
									<input
										type="text"
										name="r_id"
										value={referenceID}
										onChange={(e) => setReferenceID(e.target.value)}
										className="w-screen h-11 text-sm font-normal font-WorkSans pl-10 leading-4 rounded-[0.32rem] border-solid border-[0.07rem] border-[#CACACA]"
										placeholder="Search"
									/>
								</div>
								<div className="flex flex-row gap-3 mt-4 md:pl-5 md:gap-1 lg:gap-3 lg:mt-0">
									<div className="hidden md:relative md:flex  md:items-center md:w-[15rem] md:h-11  lg:w-[18.75rem] lg:h-11 lg:flex lg:items-center  lg:rounded-[0.65rem]">
										<div className="absolute  pl-[0.7rem] ">
											<Image
												src={SearchIcon}
												alt="Search Icon"
												className="w-4 h-4"
											/>
										</div>
										<input
											type="text"
											name="r_id"
											value={referenceID}
											onChange={(e) => setReferenceID(e.target.value)}
											className="w-[18.75rem] h-11 text-sm font-normal font-WorkSans pl-10 leading-4 rounded-[0.32rem] border-solid border-[0.07rem] border-[#CACACA]"
											placeholder="Search"
										/>
									</div>
									{/* <div className="">
										<div className="flex justify-center items-center w-[3.7rem] h-9 ml-5 md:w-[7.4rem] md:h-11 lg:ml-0 lg:w-[9.4rem] lg:h-11 rounded-[0.32rem] bg-[#F5F5F5]">
											<div className="flex items-center gap-3 md:gap-7 lg:gap-7">
												<h1 className="hidden md:inline-flex md:text-xs lg:inline-flex  lg:text-sm">
													Last 7 days
												</h1>
												<FontAwesomeIcon
													className="inline-flex md:hidden lg:hidden "
													icon={faCalendar}
												/>
												<FontAwesomeIcon
													icon={faChevronDown}
													className="w-5 h-5 text-sm"
												/>
											</div>
										</div>
									</div> */}
									{/* <div className=" ">
										<div className="w-[3.7rem] h-9 md:w-[6.4rem]  md:h-11 lg:w-[9.4rem] lg:h-11 rounded-[0.32rem] bg-[#F5F5F5]">
											<div className="flex items-center justify-center pt-2 gap-3 md:pt-3 md:gap-10 lg:gap-20">
												<h1 className="text-sm">All</h1>
												<FontAwesomeIcon
													icon={faChevronDown}
													className="w-5 h-5 text-sm"
												/>
											</div>
										</div>
									</div> */}
								</div>
							</div>
							{/* 
          <div className='hidden lg:flex lg:justify-end lg:mt-12 cursor-pointer' onClick={()=>{
            setShowModal(true)
          }}>
            <div className='flex justify-center items-center gap-4 rounded-[0.32rem] text-white bg-[#3063E9]
            w-[10rem] h-9 text-sm
            lg:w-[13.4rem] lg:h-11 lg:text-base font-WorkSans font-normal leading-4'>
              Create an Invoice
              <FontAwesomeIcon icon={faPlus}/>  
            </div>
          </div> */}
							<div className="fixed mr-3 left-auto top-[35rem] right-0 lg:mr-7 z-40 mt-[8.5rem]">
								<HelpButton />
							</div>
							<div className="xl:w-[71.5rem] h-[35rem] overflow-y-auto scrollbar-hide mt-10">
								<div className="relative">
									<div className="sticky top-0 z-10 bg-white">
										<TransactionHeader />
									</div>
									{isLoading ? (
										<div className="  h-56 flex justify-center items-center">
											<Loader
												width="w-16"
												height="h-16"
											/>
										</div>
									) : (
										<div className="mt-5">
											{/* {mytransaction ? (
												<TransactionTable
													debit={mytransaction?.debit}
													//  status={mytransaction['events'][0]?.status ? mytransaction['events'][0]?.status : '--'}
													amount={mytransaction.amount_string}
													date={mytransaction.on ? mytransaction.on : "--"}
													sender={mytransaction.sender}
													recipient={mytransaction?.recipient}
													handleSelected={() => {
														openModal();
													}}
												/>
											) : ( */}
											{transactionsArray?.map(
												(transaction: any, index: number) => (
													<div key={index}>
														<TransactionTable
															debit={transaction?.debit}
															handleSelected={() => {
																openModal();
																setSelectedIndex(index);
															}}
															r_id={transaction?.r_id}
															// status={transactionsArray[index]['events'][0]?.status ? transactionsArray[index]['events'][0]?.status : '--'}
															amount={transaction?.amount_string}
															date={transaction.on ? transaction.on : "--"}
															sender={transaction.sender}
															recipient={
																transaction?.recipient
																	? transaction?.recipient
																	: "N/A"
															}
														/>
													</div>
												)
											)}

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
								<Transition
									appear
									show={isOpen}
									as={Fragment}
								>
									<Dialog
										as="div"
										className="relative z-10"
										onClose={closeModal}
									>
										<Transition.Child
											as={Fragment}
											enter="ease-out duration-300"
											enterFrom="opacity-0"
											enterTo="opacity-100"
											leave="ease-in duration-200"
											leaveFrom="opacity-100"
											leaveTo="opacity-0"
										>
											<div className="fixed inset-0 bg-black bg-opacity-25" />
										</Transition.Child>

										<div className="fixed inset-0 overflow-y-auto">
											<div className="flex min-h-full items-center justify-center p-4 text-center">
												<Transition.Child
													as={Fragment}
													enter="ease-out duration-300"
													enterFrom="opacity-0 scale-95"
													enterTo="opacity-100 scale-100"
													leave="ease-in duration-200"
													leaveFrom="opacity-100 scale-100"
													leaveTo="opacity-0 scale-95"
												>
													<Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
														<div className="flex justify-between items-center">
															<Dialog.Title
																as="h3"
																className="text-lg font-medium leading-6 text-gray-900"
															>
																Transaction Details
															</Dialog.Title>
															<XIcon
																onClick={() => closeModal()}
																className="cursor-pointer"
															/>
														</div>
														<div className="w-auto border-[1px] border-primary mt-3" />

														<div className="mt-2">
															<div>
																<div className="flex flex-col gap-6 mt-6">
																	<CardItem
																		mainHeader="Sender"
																		subText={
																			transactionsArray[selectedIndex].sender
																		}
																	/>
																	<CardItem
																		mainHeader="Recipient"
																		subText={
																			transactionsArray[selectedIndex].recipient
																				? transactionsArray[selectedIndex]
																						.recipient
																				: "N/A"
																		}
																	/>
																	<CardItem
																		mainHeader="Transaction ID"
																		subText={
																			transactionsArray[selectedIndex].r_id
																		}
																	/>
																	{!transactionsArray[selectedIndex].debit && (
																		<CardItem
																			mainHeader="Transaction reference"
																			subText={
																				transactionsArray[selectedIndex].t_id
																			}
																		/>
																	)}
																	<CardItem
																		mainHeader="Amount"
																		subText={
																			transactionsArray[selectedIndex]
																				.amount_string
																		}
																	/>
																	<CardItem
																		mainHeader="Date"
																		subText={formatDate(
																			transactionsArray[selectedIndex].on
																		)}
																	/>
																	{/* <div className="w-auto p-4 h-auto bg-[#E7EDFF] rounded-[5px]">
																		<div>
																			<h1 className="font-WorkSans text-sm font-normal text-[#898989]">
																				Complain:
																			</h1>
																			<h2 className="font-WorkSans text-sm font-normal text-[#1B1A1A]">
																				I kicked out of my dashboard every time
																				I start a transfer process.
																			</h2>
																		</div>
																	</div> */}
																	{/* <div>
																		<Button
																			disabled={false}
																			className="w-full bg-[#3063E9] text-[#FFF]"
																		>
																			<ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
																			Reply customer
																		</Button>
																	</div> */}
																</div>
															</div>
														</div>
													</Dialog.Panel>
												</Transition.Child>
											</div>
										</div>
									</Dialog>
								</Transition>
							</div>
						</div>
					)}
				</div>
			)}
		</div>
	);
};

export default TransactionSect;
