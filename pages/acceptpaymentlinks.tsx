import Image from "next/image";
import Link from "next/link";
import React from "react";
import ButtonIcon from "../components/Buttons/ButtonIcon";
import CollectPayments from "../Assets/img/collect-payments/CollectPayment.svg";

const AcceptPaymentLinks = () => {
	const listData = [
		{
			header: "Select a payment link type",
			subText: "You can create a payment link based on your need.",
		},
		{
			header: "Fill out the payment link form and send!",
			subText:
				"Fill out the details on the form provided and start accepting money.",
		},
	];

	type Props = {
		header: string;
		subText: string;
		itemNumber: number;
	};

	const ListComponent = ({ header, subText, itemNumber }: Props) => (
		<div className="flex items-start gap-7 mx-4 md:mx-[5rem]  xl:mx-[9.375rem] mt-8 md:mt-16 lg:mt-[5.625rem]">
			<div className="flex justify-center items-center w-8 h-8 md:w-11 md:h-11 bg-[#FF9635] rounded-full">
				<h1 className="text-white text-lg font-WorkSans font-normal leading-5">
					{itemNumber}
				</h1>
			</div>
			<div className="w-[18rem] md:w-[36rem]  flex flex-col gap-3">
				<h1 className="text-[#1B1A1A] text-xl md:text-2xl font-WorkSans font-semibold leading-6 md:leading-7">
					{header}
				</h1>
				<p className="text-xl text-[#1B1A1A] font-WorkSans font-normal leading-7">
					{subText}
				</p>
			</div>
		</div>
	);
	return (
		<div>
			<div className="h-[30rem] md:h-[50rem] mt-32 mb-[35rem] lg:mb-[60rem]">
				<div className="lg:flex lg:justify-between ">
					<div className="flex flex-col gap-6  w-[10rem] mx-4 md:pt-32 md:ml-[5rem] lg:ml-[4rem] xl:ml-[9.375rem]">
						<h1
							className="text-[4rem] md:text-[5rem]
                    text-[#303778] font-SpaceGrotesk 
                    font-bold leading-[4.5rem] md:leading-[5rem]"
						>
							Accept payments{" "}
							<span className="text-[#FF9635]">
								without code<span className="italic">!</span>
							</span>
						</h1>
						<p className="w-[22rem] md:w-[26.125rem] h-[1.875rem] text-xl  md:text-2xl text-[#1B1A1A] font-WorkSans font-normal  leading-[1.875rem]">
							Accept one-time or recurring payments from anyone, anywhere and
							anytime, with your unique payment link.
						</p>
						<Link
							href="/auth/signup"
							className="mt-20 md:mt-28"
						>
							<ButtonIcon
								width="w-[10.2rem]"
								height="h-11"
								mainText="Get started"
								backgroundColor="bg-primary"
								color="text-white"
								textSize="text-base"
							/>
						</Link>
					</div>
					<div className="hidden lg:flex lg:items-center">
						<Image
							src={CollectPayments}
							loading="lazy"
							alt="Collect Payments Illustration"
						/>
					</div>
				</div>
				<div className="mx-4 md:mx-[5rem]  xl:mx-[9.375rem] mt-6 md:mt-16 lg:mt-[3.325rem]">
					<h1 className="text-[#1B1A1A] text-4xl lg:text-[5rem] font-WorkSans font-normal leading-9 lg:leading-[4rem] xl:leading-[5.875rem]">
						Create a payment link in just minutes
					</h1>
				</div>

				{listData.map((item, index) => (
					<div key={index}>
						<ListComponent
							itemNumber={index + 1}
							header={item.header}
							subText={item.subText}
						/>
					</div>
				))}
				<div className="mx-4 md:mx-[5rem]  xl:mx-[9.375rem] mt-6 md:mt-20 lg:mt-[9.325rem]">
					<Link href="/auth/signup">
						<ButtonIcon
							backgroundColor="bg-primary"
							color="text-white"
							width="w-[14.325rem]"
							height="h-11"
							mainText="Create a payment link"
						/>
					</Link>
				</div>
			</div>
		</div>
	);
};

export default AcceptPaymentLinks;
