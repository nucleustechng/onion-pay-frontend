import Head from "next/head";
import { useRouter } from "next/router";
import React, { useEffect, useRef, useState } from "react";

import SeerbitCheckout from "seerbit-reactjs";
import {
	useLoadOrderQuery,
	useVerifyPaymentQuery,
} from "../../../modules/Client/usersApi";
import { usePaymentHooks } from "../../../components/payments/usePaymentHooks";

type OrderData = {
	success: boolean;
	order: {
		amount: string;
		amount_string: string;
		customer: {
			phone: string;
			name: string;
			email: string;
		};
		customizations: {
			description: string;
			logo: string;
			title: string;
		};
		o_id: string;
	};
	business_name: string;
};

const DirectCharge = () => {
	const router = useRouter();
	const { params } = router.query;
	const orderId = params ? params[0] : "";
	const myButtonRef: any = useRef();
	const { handleLoadPaymentFees, amountToPay } = usePaymentHooks();

	const { data: orderData, isSuccess } = useLoadOrderQuery<OrderData | any>(
		orderId
	);
	const { data: verifyPayData, isSuccess: verifyPaySuccess } =
		useVerifyPaymentQuery<any>(orderId);

	const [amount, setAmount] = useState<number>(0);
	const [redirect_url, setRedirectUrl] = useState<string>("");

	useEffect(() => {
		if (verifyPaySuccess && verifyPayData.success) {
			if (verifyPayData?.paid == true) {
				router.push("/pay/charge/direct");
			}
		}
		if (isSuccess && orderData.success) {
			setAmount(orderData["order"]?.amount);
			setRedirectUrl(orderData ? orderData["order"]?.redirect_url : "");
		}
	}, [
		isSuccess,
		orderData,
		verifyPaySuccess,
		verifyPayData,
		amount,
		redirect_url,
		params,
		router,
	]);

	useEffect(() => {
		handleLoadPaymentFees({
			amount: orderData["order"]?.amount,
			id: orderId,
			o_type: "c",
		});
	}, [orderData]);

	useEffect(() => {
		if (myButtonRef && orderData) {
			myButtonRef.current.checkout(); // Trigger the checkout function when the component is mounted
		}
	}, [orderData]);

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
		callbackurl: redirect_url,
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
