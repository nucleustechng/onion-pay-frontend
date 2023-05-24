import React from 'react'
import InvoiceSect from '../../components/payments/InvoiceSect'
import useAuth from '../../useAuth'



const Invoices = () => {

  useAuth()

  return (
    <div>
      <div>
        <div className='w-[20rem] md:w-[32rem] lg:w-[74rem]'>
          <InvoiceSect/>
        </div>
      </div>
    </div>
  )
}

export default Invoices