import Link from "next/link";
import React from "react";
import ButtonIcon from "../../components/Buttons/ButtonIcon";
import CertificateForm from "../../components/corporate-account/forms/CertificateForm";

export default function CorporateAccount() {
	// const listData = [
	// 	{
	// 		header: "Select the type of transfer you want to make",
	// 		subText:
	// 			"There are three types of transfer; Transfer to Bank account, transfer to Mobile money and transfer to Onion Pay account.",
	// 	},
	// 	{
	// 		header: "Fill out the payment link form and send!",
	// 		subText:
	// 			"Fill out the details on the form provided and start accepting money.",
	// 	},
	// ];

	// type Props = {
	// 	header: string;
	// 	subText: string;
	// 	itemNumber: number;
	// };

	// const ListComponent = ({ header, subText, itemNumber }: Props) => (
	// 	<div className="flex items-start gap-7 mx-4 md:mx-[5rem]  xl:mx-[9.375rem] mt-8 md:mt-16 lg:mt-[5.625rem]">
	// 		<div className="flex justify-center items-center w-8 h-8 md:w-11 md:h-11 bg-[#FF9635] rounded-full">
	// 			<h1 className="text-white text-lg font-WorkSans font-normal leading-5">
	// 				{itemNumber}
	// 			</h1>
	// 		</div>
	// 		<div className="w-[18rem] md:w-[36rem]  flex flex-col gap-3">
	// 			<h1 className="text-[#1B1A1A] text-xl md:text-2xl font-WorkSans font-semibold leading-6 md:leading-7">
	// 				{header}
	// 			</h1>
	// 			<p className="text-xl text-[#1B1A1A] font-WorkSans font-normal leading-7">
	// 				{subText}
	// 			</p>
	// 		</div>
	// 	</div>
	// );
	return (
		<div>
			<div className="h-auto  mt-32 mb-[20px] lg:mb-[50px]">
				<div className="lg:flex lg:justify-between ">
					<div className="flex flex-col gap-6  w-[10rem] lg:w-[534px] mx-4 md:pt-32 md:ml-[5rem] lg:ml-[4rem] xl:ml-[9.375rem]">
						<h1
							className="text-[4rem] md:text-[5rem]
                    text-[#303778] font-SpaceGrotesk 
                    font-bold leading-[4.5rem] md:leading-[80px]"
						>
							Open a corporate account
						</h1>
						<p className="w-[22rem] md:w-[26.125rem] h-[1.875rem] text-xl  md:text-2xl text-[#1B1A1A] font-WorkSans font-normal  leading-[1.875rem]">
							Make transfers to bank accounts from your Onion Pay dashboard.
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
					<div className="w-fit">
						{/* {listData.map((item, index) => (
							<div key={index}>
								<ListComponent
									itemNumber={index + 1}
									header={item.header}
									subText={item.subText}
								/>
							</div>
						))} */}
						{/* <Image
							src={CollectPayments}
							loading="lazy"
							alt="Collect Payments Illustration"
						/> */}
					</div>
				</div>

				<div className="px-4 md:px-[5rem]  xl:px-[9.375rem] pt-[88px]">
					{/* <OrganizationForm /> */}
					<CertificateForm />
				</div>
			</div>
		</div>
	);
}
