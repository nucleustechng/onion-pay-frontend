import React from 'react'
// import ChargeBacks from '../../components/chargebacks/ChargeBacks'
// import Refunds from '../components/refunds/Refunds'
import TransactionSect from '../../components/transactions/TransactionSect'
import useAuth from '../../useAuth'



const Transactions = () => {
  useAuth()

  return (
    <div>
      <div>
        <div className='w-[20rem] lg:w-[74rem]'>
          <TransactionSect/>
          {/* <Refunds/> */}
          {/* <ChargeBacks/> */}
        </div>

      </div>
    </div>
  )
}

export default Transactions