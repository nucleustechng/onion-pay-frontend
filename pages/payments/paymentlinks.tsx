import React from 'react'
import PaymentLinks from '../../components/payments/PaymentLinks'
import SideBar from '../../components/SideBar'

type Props = {}

const paymentlinks = (props: Props) => {
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

export default paymentlinks