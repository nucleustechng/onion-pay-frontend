import React, { useEffect, useState } from 'react'

import SeerbitCheckout from "seerbit-reactjs"
import { useLoadInvoicesQuery } from '../../modules/Invoices/invoiceApi'


const SeerbitComponent = () => {
  

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


  const {data:invoiceData,isSuccess} = useLoadInvoicesQuery()
  // const  [showEmpty,setShowEmpty] = useState<boolean>(true)

  useEffect(() => {
    // invoicesArray.length >= 1 ?  setShowEmpty(false) : setShowEmpty(true);

    if (isSuccess && invoiceData.success == true) {
      setInvoicesArray(invoiceData['invoices'])
      // console.log('Amount',invoicesArray[4]?.amount)
    } else {
      console.log('An error occured')
    }
  },[isSuccess,invoicesArray,invoiceData])

      const options = {
        "public_key": "SBTESTPUBK_CvXUBZ8NmYQ7UPr1JKxK8wNHwG8HUjEm",
        "full_name": "Joseph Keswet",
        "email": "jhezekiah19@gmail.com",
        "tranref": 'invoice-' + 'v13V07H15R03R03Y00n03D11V07H15V07V07H15-' + '1680772334837',
        "currency": "NGN",
        "country": "NG",
        "amount": invoicesArray[10]?.amount,
        "setAmountByCustomer": false,
        "tokenize" : false,
        "callbackurl": "http://localhost:3002"
      };
    
   

  return (
    <div className='flex justify-center'>
      <div className='flex justify-center items-center w-44 h-11 bg-primary text-white rounded-md'>
      {/* <button onClick={() => handleCheckout()}>Seerbit</button> */}

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
  )
}

export default SeerbitComponent