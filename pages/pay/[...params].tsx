import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'

import SeerbitCheckout from "seerbit-reactjs"
import Input from '../../components/Input'
import { useLoadInvoicesQuery } from '../../modules/Invoices/invoiceApi'


const invoice = () => {
  

  // const close = (close:any) => {
  //   console.log(close);
  // };
  // const callback = (response:any) => {
  //   console.log(response);
  // };

  // const checkProgress = (progress:any) => {
  //   console.log(progress);
  // };

  const [invoicesArray,setInvoicesArray] = useState<any>([])

  const [fullName,setFullName] = useState<string>('')
  const [email,setEmail] = useState<string>('')


  const {data:invoiceData,isSuccess} = useLoadInvoicesQuery()
  // const  [showEmpty,setShowEmpty] = useState<boolean>(true)

  useEffect(() => {
    if (isSuccess && invoiceData.success == true) {
      setInvoicesArray(invoiceData['invoices'])
      // console.log('Amount',invoicesArray[4]?.amount)
    } else {
      console.log('An error occured')
    }
  },[isSuccess,invoicesArray,invoiceData])
  const router = useRouter();
  const { params } = router.query;

  const merchantId = params && params[1]; 
  const invoiceId = params && params[2];

  const targetInvoiceId = invoiceId;

  const targetInvoice = invoicesArray.find((invoice: { i_id: string | undefined }) =>  invoice.i_id == targetInvoiceId)

  // const timestamp = params![1];

      const options = {
        "public_key": "SBTESTPUBK_CvXUBZ8NmYQ7UPr1JKxK8wNHwG8HUjEm",
        "full_name": fullName,
        "email": email,
        "tranref": 'invoice-' + merchantId + '-' + invoiceId,
        "currency": "NGN",
        "country": "NG",
        "amount": targetInvoice?.amount,
        "setAmountByCustomer": false,
        "tokenize" : false,
        "callbackurl": "http://localhost:3002"
      };
    
   

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

export default invoice