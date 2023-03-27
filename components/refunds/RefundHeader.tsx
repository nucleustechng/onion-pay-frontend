import React from 'react'

type Props = {}

const RefundHeader = (props: Props) => {
  return (
    <div>
        <div className='w-[71.5rem] flex items-center rounded-[0.32rem]  px-6 h-12 bg-[#F5F5F5]'>
            <div className='w-[22.5rem]'>
              <h1>Description</h1>
            </div>
            <div className='w-[10.445rem]  '>
              <h1>Amount</h1>
            </div>
            <div className='w-[9.375rem]'>
              <h1>Payment type</h1>
            </div>
            <div className='w-[18.75rem] '>
              <h1>Date</h1>
            </div>
            <div className='w-[10.445rem] '>
              <h1>Status</h1>
            </div>
        </div>
    </div>
  )
}

export default RefundHeader