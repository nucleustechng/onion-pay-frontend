import React from 'react'

import SeerbitCheckout from "seerbit-reactjs"


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