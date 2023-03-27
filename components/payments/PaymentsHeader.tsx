import React from 'react'

type Props = {}

const PaymentsHeader = (props: Props) => {
  return (
    <div>
           <div className='flex items-center px-4 rounded-[0.32rem] w-[71.5rem] h-[3rem] mt-6 bg-[#F5F5F5]'>
            <div className='w-[14.25rem]'>
                <h1 className='text-base text-[#262626] font-WorkSans font-normal leading-[1.2rem]'>Page name</h1>
            </div>
            <div className='w-[12.3rem]'>
                <h1 className='text-base text-[#262626] font-WorkSans font-normal leading-[1.2rem]'>Amount</h1>
            </div>
            <div className='w-[10.3rem]'>
                <h1 className='text-base text-[#262626] font-WorkSans font-normal leading-[1.2rem]'>Page ID</h1>
            </div>
            <div className='w-[14.3rem]'>
                <h1 className='text-base text-[#262626] font-WorkSans font-normal leading-[1.2rem]'>Description</h1>
            </div>
            <div className='w-[14.3rem] pl-2'>
                <h1 className='text-base text-[#262626] font-WorkSans font-normal leading-[1.2rem]'>Payment link</h1>
            </div>
        </div>
    </div>
  )
}

export default PaymentsHeader