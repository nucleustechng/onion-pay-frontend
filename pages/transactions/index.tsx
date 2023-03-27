import React from 'react'
import ChargeBacks from '../../components/chargebacks/ChargeBacks'
// import Refunds from '../components/refunds/Refunds'
import SideBar from '../../components/SideBar'
import TransactionSect from '../../components/transactions/TransactionSect'
// import TransactionSect from '../components/transactions/TransactionSect'


const Transactions = () => {
  return (
    <div>
      <div>
        <div className='w-[20rem] lg:w-[72rem]'>
          <TransactionSect/>
          {/* <Refunds/> */}
          {/* <ChargeBacks/> */}
        </div>

      </div>
    </div>
  )
}

export default Transactions