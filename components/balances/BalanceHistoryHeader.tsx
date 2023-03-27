import React from 'react'



const BalanceHistoryHeader = () => {
  return (
    <div>
         <div className='flex items-center px-4 rounded-[0.32rem] w-[71.5rem] h-[3rem] mt-6 bg-[#F5F5F5]'>
            <div className='w-[15rem]'>
                <h1 className='text-base text-[#262626] font-WorkSans font-normal leading-[1.2rem]'>Amount</h1>
            </div>
            <div className='w-[11.4rem]'>
                <h1 className='text-base text-[#262626] font-WorkSans font-normal leading-[1.2rem]'>Balance before</h1>
            </div>
            <div className='w-[11.4rem]'>
                <h1 className='text-base text-[#262626] font-WorkSans font-normal leading-[1.2rem]'>Balance after</h1>
            </div>
            <div className='w-[17.5rem]'>
                <h1 className='text-base text-[#262626] font-WorkSans font-normal leading-[1.2rem]'>Details</h1>
            </div>
            <div className='w-[16.25rem]'>
                <h1 className='text-base text-[#262626] font-WorkSans font-normal leading-[1.2rem]'>Date</h1>
            </div>
        </div>
    </div>
  )
}

export default BalanceHistoryHeader