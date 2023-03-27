import React from 'react'

interface Props{
    // description:string,
    // amount:number,
    // paymentType:string,
    // date:string,
    status:string
}

const ChargebackTable = ({status}: Props) => {
  return (
    <div>
        <div className='flex items-center px-4 w-[71.5rem] h-12'>
            <div className='w-[22.5rem]'>
              <h1>Payment from ID: 1234567854</h1>
            </div>
            <div className='w-[10.45rem]'>
              <h1>NGN 300.00</h1>
            </div>
            <div className='w-[9.4rem]'>
              <h1>Card</h1>
            </div>
            <div className='w-[18.8rem]'>
              <h1>Nov 19, 2022 - 10:28 AM</h1>
            </div>
            <div className='w-[10.45rem]'>
                <div className='flex items-center justify-center  w-[6.65rem] h-[1.71rem] rounded-lg bg-[#D5FFB6]'>
                    <h1 className='text-[#61A72C] text-base font-WorkSans font-normal leading-4'>{status}</h1>
                </div>
            </div>
        </div>
    </div>
  )
}

export default ChargebackTable