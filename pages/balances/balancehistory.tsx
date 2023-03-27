import React from 'react'
import BalanceHistory from '../../components/balances/BalanceHistory'


const balancehistory = () => {
  return (
    <div>
        <div className='flex'>
            <div className=' xl:w-[71.5rem]'>
            <BalanceHistory/>
            </div>
        </div>
    </div>
  )
}

export default balancehistory