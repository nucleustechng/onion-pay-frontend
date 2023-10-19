import Head from "next/head";
import React from "react";
import { paymentProtectionPromiseContent } from "../../components/termsData";

const index = () => {
	return (
		<div className="mt-[100px] mb-[100px]">
			<div className="container mx-auto p-4">
				<Head>
					<title>Terms and Conditions</title>
				</Head>
				<h1 className="text-3xl font-semibold mb-4 text-primary">
					*Onion Pay Payment Protection Promise*
				</h1>
				{paymentProtectionPromiseContent.map((item: any) => (
					<div className="">
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
