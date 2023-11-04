import React from "react";
// import ChargeBacks from '../../components/chargebacks/ChargeBacks'
// import Refunds from '../components/refunds/Refunds'
// import TransactionSect from "../../components/transactions/TransactionSect";
import useAuth from "../../useAuth";
import TransactionsContent from "../../components/transactions/TestSect";

const Transactions = () => {
	useAuth();
	// Create a client

	return (
		<div>
			{/* <TransactionSect/> */}
			{/* <Refunds/> */}
			{/* <ChargeBacks/> */}
			<TransactionsContent />
		</div>
	);
};

export default Transactions;
