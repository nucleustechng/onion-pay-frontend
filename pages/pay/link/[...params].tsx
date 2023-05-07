import { useRouter } from 'next/router'
import React, { useEffect, useRef, useState } from 'react'

import SeerbitCheckout from "seerbit-reactjs"
import { useLoadPaymentLinksQuery } from '../../../modules/PaymentPageApi/paymentPageApi'
import useAuth from '../../../useAuth'
// import { useLoadInvoicesQuery } from '../../modules/Invoices/invoiceApi'


const Link = () => {
    useAuth()
  

    const myButtonRef:any = useRef(null);



    const [paymentLinksArray, setPaymentLinksArray] = useState([]);
    const {data:paymentLinkData, isSuccess} = useLoadPaymentLinksQuery();

    const router = useRouter();
    const { params } = router.query;
    const myLink = params && params[0];

    const targetLink:any = paymentLinksArray.find((paymentLink: { link: string | undefined }) =>  paymentLink.link == myLink)
    const merchantId = targetLink?.m_id;
    const pageId = targetLink?.p_id;
    
    const options = {
      "public_key": "SBTESTPUBK_CvXUBZ8NmYQ7UPr1JKxK8wNHwG8HUjEm",
      "tranref": 'link-' + merchantId + '-' + pageId,
      "currency": "NGN",
      "country": "NG",
      "amount": targetLink?.amount,
      "setAmountByCustomer": false,
      "tokenize" : false,
      "callbackurl": "http://localhost:3002"
    };
    
    useEffect(() => {
      if (myButtonRef.current) {
        myButtonRef.current.click();
      }
      if (isSuccess && paymentLinkData.success == true) {
        setPaymentLinksArray(paymentLinkData.pages)
      } else {
        console.log('An error occured')
      }
    }, [isSuccess, paymentLinkData]);
  
    useEffect(() => {
        const myButtonRef = document.getElementById('seerbit-checkout-button');
        if (myButtonRef) {
          myButtonRef.click();
        }
    }, []);
  
    
   

  return (
    <div className='flex justify-center'>
          <div className='flex justify-center items-center w-44 h-11 bg-primary cursor-pointer text-white rounded-md mt-8 mb-48'>
              <SeerbitCheckout
              id='seerbit-checkout-button'
                  public_key= {options.public_key}
                  tranref= {options.tranref}
                  currency= {options.currency}
                  country= {options.country}
                  amount={options.amount}
                  setAmountByCustomer= {options.setAmountByCustomer}
                  tokenize= {options.tokenize}
                  callbackurl= {options.callbackurl}
              />
          </div>
      </div> 
  )
}

export default Link