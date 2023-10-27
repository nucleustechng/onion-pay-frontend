import React from "react";
import ToolSectionCard from "./ToolSectionCard";
import PaymentLink from "../../Assets/img/PaymentLinkTool.svg";
import PaymentLinkLarge from "../../Assets/img/PaymentLinkLarge.svg";
import Receipts from "../../Assets/img/Receipts.svg";
import ReceiptsLarge from "../../Assets/img/ReceiptsLarge.svg";
import AcceptPaymentsLarge from "../../Assets/img/L-AcceptPayments.svg";
import CurvedArrowDown from "../../Assets/img/CurvedArrowDown.svg";
import TransfersInnerImage from "../../Assets/img/TransfersInnerImage.svg";
import AcceptPayments from "../../Assets/img/AcceptPayments.svg";
import L_OrangeArrowTransfers from "../../Assets/img/L-OrangeArrowTransfers.svg";
import L_Transfers from "../../Assets/img/L-Transfers.svg";
import Image from "next/image";
import ButtonRegular from "../Buttons/ButtonRegular";
import LargeToolSectCard from "./LargeToolSectCard";
import BusinessSite from "../../Assets/img/BusinessSiteScreenShot.svg";
import OrangeCurveArrow from "../../Assets/img/L-OrangeCurvedArrow.svg";
import BlueCurvedArrow from "../../Assets/img/L-BlueArrow.svg";
import Link from "next/link";

const ToolSection = () => {
	return (
		<div>
			<div className="flex flex-col bg-white ">
				<div className="flex flex-col gap-[0.375rem] mt-[1.875rem] md:gap-6">
					<h2
						className="w-[10.94rem] text-xl text-primaryText font-WorkSans font-normal leading-6
                sm:w-[20rem] sm:text-4xl
                "
					>
						Run a progressive business with our
					</h2>
					<h1
						className="w-[11.19rem] text-5xl md:text-[5rem] text-primary font-SpaceGrotesk font-bold leading-[2.75rem]
                sm:w-[25rem] md:w-[40rem]
                "
					>
						Modern tools.
					</h1>
				</div>
				<div className="hidden lg:absolute xl:top-[90rem] xl:right-[51.5rem] lg:top-[91.5rem] lg:right-[51.5rem]">
					<Image
						src={OrangeCurveArrow}
						loading="lazy"
						alt="Curved arrrow"
					/>
				</div>
				<div
					className="hidden xl:absolute xl:top-[100rem] xl:left-[51rem]
                  lg:absolute lg:top-[99rem] lg:left-[39rem]
                  "
				>
					<Image
						src={BlueCurvedArrow}
						loading="lazy"
						alt="Curved arrrow"
					/>
				</div>
				<div className=" flex justify-between md:w-[68rem] lg:w-[62rem]  xl:w-[79.5rem]">
					<div className="relative md:w-[40rem] flex flex-col gap-5 mt-6 md:inline-flex">
						<ToolSectionCard
							route="/acceptpaymentlinks"
							header="Payment link"
							backgroundColor="bg-[#303778]"
							circleColor="bg-[#FF9635]"
							img={PaymentLink}
							alt="Payment Link Image"
							mainText="Accept one-time or recurring payments from anyone, anywhere and anytime, with your unique payment link."
						/>
						<ToolSectionCard
							route="/auth/signup"
							header="Receipts"
							backgroundColor="bg-[#FF9635]"
							circleColor="bg-[#303778]"
							img={Receipts}
							alt="Receipt Image"
							mainText="Have receipts automatically created for you to share on every transaction made."
						/>

						{/* Medium breakpoint  shows this cards instead */}

						<div className="relative ">
							<LargeToolSectCard
								route="/acceptpaymentlinks"
								header="Payment link"
								backgroundColor="bg-[#303778]"
								circleColor="bg-[#FF9635]"
								img={PaymentLinkLarge}
								alt="Payment Link Image"
								mainText="Accept one-time or recurring payments from anyone, anywhere and anytime, with your unique payment link."
							/>
						</div>
						<div className="absolute xl:left-[25rem] top-[10rem] z-20 md:left-[19rem]">
							<LargeToolSectCard
								routeText="Get started"
								route="/auth/signup"
								header="Receipts"
								backgroundColor="bg-[#FF9635]"
								circleColor="bg-[#303778]"
								img={ReceiptsLarge}
								alt="Receipt Image"
								left="left-[8rem]"
								top="top-[13.65rem] md:top-[14.7rem]"
								mainText="Have receipts automatically created for you to share on every transaction made."
							/>
						</div>

						<div
							className="absolute left-[13rem] bottom-o top-[25.5rem] 
                  sm:left-[20rem] sm:top-[30rem] md:hidden 
                  "
						>
							<Image
								src={CurvedArrowDown}
								loading="lazy"
								alt="Curved ArrowDown"
							/>
						</div>
					</div>
					<div
						className="hidden md:relative md:flex md:justify-end md:right-0 xl:justify-end sm:mt-6 xl:relative xl:right-0 xl:bottom-44  z-0
                lg:relative lg:right-0 lg:bottom-52 lg:flex lg:justify-end lg:w-[60rem] 
                "
					>
						<Image
							src={BusinessSite}
							loading="lazy"
							alt="Business site screenshot"
						/>
					</div>
				</div>
				<div className="flex flex-col gap-[0.375rem] mt-[2.7rem] md:hidden">
					<h2
						className="w-[9.945rem] text-xl text-primaryText font-WorkSans font-normal leading-[1.625rem]
              sm:W-[20rem] sm:text-2xl
              "
					>
						A fully unified set of payments
					</h2>
					<h1 className="w-[12.825rem] text-5xl text-[#FF9635] font-SpaceGrotesk font-bold leading-[2.75rem]">
						Payment tools.
					</h1>
				</div>
				<div className="flex flex-col gap-5 mt-5">
					<ToolSectionCard
						route="/collect-payment"
						header="Accept payments"
						backgroundColor="bg-[#3063E9]"
						circleColor="bg-[#FF9635]"
						img={AcceptPayments}
						alt="Accept  Payments Image"
						height="h-14"
						mainText="Receive money from anyone, at any time, anywhere in the world."
					/>
					<ToolSectionCard
						route="/auth/signup"
						header="Transfers"
						backgroundColor="bg-[#FF9635]"
						circleColor="bg-[#3063E9]"
						img={TransfersInnerImage}
						alt="Transfers  Image"
						height="h-[3.25rem]"
						mainText="Make single or bulk transfers to bank accounts from your Onion Pay dashboard."
					/>

					<div className="hidden  md:flex md:relative md:bottom-20 lg:flex lg:relative lg:bottom-20">
						<div>
							<p className="text-[3.38rem] text-primaryText font-WorkSans font-normal leading-[3.94rem]">
								Quick and easy-to-use
							</p>
							<h1 className="text-[5rem] text-[#FF9635] font-SpaceGrotesk font-bold leading-[6.4rem]">
								Payments tools.
							</h1>
						</div>
						<div
							className="hidden xl:flex xl:absolute xl:left-[35rem] xl:top-[12rem]
                      lg:flex lg:absolute lg:left-[30rem] lg:top-[12rem]
                       
                    "
						>
							<LargeToolSectCard
								route="/collect-payment"
								header="Accept payments"
								backgroundColor="bg-[#3063E9]"
								circleColor="bg-[#FF9635]"
								img={AcceptPaymentsLarge}
								alt="Payment Link Image"
								top="top-[13rem]"
								mainText="Receive money from anyone, at any time, anywhere in the world."
							/>
						</div>
						<div
							className="xl:absolute xl:top-[35.5rem] xl:left-[36rem]
                    lg:absolute lg:top-[35.5rem] lg:left-[28rem]
                    "
						>
							<Image
								src={L_OrangeArrowTransfers}
								loading="lazy"
								alt=""
							/>
						</div>
						<div className="xl:absolute xl:left-[50rem] xl:top-[35.8rem] lg:absolute lg:left-[41rem] lg:top-[35.8rem]">
							<LargeToolSectCard
								route="/auth/signup"
								header="Transfers"
								backgroundColor="bg-[#FF9635]"
								circleColor="bg-[#FF9635]"
								img={L_Transfers}
								alt="Payment Link Image"
								top="top-[14.5rem]"
								left="left-0"
								mainText="Make single or bulk transfers to bank accounts from your Onion Pay dashboard."
							/>
						</div>
					</div>
					<div
						className="w-[21.875rem] mb-[3.75rem]
                sm:w-[37rem] lg:mt-[47rem] lg:w-[60rem]
                "
					>
						<p
							className="mb-[1.875rem] text-[2.5rem] text-primaryText font-WorkSans font-normal  leading-[2.94rem]
                  xl:text-[5rem] xl:leading-[5.88rem]
                  "
						>
							Same way we remind you to let your customers know that you’re
							there is the same way
							<span className="text-primary italic">
								{" "}
								we are always going to be here for you!
							</span>
						</p>

						<Link href="/auth/signin">
							<ButtonRegular
								backgroundColor="bg-primary"
								color="text-white"
								textSize="text-base sm:text-2xl"
								height="h-11 sm:h-14"
								mainText={`Let’s get on the road`}
								width="w-[13.2rem] sm:w-[16rem]"
							/>
						</Link>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ToolSection;
