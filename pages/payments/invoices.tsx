import React from "react";
import InvoiceSect from "../../components/payments/InvoiceSect";
import useAuth from "../../useAuth";

const Invoices = () => {
  useAuth();

  return (
    <div>
      <div>
        <div>
          <InvoiceSect />
        </div>
      </div>
    </div>
  );
};

export default Invoices;
