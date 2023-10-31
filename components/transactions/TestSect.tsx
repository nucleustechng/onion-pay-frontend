import { Dialog, Transition } from "@headlessui/react";
import { PlusIcon } from "@radix-ui/react-icons";
import { ArrowDownIcon, ArrowUpIcon, XIcon } from "lucide-react";
import Image from "next/image";
import React, { Fragment, useEffect, useState } from "react";
import { TransactionTable } from "../Tables/TransactionTable";
import { useAppDispatch, useAppSelector } from "../../redux/redux-hooks/hooks";
import { RootState } from "../../redux/store";
import { useLoadTransactionsQuery } from "../../modules/TransactionsApi/transactionsApi";
import Header from "../Header";
import { Button } from "../../@/components/ui/button";
import Hamburger from "../../Assets/icon/HamburgerIcon.svg";
import { setShowSidebar } from "../../redux/sidebarSlice";

const TransactionsContent = () => {
	const [selectedIndex, setSelectedIndex] = useState<any>();

	type ICardItem = {
		mainHeader: string;
		subText: string;
	};

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

	// const [transactionID, setTransactionID] = useState<string>("");
	// const [mytransaction, setMyTransaction] = useState<any>();

	const [transactionsArray, setTransactionsArray] = useState<any>([]);

	const {
		data: transactionsData,
		isSuccess,
		isLoading,
	} = useLoadTransactionsQuery();

	// const { data: transaction, isSuccess: transactionSuccess } =
	// 	useLoadSingleTransactionQuery(transactionID);
	// const [loading, setLoading] = useState<boolean>(true);
	// const  [showEmpty,setShowEmpty] = useState<boolean>(true)

	useEffect(() => {
		// invoicesArray.length >= 1 ?  setShowEmpty(false) : setShowEmpty(true);
		// if (transactionSuccess) {
		// 	const strIndex: any = "transaction";
		// 	setMyTransaction(transaction[strIndex]);
		// }

		if (isSuccess && transactionsData.success == true) {
			setTransactionsArray(transactionsData["records"]);
			// setLoading(false);
		} else {
			console.log("An error occured");
		}
	}, [
		isSuccess,
		transactionsArray,
		transactionsData,
		// transaction,
		// mytransaction,
		// transactionID,
		// transactionSuccess,
	]);
	const CardItem = ({ mainHeader, subText }: ICardItem) => {
		return (
			<div className="flex items-center justify-between">
				<div className="flex items-center gap-1">
					{mainHeader === "Sender" && (
						<ArrowUpIcon className="w-[18px] h-[18px] text-red-500" />
					)}
					{mainHeader === "Recipient" && (
						<ArrowDownIcon className="w-[18px] h-[18px] text-green-500" />
					)}
					<h1 className="font-WorkSans text-sm font-normal text-[#898989]">
						{mainHeader}:
					</h1>
				</div>
				<h2 className="font-WorkSans text-sm font-normal text-[#1B1A1A]">
					{subText}
				</h2>
			</div>
		);
	};

	return (
		<div className="flex flex-col h-screen overflow-y-auto">
			{/* Header */}
			<div className="flex items-center justify-between pr-2 md:pr-0 pl-2 md:pl-0">
				<Header mainText="Collections" />

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
			<div className="pl-2 md:pl-0">
				<Button
					// onClick={() => {
					// 	addAdminModal();
					// }}
					className="text-white "
				>
					Create Invoice
					<PlusIcon className="ml-2 h-4 w-4" />
				</Button>
			</div>
			{/* Table */}
			<div className="flex-1 pr-0 md:pr-6">
				{/* <DataTableDemo /> */}
				<TransactionTable
					transactions={transactionsArray}
					showMore={(index: number) => {
						openModal();
						setSelectedIndex(index);
					}}
					isLoading={isLoading}
				/>

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
									<Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-[#F5F5F5] p-6 text-left align-middle shadow-xl transition-all">
										{/* <CustomCard width="w-[400px]"> */}
										<div className="flex items-center justify-between">
											<Dialog.Title
												as="h3"
												className="text-lg font-medium leading-6 text-gray-900"
											>
												Transaction details
											</Dialog.Title>
											<div
												onClick={closeModal}
												className="cursor-pointer"
											>
												<XIcon />
												{/* <Image
													src={CloseIcon}
													alt="Close icon"
												/> */}
											</div>
										</div>
										<div className="w-auto border-[1px] border-[#3063E9] mt-3" />
										<div className="flex flex-col gap-6 mt-6">
											<CardItem
												mainHeader="Sender"
												subText={
													transactionsArray &&
													transactionsArray[selectedIndex]?.sender
												}
											/>
											<CardItem
												mainHeader="Recipient"
												subText={
													transactionsArray &&
													transactionsArray[selectedIndex]?.recipient
												}
											/>
											<CardItem
												mainHeader="Transaction ID"
												subText={
													transactionsArray &&
													transactionsArray[selectedIndex]?.t_id
												}
											/>
											{/* <CardItem
												mainHeader="Reference ID"
												subText={
													transactions && transactions[selectedIndex]?.r_id
												}
											/> */}
											{/* <CardItem
												mainHeader="Date"
												subText={
													transactions &&
													convertToDate(transactions[selectedIndex]?.on)
												}
											/> */}
											<div className="w-auto p-4 h-auto bg-[#E7EDFF] rounded-[5px]">
												<div className="flex flex-col gap-2">
													<CardItem
														mainHeader="Transaction fee"
														subText={
															transactionsArray &&
															transactionsArray[selectedIndex]?.fee_string
														}
													/>
													<CardItem
														mainHeader="Transaction amount"
														subText={
															transactionsArray &&
															transactionsArray[selectedIndex]?.amount_string
														}
													/>
												</div>
											</div>
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
										{/* </CustomCard> */}
									</Dialog.Panel>
								</Transition.Child>
							</div>
						</div>
					</Dialog>
				</Transition>
			</div>
		</div>
	);
};

export default TransactionsContent;
