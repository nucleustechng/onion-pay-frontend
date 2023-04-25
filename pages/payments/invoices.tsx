import { useRouter } from 'next/router'
import React from 'react'
// import ChargeBacks from '../../components/chargebacks/ChargeBacks'
// import Refunds from '../components/refunds/Refunds'
import TransactionSect from '../../components/transactions/TransactionSect'



const Invoices = () => {


  return (
    <div>
      <div>
        <div className='w-[20rem] lg:w-[74rem]'>
          <TransactionSect/>
        </div>
      </div>
    </div>
  )
}

export default Invoices