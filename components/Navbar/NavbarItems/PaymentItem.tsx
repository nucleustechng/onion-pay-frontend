import React from "react";
import NavCard from "../NavCard";
import CollectPay from "../../../Assets/icons/payment/CollectPay.svg";
import SendMonney from "../../../Assets/icons/payment/SendMoney.svg";

const PaymentItem = () => {
  return (
    <div>
      <div>
        <h1 className="text-primary text-sm font-WorkSans font-medium leading-4 uppercase">
          Payment
        </h1>
        <div className="flex flex-col gap-[1.625rem] mt-[1.625rem]">
          <NavCard
            header="Collect payment"
            mainText="Collect payment anywhere"
            icon={CollectPay}
            alt="Collect payment icon"
            backgroundColor="bg-[#FFF3C8]"
            link="/collect-payment"
          />
          <NavCard
            header="Send money"
            mainText="Send money to anyone or business"
            icon={SendMonney}
            alt="Send money icon"
            backgroundColor="bg-[#E7EDFF]"
            link="/sendmoney"
          />
        </div>
      </div>
    </div>
  );
};

export default PaymentItem;
