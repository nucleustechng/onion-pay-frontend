import React, { useEffect, useRef, useState } from "react";
// import { Input } from "../../@/components/ui/input";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "../../@/components/ui/table";
// import { Button } from "../../@/components/ui/button";

import Loader from "../Loader";
// import PaymentLinkContainer from "../payments/PaymentLinkContainer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisV } from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-toastify";
import EditLinkModal from "../payments/modals/EditLinkModal";
import DeleteLinkModal from "../payments/modals/DeleteLinkModal";
import EditIcon from "../../Assets/icons/Edit.svg";
import TrashIcon from "../../Assets/icon/TrashIcon.svg";
import CopyIcon from "../../Assets/icon/CopyIcon.svg";
import Image from "next/image";
// import { useLoadMoreTransactionsQuery } from "../../modules/TransactionsApi/transactionsApi";

type Props = {
	paymentLinks: any[];
	isLoading: boolean;
};

export function PaymentLinkTable({ paymentLinks, isLoading }: Props) {
	const [selectedLinkId, setSelectedLinkId] = useState<string>("");
	const [selectedTitle, setSelectedTitle] = useState<string>("");
	const [selectedAmount, setSelectedAmount] = useState<number | any>();
	const [selectedIndex, setSelectedIndex] = useState<number | any>();

	const [isEdit, setEdit] = useState<boolean>(false);

	const [showModal, setShowModal] = useState(false);

	const handleEllipsisClick = (index: number) => {
		setSelectedIndex(index);
		setShowPopover(true);
		setSelectedLinkId(paymentLinks[index]?.p_id);
		setSelectedTitle(paymentLinks[index]?.title);
		setSelectedAmount(paymentLinks[index]?.amount);
	};

	const copyToClipboard = (copyItem: any) => {
		navigator.clipboard.writeText(copyItem);
		toast.success("Copied!!", { autoClose: 100 });
	};

	const [showPopover, setShowPopover] = useState<boolean>(false);
	const popoverRef = useRef<HTMLDivElement>(null);

	const handleClickOutsidePopover = (event: MouseEvent) => {
		if (
			popoverRef.current &&
			!popoverRef.current.contains(event.target as Node)
		) {
			setShowPopover(false);
			setSelectedLinkId("");
		}
	};

	useEffect(() => {
		document.addEventListener("mousedown", handleClickOutsidePopover);
		return () => {
			document.removeEventListener("mousedown", handleClickOutsidePopover);
		};
	}, []);
	return (
		<div className=" w-full  h-full overflow-auto">
			<div className="flex items-center py-4">
				{/* <Input
					placeholder="Filter by businessId..."
					className="max-w-sm"
					value={businessId}
					onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
						setBusinessId(e.target.value)
					}
				/> */}
			</div>
			<div className="rounded-md border">
				<Table
					className="relative"
					// className={
					// 	paymentLinks?.length === 0 || isLoading ? "h-auto" : "h-[600px]"
					// }
				>
					<TableHeader
						className={`  h-[48px] sticky top-0 border-foreground border-b`}
					>
						<TableRow>
							<TableHead className="w-auto text-[#898989] font-medium ">
								Page Name
							</TableHead>
							<TableHead className="w-auto text-[#898989] font-medium ">
								Amount
							</TableHead>
							<TableHead className="w-auto text-[#898989] font-medium ">
								Page ID
							</TableHead>
							<TableHead className="w-auto text-[#898989] font-medium ">
								Description
							</TableHead>

							<TableHead className="w-auto  text-[#898989] font-medium ">
								Payment Link
							</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody className=" overflow-y-auto">
						{isLoading ? (
							<TableRow className="h-32">
								<TableCell
									colSpan={5}
									className="p-0"
								>
									<div className="flex justify-center items-center  ">
										<Loader
											width="w-8"
											height="h-8"
										/>
									</div>
								</TableCell>
							</TableRow>
						) : paymentLinks?.length === 0 ? (
							<TableRow className="h-32">
								<TableCell
									colSpan={5}
									className="p-0"
								>
									<div className="flex justify-center items-center  ">
										<h1 className="text-xl">You have no payment links!</h1>
									</div>
								</TableCell>
							</TableRow>
						) : (
							paymentLinks?.map((paymentlink: any, index: number) => (
								<TableRow
									key={paymentlink?.p_id}
									className="cursor-pointer hover:bg-[#E7EDFF]"
								>
									<TableCell className="font-WorkSans font-normal h-[80px]">
										{paymentlink?.title ? paymentlink?.title : "N/A"}
									</TableCell>
									<TableCell className="font-WorkSans font-normal h-[40px]">
										₦{paymentlink?.amount ? paymentlink?.amount : "N/A"}
									</TableCell>
									<TableCell className="font-WorkSans font-normal h-[80px] truncate">
										{paymentlink?.p_id}
									</TableCell>

									<TableCell className={`font-WorkSans font-normal h-[80px] `}>
										{paymentlink?.description
											? paymentlink?.description
											: "N/A"}
									</TableCell>
									<TableCell className="font-WorkSans font-normal h-[80px]">
										<div className="flex items-center justify-between w-[22.3rem]  ">
											<div className="w-[20rem]  flex gap-14 items-center ">
												<p className="w-[15rem]">{paymentlink?.url}</p>
												<div
													className="cursor-pointer"
													onClick={() => copyToClipboard(paymentlink?.url)}
												>
													<Image
														src={CopyIcon}
														alt="Copy Icon"
													/>
												</div>
											</div>
											<div
												className="w-6 flex justify-center items-center cursor-pointer"
												onClick={() => handleEllipsisClick(index)}
											>
												<FontAwesomeIcon
													icon={faEllipsisV}
													className="w-5 h-5"
												/>
											</div>
											{showPopover &&
												selectedLinkId === paymentLinks[index]?.p_id && (
													<div
														className="absolute drop-shadow-lg z-50  w-40 h-[5rem] left-[59rem] bg-white rounded-md"
														ref={popoverRef}
														style={{
															top: `calc(${
																popoverRef.current?.parentElement?.getBoundingClientRect()
																	.top
															}px + 2rem)`,
															left: `calc(${
																popoverRef.current?.parentElement?.getBoundingClientRect()
																	.left
															}px + 52rem)`,
														}}
													>
														<div className="flex flex-col gap-4 px-[0.625rem] py-4">
															<div
																className="flex justify-between items-center cursor-pointer"
																onClick={() => {
																	setEdit(true);
																	setShowModal(true);
																	setShowPopover(false);
																}}
															>
																<h1 className="text-sm text-[#1B1A1A] font-WorkSans font-normal leading-4">
																	Edit
																</h1>
																<Image
																	src={EditIcon}
																	alt="Edit Icon"
																	width={16}
																	height={16}
																/>
															</div>
															<div
																className="flex justify-between items-center cursor-pointer"
																onClick={() => {
																	setEdit(false);
																	setShowModal(true);
																	setShowPopover(false);
																}}
															>
																<h1 className="text-sm text-[#DE0040] font-WorkSans font-normal leading-4">
																	Delete
																</h1>
																<Image
																	src={TrashIcon}
																	alt="Edit Icon"
																	width={16}
																	height={16}
																/>
															</div>
														</div>
													</div>
												)}
										</div>
									</TableCell>
								</TableRow>
							))
						)}
					</TableBody>
				</Table>
			</div>

			{isEdit && (
				<EditLinkModal
					isVisible={showModal}
					onClose={async () => setShowModal(false)}
					prevPageID={selectedLinkId}
					prevPageName={paymentLinks[selectedIndex]?.title}
					prevAmount={paymentLinks[selectedIndex]?.amount}
					prevDescription={
						paymentLinks ? paymentLinks[selectedIndex]?.description : ""
					}
					prevRedirect={paymentLinks[selectedIndex]?.redirect_url}
				/>
			)}
			{!isEdit && (
				<DeleteLinkModal
					amount={selectedAmount}
					pageName={selectedTitle}
					isVisible={showModal}
					onClose={async () => setShowModal(false)}
					pageID={selectedLinkId}
				/>
			)}
			<div className="flex items-center justify-end space-x-2 py-4">
				<div className="flex-1 text-sm text-muted-foreground">
					{/* Show selected rows count */}
					{
						paymentLinks?.filter((paymentlink) => paymentlink.isSelected).length
					}{" "}
					of {paymentLinks?.length} row(s) selected.
				</div>
				<div className="space-x-2">
					{/* <Button
						variant="outline"
						size="sm"
						// onClick={() => handleLoadMore(transactions[firstIndex]?.r_id)}
						// disabled={!table.getCanPreviousPage()}
					>
						Previous
					</Button> */}
					{/* <Button
						variant="outline"
						className="w-[100px]"
						// onClick={() => handleLoadMore(transactions[lastIndex]?.r_id)}
						// disabled={isLoadingMore}
					>
						Next
					</Button> */}
				</div>
			</div>
		</div>
	);
}
