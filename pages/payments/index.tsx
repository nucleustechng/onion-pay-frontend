import React from 'react'
import HelpButton from '../../components/HelpButton'
// import TransfersEmpty from '../../components/payments/TransfersEmpty'
// import PaymentLinks from '../../components/payments/PaymentLinks'
// import PaymentPlans from '../../components/payments/payment plans/PaymentPlans'
import SeerbitComponent from '../../components/Checkout/SeerbitComponent'
import { useRouter } from 'next/router'
import { useAppSelector } from '../../redux/redux-hooks/hooks'
import { RootState } from '../../redux/store'


const Payments = () => {
  const router = useRouter()

  const  isLoggedIn = useAppSelector((state:RootState) => state.login.isLoggedIn)

  if (typeof window !== "undefined") {
    // import and use next/router here
    if(!isLoggedIn){
      router.push('/auth/signin')
    }
  }
  return (
    <div>
        <div>
            <div className='w-[71.5rem]'>
                {/* <TransfersEmpty/> */}
                <SeerbitComponent/>
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

export default Payments