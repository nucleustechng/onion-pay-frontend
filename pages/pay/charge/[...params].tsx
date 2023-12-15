import Head from "next/head";
import { useRouter } from "next/router";
import React, { useEffect, useRef } from "react";
import SeerbitCheckout from "seerbit-reactjs";
import { usePaymentHooks } from "../../../components/payments/usePaymentHooks";
import { loadOrder, verifyPayment } from "../../../modules/pay/paymentService";
import { useQuery } from "@tanstack/react-query";

const DirectCharge = () => {
	const router = useRouter();
	const { params } = router.query;
	const orderId = params ? params[0] : "";
	const myButtonRef: any = useRef();
	const { handleLoadPaymentFees, data } = usePaymentHooks();
	const { data: orderData } = useQuery({
		queryKey: ["order"],
		queryFn: () => loadOrder(orderId as string),
		enabled: !!orderId?.trim(),
	});

	const { data: verifyPayData } = useQuery({
		queryKey: ["verifypay"],
		queryFn: () => verifyPayment(orderId as string),
		enabled: !!orderId?.trim(),
	});

	useEffect(() => {
		if (verifyPayData?.success) {
			if (verifyPayData?.paid == true) {
				router.push("/pay/charge/direct");
			}
		}
	}, [verifyPayData, params, router]);

	useEffect(() => {
		handleLoadPaymentFees({
			amount: orderData?.amount,
			id: orderId,
			o_type: "c",
		});
	}, [orderData, orderId]);

	const amountToPay = data && data?.amount;

	useEffect(() => {
		if (myButtonRef && orderData && amountToPay) {
			myButtonRef.current.checkout(); // Trigger the checkout function when the component is mounted
		}
	}, [orderData, amountToPay]);

	// const timestamp = params![1];
	// const newAmount = orderData && orderData["order"]?.amount;
	const options = {
		public_key: process.env.NEXT_PUBLIC_KEY,
		tranref: "charge-" + orderId,
		currency: "NGN",
		country: "NG",
		amount: amountToPay,
		setAmountByCustomer: false,
		tokenize: false,
		callbackurl: orderData?.redirect_url,
	};

	return (
		<div className="flex justify-center">
			<Head>
				<script
					src="https://checkout.seerbitapi.com/api/v2/seerbit.js"
					async
				></script>
			</Head>
			<div className="mt-32">
				<div className="flex justify-center items-center w-44 h-11 bg-primary cursor-pointer text-white rounded-md mt-8 mb-48">
					<SeerbitCheckout
						public_key={options.public_key}
						tranref={options.tranref}
						currency={options.currency}
						country={options.country}
						amount={options.amount}
						setAmountByCustomer={options.setAmountByCustomer}
						tokenize={options.tokenize}
						callbackurl={options.callbackurl}
						ref={myButtonRef}
						title={"Pay Now"}
						tag={"button"}
					/>
				</div>
			</div>
		</div>
	);
};

export default DirectCharge;
