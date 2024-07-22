import React from "react";
import TransactionRefunds from "../../components/refunds/TransactionRefunds";
import useAuth from "../../useAuth";

const Refunds = () => {
  useAuth();

  return (
    <div className="w-full">
      <TransactionRefunds />
    </div>
  );
};

export default Refunds;
