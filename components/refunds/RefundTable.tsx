import React from 'react'

interface Props{
    // description:string,
    // amount:number,
    // paymentType:string,
    // date:string,
    status:string
}

const RefundTable = ({status}: Props) => {
  return (
    <div>
      <div className='w-[71.5rem] flex items-center px-4 h-12'>
            <div className='w-[22.5rem]'>
              <h1 className='text-sm '>Payment from ID: 1234567854</h1>
            </div>
            <div className='w-[10.445rem]'>
              <h1>NGN 300.00</h1>
            </div>
            <div className='w-[9.375rem]'>
              <h1>Card</h1>
            </div>
            <div className='w-[18.75rem]  '>
              <h1>Nov 19, 2022 - 10:28 AM</h1>
            </div>
            <div className='w-[10.445rem]'>
                    <h1 className='text-[#61A72C] text-base font-WorkSans font-normal leading-4'>{status}</h1>
            </div>
        </div>
    </div>
  )
}

export default RefundTable