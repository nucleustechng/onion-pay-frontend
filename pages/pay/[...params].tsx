import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useRef } from "react";
import "react-toastify/dist/ReactToastify.css";
import SeerbitCheckout from "seerbit-reactjs";
import { usePaymentHooks } from "../../components/payments/usePaymentHooks";
import { useQuery } from "@tanstack/react-query";
import { loadSingleInvoice } from "../../modules/pay/paymentService";

const Invoice = () => {
  const myButtonRef: any = useRef();

  const { handleLoadPaymentFees, data } = usePaymentHooks();

  const router = useRouter();
  const { params } = router.query;
  const invoiceId = params && params[2];

  const targetInvoiceId = invoiceId;
  const { data: invoiceData } = useQuery({
    queryKey: ["invoice"],
    queryFn: () => loadSingleInvoice(invoiceId as string),
    enabled: !!invoiceId?.trim(),
  });

  useEffect(() => {
    handleLoadPaymentFees({
      amount: invoiceData?.amount,
      id: targetInvoiceId as string,
      o_type: "i",
    });
  }, [invoiceData, targetInvoiceId]);

  const myTimeStamp = new Date().getTime().toString();
  const amountToPay = data && data?.amount;

  const options = {
    public_key: process.env.NEXT_PUBLIC_KEY,
    tranref: "invoice-" + invoiceId + "-" + myTimeStamp,
    currency: "NGN",
    country: "NG",
    amount: amountToPay,
    setAmountByCustomer: false,
    tokenize: false,
    callbackurl: "https://onionpay.io/",
  };

  useEffect(() => {
    if (myButtonRef && invoiceData && amountToPay) {
      myButtonRef.current.checkout(); // Trigger the checkout function when the component is mounted
    }
  }, [invoiceData, amountToPay]);

  return (
    <div className="flex justify-center">
      <Head>
        <script
          src="https://checkout.seerbitapi.com/api/v2/seerbit.js"
          async
        ></script>
      </Head>
      {/* <ToastContainer/> */}
      {/* <div className='mt-32'>
      <h2 className='text-lg text-center text-[#1B1A1A] font-WorkSans font-semibold leading-5 mb-10'>Fill in your details to pay</h2>
          <div className='flex flex-col gap-4'>
            <Input
            width='w-[20.5rem] md:w-[25rem] lg:w-[30rem]'
            name='full_name'
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            type='text'
            label='Full name'
            placeholder='Full name' 
            height='h-[3.13rem]'
            textSize='text-base'/>
            <Input
            width='w-[20.5rem] md:w-[25rem] lg:w-[30rem]'
            name='full_name'
            value={email}
            onChange={(e) => {
              setEmail(e.target.value)
            }}
            type='email'
            label='Email'
            placeholder='example@gmail.com' 
            height='h-[3.13rem]'
            textSize='text-base'/> */}
      {/* </div> */}
      <div className="flex justify-center items-center w-44 h-11 bg-primary cursor-pointer text-white rounded-md mt-28 mb-48">
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
      {/* </div>  */}
    </div>
  );
};

export default Invoice;
