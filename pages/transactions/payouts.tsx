import React from "react";
// import ChargeBacks from '../../components/chargebacks/ChargeBacks'
// import Refunds from '../components/refunds/Refunds'
// import TransactionSect from "../../components/transactions/TransactionSect";
import useAuth from "../../useAuth";
import PayoutContent from "../../components/transactions/PayoutContent";

const Payout = () => {
	useAuth();
	// Create a client

	return (
		<div>
			{/* <TransactionSect/> */}
			{/* <Refunds/> */}
			{/* <ChargeBacks/> */}
			<PayoutContent />
		</div>
	);
};

export default Payout;
