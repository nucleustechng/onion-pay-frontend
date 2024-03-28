import Image from "next/image";
import React, { useState } from "react";
import Logo from "../../Assets/logo/OnionPayLogo.svg";
import Hamburger from "../../Assets/icons/Hamburger.svg";
import PaymentItem from "./NavbarItems/PaymentItem";
import CommerceItem from "./NavbarItems/CommerceItem";
import ContactItem from "./NavbarItems/ContactItem";
import DevelopersItem from "./NavbarItems/DeveloperItem";
import ButtonRegular from "../Buttons/ButtonRegular";
import CloseIcon from "../../Assets/icons/CloseIcon.svg";
import ButtonIcon from "../Buttons/ButtonIcon";
import Link from "next/link";
import NavCard from "./NavCard";
import CollectPay from "../../Assets/icons/payment/CollectPay.svg";
import SendMonney from "../../Assets/icons/payment/SendMoney.svg";
import PaymentLink from "../../Assets/icons/commerce/PaymentLink.svg";
import Invoices from "../../Assets/icons/commerce/Invoices.svg";
import Inquiry from "../../Assets/icons/contact/Inquiry.svg";
import Account from "../../Assets/icons/contact/Account.svg";
import Transactions from "../../Assets/icons/contact/Transactions.svg";

const Navbar = () => {
	const [toggleNav, setToggleNav] = useState<boolean>(false);
	const [showPayment, setShowPayment] = useState<boolean>(false);
	const [showInvoice, setShowInvoice] = useState<boolean>(false);
	const [showContact, setShowContact] = useState<boolean>(false);

	const linkItems = [
		{
			title: "Payment",
			link: "/collect-payment",
			onHover: (index: any) => {
				if (index === 0) {
					setShowPayment(!showPayment);
					setShowInvoice(false);
					setShowContact(false);
				}
			},
		},
		{
			title: "Commerce",
			link: "/detail-invoices",
			onHover: (index: any) => {
				if (index === 1) {
					setShowInvoice(!showInvoice);
					setShowPayment(false);
					setShowContact(false);
				}
			},
		},
		{
			title: "Developer",
			link: "https://documenter.getpostman.com/view/3501578/2s9YC7TBk1",
		},
	];

	const Payment = () => {
		return (
			<div className="flex flex-col gap-2 w-[300px] h-auto bg-white p-3 rounded-[10px]">
				<NavCard
					header="Collect payment"
					mainText="Collect payment anywhere"
					icon={CollectPay}
					alt="Collect payment icon"
					backgroundColor="bg-[#FFF3C8]"
					link="/collect-payment"
				/>
				<NavCard
					header="Send money"
					mainText="Send money to anyone or business"
					icon={SendMonney}
					alt="Send money icon"
					backgroundColor="bg-[#E7EDFF]"
					link="/sendmoney"
				/>
			</div>
		);
	};

	const Commerce = () => {
		return (
			<div className="flex flex-col gap-2 w-[300px] h-auto bg-white p-3 rounded-[10px]">
				<NavCard
					header="Payment links"
					mainText="Accept payments without writing code"
					icon={PaymentLink}
					alt="Payment Link Icon"
					backgroundColor="bg-[#FFF3C8]"
					link="/acceptpaymentlinks"
				/>
				<NavCard
					header="Invoices"
					mainText="Create professional invoicess"
					icon={Invoices}
					alt="Invoice Icon"
					backgroundColor="bg-[#E7EDFF]"
					link="/detail-invoices"
				/>
			</div>
		);
	};

	const GeneralInquiries = () => {
		return (
			<div className="flex flex-col gap-2 w-[300px] h-auto bg-white p-3 rounded-[10px]">
				<NavCard
					header="General inquiries"
					mainText="Contact us about any issue you may have"
					icon={Inquiry}
					alt="Inquiries Icon"
					backgroundColor="bg-[#FFF3C8]"
					link="/contact"
				/>
				<NavCard
					header="Account"
					mainText="Keep your account on track and safes"
					icon={Account}
					alt="Invoice Icon"
					backgroundColor="bg-[#E7EDFF]"
					link="/contact"
				/>
				<NavCard
					header="Transactions"
					mainText="Having any issues with transactions?"
					icon={Transactions}
					alt="Invoice Icon"
					backgroundColor="bg-[#F5F0F3]"
					link="/contact"
				/>
			</div>
		);
	};

	return (
		<div>
			<div>
				<div className="">
					<div
						className={`
                  px-5 overflow-y-scroll w-screen  bg-white fixed inset-0 h-full z-50 transition-all duration-500
                  ${
										toggleNav
											? "right-20"
											: "left-[30.65rem] min-[492px]:left-[45rem] sm:left-[50rem] md:left-[80rem] lg:left-[85rem] xl:left-[95rem] min-[280px]:left-[25rem] min-[412px]:left-[30rem]"
									}
                `}
					>
						<div
							className="flex justify-end mt-[1.875rem] cursor-pointer"
							onClick={() => setToggleNav(!toggleNav)}
						>
							<Image
								src={CloseIcon}
								alt="Close Icon"
							/>
						</div>

						{/* CTA buttons */}
						<div className="flex flex-col gap-6 mt-[1.875rem]">
							<Link
								href="/auth/signin"
								className="flex justify-center"
							>
								<ButtonRegular
									width="w-40"
									height="h-11"
									textSize="text-base"
									backgroundColor="bg-white"
									borderColor="border-primary"
									borderWidth="border-[0.0625rem]"
									color="text-primaryText"
									mainText="Sign in"
								/>
							</Link>
							<Link
								href="/auth/signup"
								className="flex justify-center"
							>
								<ButtonRegular
									width="w-40"
									height="h-11"
									textSize="text-base"
									backgroundColor="bg-primary"
									color="text-white"
									mainText="Get started"
								/>
							</Link>
						</div>

						<hr className="w-auto h-0 mt-6 border-[0.0625rem] border-[#CACACA]" />

						<div className="flex flex-col mt-5 pb-11">
							<PaymentItem />
							<hr className="w-auto h-0 mt-6 mb-5 border-[0.0625rem] border-[#CACACA]" />
							<CommerceItem />
							<hr className="w-auto h-0 mt-6 mb-5 border-[0.0625rem] border-[#CACACA]" />
							<ContactItem />
							<hr className="w-auto h-0 mt-6 mb-5 border-[0.0625rem] border-[#CACACA]" />
							<DevelopersItem />
						</div>
					</div>
				</div>
				{/* Closed state */}
				<div className="fixed left-0 right-0 top-0 z-30">
					<div className="flex justify-between px-5 items-center h-[4.375rem] pt-[1.875rem] pb-[0.625rem] bg-[#F5F5F5] lg:px-28 xl:px-[9.375rem] xl:h-[5.75rem]">
						<Link
							href="/"
							className="cursor-pointer"
						>
							<Image
								src={Logo}
								alt="Logo"
								className="w-[12rem] h-full"
							/>
						</Link>
						<div className="flex flex-col relative">
							<ul className="hidden lg:flex items-center justify-between w-[20rem]">
								{linkItems.map((item, index) => (
									<Link
										href={item.link}
										onMouseOver={() => {
											if (item.onHover) {
												item.onHover(index);
											}
										}}
										key={item.title}
									>
										<li
											key={item.title}
											className="text-sm text-primaryText font-WorkSans font-medium leading-4 cursor-pointer"
										>
											{item.title}
										</li>
									</Link>
								))}
								<Link
									href="/contact"
									onMouseOver={() => {
										setShowContact(!showContact);
										setShowInvoice(false);
										setShowPayment(false);
									}}
								>
									<li className="text-sm text-primaryText font-WorkSans font-medium leading-4 cursor-pointer">
										Contact
									</li>
								</Link>
							</ul>
							<div className="absolute top-[2rem]">
								{showPayment && <Payment />}
								{showInvoice && <Commerce />}
								{showContact && <GeneralInquiries />}
							</div>
						</div>
						<div className="hidden lg:flex justify-between items-center w-[16rem]">
							<Link href="/auth/signin">
								<ButtonRegular
									width="w-[5.875rem]"
									height="h-11"
									textSize="text-base"
									backgroundColor="bg-white cursor-pointer"
									borderColor="border-primary"
									borderWidth="border-[0.0625rem]"
									color="text-primaryText"
									mainText="Sign in"
								/>
							</Link>
							<Link href="/auth/signup">
								<ButtonIcon
									width="w-[9.5rem]"
									height="h-11"
									backgroundColor="bg-primary cursor-pointer"
									color="text-white"
									mainText="Get started"
								/>
							</Link>
						</div>
						<div
							className="flex items-center cursor-pointer lg:hidden"
							onClick={() => setToggleNav(!toggleNav)}
						>
							<Image
								src={Hamburger}
								alt="Hamburger Icon"
							/>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Navbar;
