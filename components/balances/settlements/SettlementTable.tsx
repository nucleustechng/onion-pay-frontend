import React from 'react'

type Props = {
    status:string
}

const SettlementTable = ({status}: Props) => {
  return (
    <div>
        <div className='flex items-center px-4 rounded-[0.32rem] w-[71.5rem] h-[4.3rem]'>
            <div className='w-[17.88rem]'>
                <h1 className='text-base text-[#262626] font-WorkSans font-normal leading-[1.2rem]'>NGN 305.00</h1>
            </div>
            <div className='w-[17.88rem]'>
                <h1 className='text-base text-[#262626] font-WorkSans font-normal leading-[1.2rem]'>Available balance</h1>
            </div>
            <div className='w-[17.88rem]'>
                <h1 className='text-base text-[#262626] font-WorkSans font-normal leading-[1.2rem]'>Nov 19, 2022 - 10:28 AM</h1>
            </div>
            <div className='w-[17.88rem]'>
            <div className='flex items-center justify-center  w-[6.65rem] h-[1.71rem] rounded-lg bg-[#D5FFB6]'>
                    <h1 className='text-[#61A72C] text-base font-WorkSans font-normal leading-4'>Success</h1>
                </div>
            </div>
        </div>
    </div>
  )
}

export default SettlementTable