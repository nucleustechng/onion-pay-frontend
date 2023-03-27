import React from 'react'


const ChargebackHeader = () => {
  return (
    <div>
        <div className='flex items-center rounded-[0.32rem] w-[71.5rem] px-4 h-12 bg-[#F5F5F5]'>
            <div className='w-[22.5rem]'>
              <h1>Description</h1>
            </div>
            <div className='w-[10.45rem]'>
              <h1>Amount</h1>
            </div>
            <div className='w-[9.4rem]'>
              <h1>Payment type</h1>
            </div>
            <div className='w-[18.8rem]'>
              <h1>Date</h1>
            </div>
            <div className='w-[10.45rem]'>
              <h1>Status</h1>
            </div>
        </div>
    </div>
  )
}

export default ChargebackHeader