import React from "react";
import NavCard from "../NavCard";
import PaymentLink from "../../../Assets/icons/commerce/PaymentLink.svg";
import Invoices from "../../../Assets/icons/commerce/Invoices.svg";

const CommerceItem = () => {
  return (
    <div>
      <div>
        <h1 className="text-primary text-sm font-WorkSans font-medium leading-4 uppercase">
          Commerce
        </h1>
        <div className="flex flex-col gap-[1.625rem] mt-[1.625rem]">
          <NavCard
            header="Payment links"
            mainText="Accept payments without writing code"
            icon={PaymentLink}
            alt="Payment Link Icon"
            backgroundColor="bg-[#FFF3C8]"
            link="/acceptpaymentlinks"
          />
          <NavCard
            header="Invoices"
            mainText="Create professional invoicess"
            icon={Invoices}
            alt="Invoice Icon"
            backgroundColor="bg-[#E7EDFF]"
            link="/detail-invoices"
          />
        </div>
      </div>
    </div>
  );
};

export default CommerceItem;
