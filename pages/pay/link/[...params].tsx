import Head from "next/head";
import { useRouter } from "next/router";
import React, { useEffect, useRef } from "react";
import SeerbitCheckout from "seerbit-reactjs";
import { usePaymentHooks } from "../../../components/payments/usePaymentHooks";
import { loadPaymentLink } from "../../../modules/pay/paymentService";
import { useQuery } from "@tanstack/react-query";

const Link = () => {
  const myButtonRef: any = useRef(null);
  const { handleLoadPaymentFees, data } = usePaymentHooks();

  const router = useRouter();
  const { params } = router.query;
  const myLink = params && params[0];
  const { data: paymentLink } = useQuery({
    queryKey: ["paymentlink"],
    queryFn: () => loadPaymentLink(myLink as string),
    enabled: !!myLink?.trim(),
  });

  const pageId = paymentLink?.p_id;
  const amountToPay = data && data?.amount;
  const myTimeStamp = new Date().getTime().toString();
  const options = {
    public_key: process.env.NEXT_PUBLIC_KEY,
    // public_key: "SBPUBK_Z56RA0CEOSPOP99016FHMATGIWZ2HMD4",
    tranref: "link-" + pageId + "-" + myTimeStamp,
    currency: "NGN",
    country: "NG",
    amount: amountToPay,
    setAmountByCustomer: false,
    tokenize: false,
    callbackurl: paymentLink?.redirect_url,
  };

  // Effect for handling payment fees
  useEffect(() => {
    handleLoadPaymentFees({
      amount: paymentLink?.amount,
      id: pageId as string,
      o_type: "l",
    });
  }, [paymentLink, pageId]);

  // Effect for triggering checkout when amountToPay changes
  useEffect(() => {
    if (myButtonRef && amountToPay && paymentLink) {
      myButtonRef.current.checkout(); // Trigger the checkout function when both paymentLink and amountToPay have values
    }
  }, [amountToPay, paymentLink]);

  return (
    <div className="flex justify-center">
      <Head>
        <script
          src="https://checkout.seerbitapi.com/api/v2/seerbit.js"
          async
        ></script>
      </Head>
      <div className="flex justify-center items-center w-44 h-11 bg-primary cursor-pointer text-white rounded-md mt-28 mb-48">
        <SeerbitCheckout
          id="seerbit-checkout-button"
          ref={myButtonRef}
          public_key={options.public_key}
          tranref={options.tranref}
          currency={options.currency}
          country={options.country}
          amount={options.amount}
          setAmountByCustomer={options.setAmountByCustomer}
          tokenize={options.tokenize}
          callbackurl={options.callbackurl}
          title={"Pay Now"}
          tag={"button"}
        />
      </div>
    </div>
  );
};

export default Link;
