import React from "react";
import TransactionRefunds from "../../components/refunds/TransactionRefunds";
import useAuth from "../../useAuth";

const Refunds = () => {
  useAuth();

  return (
    <div>
      <div>
        <div className="w-[20rem] md:w-[32rem] xl:w-[74.5rem]">
          <TransactionRefunds />
        </div>
      </div>
    </div>
  );
};

export default Refunds;
