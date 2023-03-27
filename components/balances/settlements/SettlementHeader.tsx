import React from 'react'

type Props = {}

const SettlementHeader = (props: Props) => {
  return (
    <div>
    <div className='flex items-center px-4 rounded-[0.32rem] w-[71.5rem] h-[3rem] mt-6 bg-[#F5F5F5]'>
            <div className='w-[17.88rem]'>
                <h1 className='text-base text-[#262626] font-WorkSans font-normal leading-[1.2rem]'>Amount</h1>
            </div>
            <div className='w-[17.88rem]'>
                <h1 className='text-base text-[#262626] font-WorkSans font-normal leading-[1.2rem]'>Destination</h1>
            </div>
            <div className='w-[17.88rem]'>
                <h1 className='text-base text-[#262626] font-WorkSans font-normal leading-[1.2rem]'>Settlement Date</h1>
            </div>
            <div className='w-[17.88rem]'>
                <h1 className='text-base text-[#262626] font-WorkSans font-normal leading-[1.2rem]'>Status</h1>
            </div>
        </div>
    </div>
  )
}

export default SettlementHeader