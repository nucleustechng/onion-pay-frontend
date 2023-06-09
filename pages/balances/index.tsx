import React from 'react'
import Balance from '../../components/balances/Balance'
import HelpButton from '../../components/HelpButton'
import useAuth from '../../useAuth'



const Balances = () => {
  useAuth()

  return (
    <div>
        <div className='flex'>
            <div className='w-[30rem] md:w-[48rem] xl:w-[71.5rem]'>
                <div>
                <Balance/>
                </div>
            
            </div>
            <div className='fixed left-auto top-3/4 right-0 mr-7 z-50 mt-[8.5rem]'>
                    <HelpButton/>
            </div>
        </div>
    </div>
  )
}

export default Balances