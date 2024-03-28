import React, { useState } from "react";
// import PaymentLinks from "../../components/payments/PaymentLinks";
import useAuth from "../../useAuth";
import { PaymentLinkTable } from "../../components/Tables/PaymentLinkTable";
import { getPaymentPages } from "../../modules/PaymentPageApi/paymenyPageService";
import { useQuery } from "@tanstack/react-query";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { Button } from "../../@/components/ui/button";
import Header from "../../components/Header";
import { useAppDispatch, useAppSelector } from "../../redux/redux-hooks/hooks";
import { RootState } from "../../redux/store";
import { setShowSidebar } from "../../redux/sidebarSlice";
import Image from "next/image";
import Hamburger from "../../Assets/icon/HamburgerIcon.svg";
import SingleChargeModal from "../../components/payments/modals/SingleChargeModal";

const Paymentlinks = () => {
	useAuth();
	const { data: paymentLinks, isLoading } = useQuery({
		queryKey: ["paymentLinks"],
		queryFn: getPaymentPages,
	});

	const dispatch = useAppDispatch();
	const sidebarShow = useAppSelector(
		(state: RootState) => state.sidebar.sidebarShow
	);
	const [showModal, setShowModal] = useState(false);

	return (
		<div className="">
			{/* Header */}
			<div className="flex items-center justify-between pr-2 md:pr-0 pl-2 md:pl-0">
				<Header mainText="Payment Links" />

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
			<Button
				onClick={() => {
					setShowModal(true);
				}}
				className="mr-2 md:mr-0 ml-2 md:ml-0"
			>
				<h1 className="text-base font-WorkSans font-normal text-white">
					New payment link
				</h1>
				<FontAwesomeIcon
					icon={faPlus}
					className="w-5 h-5 ml-4 text-base text-white"
				/>
			</Button>

			<div className="flex-1 pr-0 md:pr-6">
				<PaymentLinkTable
					isLoading={isLoading}
					paymentLinks={paymentLinks}
				/>
			</div>
			<div>
				<SingleChargeModal
					isVisible={showModal}
					onClose={async () => setShowModal(false)}
				/>
			</div>
		</div>
	);
};

export default Paymentlinks;
