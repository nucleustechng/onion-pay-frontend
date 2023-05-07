import React from 'react'
import MyBalanceHistory from '../../components/balances/BalanceHistory'
import useAuth from '../../useAuth'



const Balancehistory = () => {
  useAuth()


  return (
    <div>
        <div className='flex'>
            <div className=' xl:w-[71.5rem]'>
            <MyBalanceHistory/>
            </div>
        </div>
    </div>
  )
}

export default Balancehistory