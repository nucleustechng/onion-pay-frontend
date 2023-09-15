import {
	faChevronDown,
	faChevronLeft,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import CloseIcon from "../../../../Assets/icon/CloseIcon.svg";
import { useTransferMutation } from "../../../../modules/Transfers/transfersApi";
import Input from "../../../Input";
import Loader from "../../../Loader";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useLoadBanksQuery } from "../../../../modules/BankAccountApi/bankaccountApi";

interface Props {
	isVisible: boolean;
	onClose: () => {};
	handleModal: (secondStep: number) => void;
}

const ExternalTransferModal = ({ isVisible, onClose, handleModal }: Props) => {
	interface ITransferInfo {
		isWallet: boolean;
		acc_num: string;
		acc_bank: string;
		amount: number;
	}

	const [transferInfo, setTransferInfo] = useState<ITransferInfo>({
		isWallet: false,
		acc_bank: "",
		acc_num: "",
		amount: 0,
	});
	const [banksArray, setBanksArray] = useState<any>();

	const { data: banksData, isSuccess: isBanksLoaded } = useLoadBanksQuery();

	const [transfer, { isSuccess, isLoading, data: transferData }] =
		useTransferMutation();

	const { isWallet, acc_bank, acc_num, amount } = transferInfo;

	const abortMutation = () => {
		transfer({ isWallet, acc_bank, acc_num, amount }).abort();
	};

	useEffect(() => {
		if (isBanksLoaded) {
			setBanksArray(banksData["banks"]);
		}
	}, [isBanksLoaded]);

	const handleTransfer = async () => {
		const { acc_bank, acc_num, amount } = transferInfo;

		try {
			if (acc_bank && acc_num && amount) {
				await transfer({
					acc_bank: transferInfo?.acc_bank,
					acc_num: transferInfo?.acc_num,
					amount: transferInfo?.amount,
					isWallet: false,
				});
			} else {
				toast.error("All fields are required!");
			}
		} catch (err) {
			console.log(err);
		}
	};

	useEffect(() => {
		if (isSuccess && transferData?.success) {
			toast.success("Your transfer was successful!");
			setTimeout(() => {
				onClose();
			}, 1200);
		} else {
			toast.error(transferData?.reason);
		}
	}, [isSuccess, transferData]);

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
				className="fixed inset-0 bg-[#262626] bg-opacity-50 backdrop-blur-[0.05rem] flex justify-center items-center"
				id="wrapper"
				onClick={handleClose}
			>
				<div className="w-[22rem] md:w-[33.26rem] h-[28.51rem] rounded-[0.63rem] md:mb-56 lg:mb-0 bg-white">
					<div className="mx-6 mt-6">
						<div className="flex justify-between items-center">
							<div
								onClick={() => handleModal(1)}
								className="flex items-center gap-2"
							>
								<FontAwesomeIcon
									icon={faChevronLeft}
									className="cursor-pointer w-5 h-5"
								/>
								<h1 className="text-lg text-[#262626] font-WorkSans font-semibold leading-5">
									Wallet Transfer
								</h1>
							</div>
							<div>
								<Image
									src={CloseIcon}
									className="cursor-pointer"
									onClick={() => {
										onClose();
									}}
									alt="Close Icon"
								/>
							</div>
						</div>
						{/* Input one */}
						{/* <div className='flex flex-col gap-2 mt-7'>
                    <h1 className='text-[#262626] text-sm font-WorkSans font-normal leading-4'>Choose balance to transfer from</h1>
                    <div className='flex justify-end px-5 items-center border-[0.07rem]  border-solid border-[#CACACA] rounded-[0.315rem] w-[30rem] h-[3.15rem]'>
                      <FontAwesomeIcon icon={faChevronDown}/>
                    </div>
                  </div> */}
						{/* Input four */}
						<div className="flex flex-col gap-2 mt-4">
							<Input
								type="number"
								name="acc_num"
								value={transferInfo?.acc_num}
								onChange={(e) =>
									setTransferInfo({ ...transferInfo, acc_num: e.target.value })
								}
								height="h-[3.15rem]"
								label="Account Number"
							/>
						</div>
						<div className="relative mt-4">
							<select
								className="w-[19rem] md:w-[30rem] h-[3.313rem]  focus:caret-primary outline-none 
                            rounded-[0.313rem] border-[0.0625rem] border-[#CACACA] pl-4 
                            text-sm text-[#898989] font-WorkSans font-normal leading-4"
								onChange={(e) =>
									setTransferInfo({ ...transferInfo, acc_bank: e.target.value })
								}
							>
								{/* <option value="">{bankDetails?.bank}</option> */}
								{banksArray?.map((bank: any, index: any) => (
									<option
										key={index}
										value={bank?.bankCode}
									>
										{bank?.bankName}
									</option>
								))}
							</select>
							<FontAwesomeIcon
								icon={faChevronDown}
								className="w-5 h-5 absolute top-[1rem] right-[1.1rem]"
							/>
						</div>
						{/* Input two */}
						<div className="flex flex-col gap-2 mt-5">
							<h1 className="text-[#262626] text-sm font-WorkSans font-normal leading-4">
								How much do you want to send?
							</h1>
							<div className=" ">
								<div>
									<Input
										type="number"
										height="h-[3.15rem]"
										name="amount"
										value={transferInfo?.amount.toString()}
										onChange={(e) =>
											setTransferInfo({
												...transferInfo,
												amount: parseFloat(e.target.value),
											})
										}
									/>
									{/* <input type='number' placeholder='0.00' className='flex px-5 items-center border-[0.07rem] outline-none  border-solid border-[#CACACA] rounded-[0.315rem] w-[22.5rem] h-[3.15rem]'/> */}
								</div>
							</div>
							{/* Conditional render text based on if the user has typed in the input field */}
							<div>
								<h1 className="text-sm text-[#C70039] font-WorkSans font-medium leading-4">
									Please enter the amount you want to send
								</h1>
							</div>
							{/* Input three */}
							{/* <div className='flex flex-col gap-2 mt-4'>
                    <h1 className='text-[#262626] text-sm font-WorkSans font-normal leading-4'>Choose balance to transfer from</h1>
                    <div className='flex justify-between px-5 items-center border-[0.07rem]  border-solid border-[#CACACA] rounded-[0.315rem] w-[30rem] h-[3.15rem]'>
                      <h1 className='text-base text-[#262626] font-WorkSans font-normal leading-5'>United Bank of Africa</h1>
                      <FontAwesomeIcon icon={faChevronDown}/>
                    </div>
                  </div> */}

							{/* Input five */}
							{/* <div>
                  <label className='text-[#262626] text-sm font-WorkSans font-normal leading-4'>Description</label>
                  <input name="description" type='text'  className='flex px-5 items-center border-[0.07rem]  border-solid border-[#CACACA] rounded-[0.315rem] outline-none w-[30rem] h-[3.15rem]'/>
                  </div> */}
							{/* Action buttons */}
							<div className="flex items-center justify-end gap-4 mt-5">
								<button
									onClick={abortMutation}
									className="flex items-center justify-center w-[5.4rem] h-11 bg-[#F5F5F5] rounded-[0.313rem] text-base text-[#262626] font-WorkSans font-normal leading-5"
								>
									Cancel
								</button>
								<div
									onClick={handleTransfer}
									className="flex justify-center items-center cursor-pointer w-[10.21rem] h-11 bg-[#3063E9] rounded-[0.313rem] text-base text-white font-WorkSans font-normal leading-5"
								>
									<div>
										{isLoading ? (
											<Loader isWhite={true} />
										) : (
											<h1> Confirm transfer</h1>
										)}
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ExternalTransferModal;
