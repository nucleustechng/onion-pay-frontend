import React, { useEffect } from 'react'
import {  useSeerbitPayMutation } from './SeerbitPayment';
import SeerbitCheckout from "seerbit-reactjs"

type Props = {}

const SeerbitComponent = (props: Props) => {
  

  const close = (close:any) => {
    console.log(close);
  };
  const callback = (response:any) => {
    console.log(response);
  };

  const checkProgress = (progress:any) => {
    console.log(progress);
  };

      const options = {
        "public_key": "SBTESTPUBK_CvXUBZ8NmYQ7UPr1JKxK8wNHwG8HUjEm",
        "full_name": "Joseph Keswet",
        "email": "jhezekiah19@gmail.com",
        "tranref": new Date().getTime(),
        "currency": "NGN",
        "country": "NG",
        "amount": "50.00",
        "setAmountByCustomer": false,
        "tokenize" : false,
        "callbackurl": "http://localhost:3002"
      };
    
    const [seerbitPay,{data:payData,isSuccess,error}] = useSeerbitPayMutation()

    const  handleCheckout =  async () => {
      if (options) {
        await  seerbitPay(options)
    } else {
        console.log("An error occured ")
    }
    }

    useEffect(()  =>  {
        if(isSuccess){
          console.log(payData)
        }
        if(error){
          console.log(error)
        }
    },[])

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