import { useRouter } from 'next/router'
import React from 'react'
import PaymentLinks from '../../components/payments/PaymentLinks'
import { useAppSelector } from '../../redux/redux-hooks/hooks'
import { RootState } from '../../redux/store'




const Paymentlinks = () => {
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
          <div className='w-[30rem]   xl:w-[71.5rem]'>
            <PaymentLinks/>
          </div>
      </div>
    </div>
  )
}

export default Paymentlinks