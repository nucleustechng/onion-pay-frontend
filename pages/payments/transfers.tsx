import React from 'react'
import HelpButton from '../../components/HelpButton'
// import TransfersEmpty from '../../components/payments/TransfersEmpty'
// import PaymentLinks from '../../components/payments/PaymentLinks'
// import PaymentPlans from '../../components/payments/payment plans/PaymentPlans'
import TransfersEmpty from '../../components/payments/TransfersEmpty'
import useAuth from '../../useAuth'


const Transfers = () => {
  useAuth()
 
  return (
    <div>
        <div>
            <div className='w-[74rem]'>
                <TransfersEmpty/>
                {/* <SeerbitComponent/> */}
                {/* <PaymentLinks/> */}
                {/* <PaymentPlans/> */}
            </div>
            <div className='fixed left-auto top-3/4 right-0 mr-7 z-50 mt-[8.5rem]'>
                    <HelpButton/>
                </div>
           
        </div>
    </div>
  )
}

export default Transfers