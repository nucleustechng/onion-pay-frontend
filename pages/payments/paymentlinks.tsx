import React from 'react'
import PaymentLinks from '../../components/payments/PaymentLinks'
import useAuth from '../../useAuth'





const Paymentlinks = () => {
  useAuth()

  return (
    <div>
      <div>
          <div className='w-[21rem] md:w-[32rem] xl:w-[71.5rem]'>
            <PaymentLinks/>
          </div>
      </div>
    </div>
  )
}

export default Paymentlinks