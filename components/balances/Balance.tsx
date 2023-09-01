import Image from "next/image";
import React, { useState } from "react";
import Hamburger from "../../Assets/icon/HamburgerIcon.svg";
import { useAppDispatch, useAppSelector } from "../../redux/redux-hooks/hooks";
import { RootState } from "../../redux/store";
import { setShowSidebar } from "../../redux/sidebarSlice";
// import dynamic from "next/dynamic";
// import InfoCircle from "../../Assets/icon/InfoCircle.svg";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
// import UpgradeWalletModal from "./modals/UpgradeWalletModal";
import CompleteUpgrade from "./modals/CompleteUpgrade";
import { useLoadWalletQuery } from "../../modules/WalletApi";

const Balance = () => {
	// const [showModal, setShowModal] = useState<boolean>(false);
	// const [showUpgrade, setShowUpgrade] = useState<boolean>(false);
	const [showComplete, setShowComplete] = useState<boolean>(false);

	const dispatch = useAppDispatch();
	const sidebarShow = useAppSelector(
		(state: RootState) => state.sidebar.sidebarShow
	);

	const { data: walletData } = useLoadWalletQuery();

	const walletBalance = walletData["wallet"]?.balance_string
		? walletData["wallet"]?.balance_string
		: "---";
	const walletNumber = walletData["wallet"]?.walletNumber
		? walletData["wallet"]?.walletNumber
		: "---";
	const walletName = walletData["wallet"]?.walletName
		? walletData["wallet"]?.walletName
		: "---";

	// const FundBalanceModal = dynamic(() => import("./modals/FundBalanceModal"));

	return (
		<div className="">
			<div className=" mx-6 mt-6">
				<div className="flex justify-between items-center mb-12">
					<h1 className="text-[2rem] text-[#262626]  font-WorkSans font-medium leading-[2.4rem]">
						Balance
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
				<div className="flex items-center justify-between pb-2">
					<div>
						<h1 className="text-[1.25rem] text-[#1B1A1A]">NGN balance</h1>
					</div>
					{/* <div className="flex items-center gap-4">
						<button className="w-[8.3rem] h-11 text-sm text-[#1B1A1A] font-WorkSans font-normal leading-5 bg-[#F5F5F5] rounded-[0.32rem]">
							Set low limit
						</button>
						<button
							className="w-[8.65rem] h-11 text-sm text-white font-WorkSans font-normal leading-5 bg-[#3063E9] rounded-[0.32rem]"
							onClick={() => {
								setShowModal(true);
							}}
						>
							Fund balance
						</button>
					</div> */}
				</div>
				<hr className="border-[#898989]" />
				<div>
					<div className="flex items-center px-4 justify-between h-[3.8rem]">
						<h1 className="text-sm text-[#262626] font-WorkSans font-normal leading-5">
							Name
						</h1>
						<h2 className="text-sm text-[#262626] font-WorkSans font-normal leading-5">
							{walletName}
						</h2>
					</div>
					<hr className="border-[#F5F5F5]" />

					<div className="flex items-center px-4 justify-between h-[3.8rem]">
						<h1 className="text-sm text-[#262626] font-WorkSans font-normal leading-5">
							Wallet balance
						</h1>
						<h2 className="text-sm text-[#262626] font-WorkSans font-normal leading-5">
							{walletBalance}
						</h2>
					</div>
					<hr className="border-[#F5F5F5]" />
					<div className="flex items-center px-4 justify-between h-[3.8rem]">
						<h1 className="text-sm text-[#262626] font-WorkSans font-normal leading-5">
							Wallet Number
						</h1>
						<h2 className="text-sm text-[#262626] font-WorkSans font-normal leading-5">
							{walletNumber}
						</h2>
					</div>
					<hr className="border-[#F5F5F5]" />
				</div>
				{/* <div
					onClick={() => setShowUpgrade(true)}
					className="flex items-center gap-2 cursor-pointer mt-5"
				>
					<div className="flex items-center gap-1">
						<Image
							src={InfoCircle}
							width={14}
							height={14}
							alt="Info circle icon"
						/>
						<h1 className="text-primary text-xs font-WorkSans font-normal leading-4">
							Upgrade Wallet
						</h1>
					</div>
					<FontAwesomeIcon
						icon={faArrowRight}
						className="w-5 h-5 text-primary"
					/>
				</div> */}
				{/* <div>
					<FundBalanceModal
						isVisible={showModal}
						onClose={async () => setShowModal(false)}
					/>
				</div> */}
				{/* <div>
					<UpgradeWalletModal
						isVisible={showUpgrade}
						onClose={async () => setShowUpgrade(false)}
						nextFunc={async () => {
							setShowComplete(true);
							setShowUpgrade(false);
						}}
					/>
				</div> */}
				<div>
					<CompleteUpgrade
						isVisible={showComplete}
						onClose={async () => setShowComplete(false)}
					/>
				</div>
			</div>
		</div>
	);
};

export default Balance;
