import React from 'react'

type Props = {}

const TransactionHeader = (props: Props) => {
  return (
    <div>
        <div className='w-[55.65rem] flex items-center rounded-[0.32rem] lg:w-auto px-10 h-12 bg-[#F5F5F5]'>
            <div className='w-[22.5rem] lg:w-[22.5rem]'>
              <h1 className='text-sm'>Description</h1>
            </div>
            <div className='w-[10.45rem] lg:w-[10.45rem]'>
              <h1 className='text-sm'>Amount</h1>
            </div>
            <div className='w-[9.5rem] lg:w-[9.5rem]'>
              <h1 className='text-sm'>Payment type</h1>
            </div>
            <div className='w-[18.8rem] pl-3  lg:w-[18.8rem]'>
              <h1 className='text-sm'>Date</h1>
            </div>
            <div className='w-[8rem] lg:w-[8rem]'>
              <h1 className='text-sm'>Status</h1>
            </div>
        </div>
    </div>
  )
}

export default TransactionHeader