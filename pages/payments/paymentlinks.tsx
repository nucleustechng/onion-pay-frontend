import React from "react";
import PaymentLinks from "../../components/payments/PaymentLinks";
import useAuth from "../../useAuth";
// import { PaymentLinkTable } from "../../components/Tables/PaymentLinkTable";
// import { getPaymentPages } from "../../modules/PaymentPageApi/paymenyPageService";
// import { useQuery } from "@tanstack/react-query";

const Paymentlinks = () => {
	useAuth();
	// const { data: paymentLinks, isLoading } = useQuery({
	// 	queryKey: ["paymentLinks"],
	// 	queryFn: getPaymentPages,
	// });
	return (
		<div>
			{/* <PaymentLinkTable
				isLoading={isLoading}
				paymentLinks={paymentLinks}
			/> */}
			<div className="w-[21rem] md:w-[32rem] xl:w-[71.5rem]">
				<PaymentLinks />
			</div>
		</div>
	);
};

export default Paymentlinks;
