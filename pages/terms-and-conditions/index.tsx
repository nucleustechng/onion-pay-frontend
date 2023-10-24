import Head from "next/head";
import React from "react";
import { termsOfUse } from "../../components/termsData";

const index = () => {
	return (
		<div className="mt-[100px] mb-[100px]">
			<div className="container mx-auto p-4">
				<Head>
					<title>Terms of Use for Onion Pay</title>
				</Head>
				<h1 className="text-3xl font-semibold mb-4 text-primary">
					Terms of Use for Onion Pay
				</h1>
				<h2 className="mb-6 text-lg font-medium">
					{`Last Updated: [Date] Welcome to Onion Pay, a payment gateway service
					provided by [Your Company Name] ("we," "us," or "our"). These Terms of
					Use outline the rules and guidelines for using our Onion Pay services
					in Nigeria. By using our services, you agree to comply with these
					terms. Please read them carefully.`}
				</h2>
				{termsOfUse.map((item: any, index: number) => (
					<div
						key={index}
						className=""
					>
						<p className="text-lg mb-4 font-medium">{item?.title}</p>
						<p className="text-base mb-4 font-normal text-slate-800">
							{item?.description}
						</p>
					</div>
				))}
				{/* More terms and conditions content */}
			</div>
		</div>
	);
};

export default index;
