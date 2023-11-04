import { Dialog, Transition } from "@headlessui/react";
// import { PlusIcon } from "@radix-ui/react-icons";
import { ArrowDownIcon, ArrowUpIcon, XIcon } from "lucide-react";
import Image from "next/image";
import React, { Fragment,useState } from "react";
import { TransactionTable } from "../Tables/TransactionTable";
import { useAppDispatch, useAppSelector } from "../../redux/redux-hooks/hooks";
import { RootState } from "../../redux/store";
import Header from "../Header";
// import { Button } from "../../@/components/ui/button";
import Hamburger from "../../Assets/icon/HamburgerIcon.svg";
import { setShowSidebar } from "../../redux/sidebarSlice";
import { useQuery } from "@tanstack/react-query";
import { getTransactions } from "../../modules/TransactionsApi/transactionService";
import { formatDate } from "../../@/lib/utils";

const TransactionsContent = () => {
	const [selectedIndex, setSelectedIndex] = useState<any>();

	type ICardItem = {
		mainHeader: string;
		subText: string;
	};

	const dispatch: any = useAppDispatch();

	const [isOpen, setIsOpen] = useState(false);

	function closeModal() {
		setIsOpen(false);
	}

	function openModal() {
		setIsOpen(true);
	}

	const sidebarShow = useAppSelector(
		(state: RootState) => state.sidebar.sidebarShow
	);

	const { data: transactions, isLoading } = useQuery({
		queryKey: ["transactions"],
		queryFn: getTransactions,
	});

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
			{/* <div className="pl-2 md:pl-0">
				<Button
					// onClick={() => {
					// 	addAdminModal();
					// }}
					className="text-white "
				>
					Create Invoice
					<PlusIcon className="ml-2 h-4 w-4" />
				</Button>
			</div> */}
			{/* Table */}
			<div className="flex-1 pr-0 md:pr-6">
				{/* <DataTableDemo /> */}
				<TransactionTable
					isLoading={isLoading}
					transactions={transactions}
					showMore={(index: number) => {
						openModal();
						setSelectedIndex(index);
					}}
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
													transactions && transactions[selectedIndex]?.sender
												}
											/>
											<CardItem
												mainHeader="Recipient"
												subText={
													transactions && transactions[selectedIndex]?.recipient
												}
											/>
											<CardItem
												mainHeader="Transaction ID"
												subText={
													transactions && transactions[selectedIndex]?.t_id
												}
											/>
											{transactions && !transactions[selectedIndex]?.debit && (
												<CardItem
													mainHeader="Transaction reference"
													subText={
														transactions && transactions[selectedIndex]?.t_id
													}
												/>
											)}
											<CardItem
												mainHeader="Amount"
												subText={
													transactions &&
													transactions[selectedIndex]?.amount_string
												}
											/>
											<CardItem
												mainHeader="Date"
												subText={
													transactions &&
													formatDate(transactions[selectedIndex]?.on)
												}
											/>

											<div className="w-auto p-4 h-auto bg-[#E7EDFF] rounded-[5px]">
												<div className="flex flex-col gap-2">
													<CardItem
														mainHeader="Transaction fee"
														subText={
															transactions &&
															transactions[selectedIndex]?.fee_string
														}
													/>
													<CardItem
														mainHeader="Transaction amount"
														subText={
															transactions &&
															transactions[selectedIndex]?.amount_string
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