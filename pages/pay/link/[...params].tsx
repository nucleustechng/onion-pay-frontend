import Head from "next/head";
import { useRouter } from "next/router";
import React, { useEffect, useRef, useState } from "react";

import SeerbitCheckout from "seerbit-reactjs";
import { useLoadPaymentLinksQuery } from "../../../modules/PaymentPageApi/paymentPageApi";
// import { useLoadInvoicesQuery } from '../../modules/Invoices/invoiceApi'

const Link = () => {
	const myButtonRef: any = useRef(null);

	const [paymentLinksArray, setPaymentLinksArray] = useState([]);
	const { data: paymentLinkData, isSuccess } = useLoadPaymentLinksQuery();

	const router = useRouter();
	const { params } = router.query;
	const myLink = params && params[0];

	const targetLink: any = paymentLinksArray.find(
		(paymentLink: { link: string | undefined }) => paymentLink.link == myLink
	);
	const merchantId = targetLink?.m_id;
	const pageId = targetLink?.p_id;

	const options = {
		public_key: process.env.NEXT_PUBLIC_KEY,
		tranref: "link-" + merchantId + "-" + pageId,
		currency: "NGN",
		country: "NG",
		amount: targetLink?.amount,
		setAmountByCustomer: false,
		tokenize: false,
		callbackurl: targetLink?.redirect_url,
	};

	useEffect(() => {
		if (isSuccess && paymentLinkData.success == true) {
			setPaymentLinksArray(paymentLinkData.pages);
		} else {
			console.log("An error occured");
		}
	}, [isSuccess, paymentLinkData]);

	useEffect(() => {
		if (myButtonRef && targetLink) {
			myButtonRef.current.checkout(); // Trigger the checkout function when the component is mounted
		}
	}, [targetLink]);

	return (
		<div className="flex justify-center">
			<Head>
				<script
					src="https://checkout.seerbitapi.com/api/v2/seerbit.js"
					async
				></script>
			</Head>
			<div className="flex justify-center items-center w-44 h-11 bg-primary cursor-pointer text-white rounded-md mt-28 mb-48">
				<SeerbitCheckout
					id="seerbit-checkout-button"
					ref={myButtonRef}
					public_key={options.public_key}
					tranref={options.tranref}
					currency={options.currency}
					country={options.country}
					amount={options.amount}
					setAmountByCustomer={options.setAmountByCustomer}
					tokenize={options.tokenize}
					callbackurl={options.callbackurl}
					title={"Pay Now"}
					tag={"button"}
				/>
			</div>
		</div>
	);
};

export default Link;
