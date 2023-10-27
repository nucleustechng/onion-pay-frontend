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
					{`Last Updated: Wednesday 25th October 2023 Welcome to Onion Pay, a payment gateway service
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
							- {item?.description}
						</p>
					</div>
				))}

				<div className="">
					<div className="text-xl font-semibold mb-4">Contact Information</div>
					<div className="mb-2">
						<span className="font-semibold">Address:</span>
						<div>PISI 1 CAPITALE</div>
						<div>155, BROAD STREET, MARINA, LAGOS STATE</div>
						<div>Lagos, Nigeria</div>
					</div>
					<div className="mb-2">
						<span className="font-semibold">Website:</span>
						<a
							href="https://onionpay.io"
							className="text-blue-500 hover:underline"
						>
							onionpay.io
						</a>
					</div>
					<div className="mb-2">
						<span className="font-semibold">Email:</span>
						<a
							href="mailto:Info@onionpay.io"
							className="text-blue-500 hover:underline"
						>
							Info@onionpay.io
						</a>
					</div>
					<div>
						<span className="font-semibold">Phone:</span> 08179442770
					</div>
				</div>
				{/* More terms and conditions content */}
			</div>
		</div>
	);
};

export default index;
