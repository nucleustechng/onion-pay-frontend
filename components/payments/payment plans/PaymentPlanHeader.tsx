import React from 'react'

type Props = {}

const PaymentPlanHeader = (props: Props) => {
  return (
    <div>
        <div className='flex items-center px-4 rounded-[0.32rem] w-auto h-[3rem] mt-6 bg-[#F5F5F5]'>
            <div className='w-[14.65rem]'>
                <h1 className='text-base text-[#262626] font-WorkSans font-normal leading-[1.2rem]'>Plan name</h1>
            </div>
            <div className='w-[7.5rem]'>
                <h1 className='text-base text-[#262626] font-WorkSans font-normal leading-[1.2rem]'>Plan ID</h1>
            </div>
            <div className='w-[14.67rem]'>
                <h1 className='text-base text-[#262626] font-WorkSans font-normal leading-[1.2rem]'>Amount</h1>
            </div>
            <div className='w-[8.75rem]'>
                <h1 className='text-base text-[#262626] font-WorkSans font-normal leading-[1.2rem]'>Interval</h1>
            </div>
            <div className='w-[14.67rem]'>
                <h1 className='text-base text-[#262626] font-WorkSans font-normal leading-[1.2rem]'>Date created</h1>
            </div>
            <div className='w-[11.25rem]'>
                <h1 className='text-base text-[#262626] font-WorkSans font-normal leading-[1.2rem]'>Status</h1>
            </div>
        </div>
    </div>
  )
}

export default PaymentPlanHeader