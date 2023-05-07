import React from 'react'
import MySettlements  from '../../components/balances/settlements/Settlements'
import useAuth from '../../useAuth'


const Settlements = () => {
  useAuth()

  return (
    <div>
        <div>
            <div className='w-[30rem] sm:w-[40rem]  md:w-[47rem] lg:w-[50rem] xl:w-[71.5rem]'>
                <MySettlements/>
            </div>
        </div>
    </div>
  )
}

export default Settlements