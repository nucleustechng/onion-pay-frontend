import { useRouter } from 'next/router'
import React, { useEffect, useRef, useState } from 'react'

import SeerbitCheckout from "seerbit-reactjs"
import Input from '../../../components/Input'
import { useLoadPaymentLinksQuery } from '../../../modules/PaymentPageApi/paymentPageApi'
// import { useLoadInvoicesQuery } from '../../modules/Invoices/invoiceApi'


const Link = () => {
  

    const myButtonRef:any = useRef(null);

    const [fullName,setFullName] = useState<string>('')
    const [email,setEmail] = useState<string>('')


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
      "full_name": fullName,
      "email": email,
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
        console.log(paymentLinkData)
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
      <div className='mt-32'>
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
            onChange={(e) => setEmail(e.target.value)}
            type='email'
            label='Email'
            placeholder='example@gmail.com' 
            height='h-[3.13rem]'
            textSize='text-base'/>
          </div>
          <div className='flex justify-center items-center w-44 h-11 bg-primary cursor-pointer text-white rounded-md mt-8 mb-48'>
              <SeerbitCheckout
              id='seerbit-checkout-button'
                  public_key= {options.public_key}
                  full_name= {options.full_name}
                  email= {options.email}
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
    </div>
  )
}

export default Link