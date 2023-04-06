import React from 'react'

interface Props{
    // description:string,
    amount:string,
    paymentId:string,
    date:string,
    status:string
}

const TransactionTable = ({status,date,paymentId,amount}: Props) => {
  const slicedAmount = amount.slice(1)
  return (
    <div>
     <div className='flex items-center px-4 w-[71.5rem] h-16'>
            <div className='w-[22.5rem]'>
              <h1>Payment from ID: {paymentId}</h1>
            </div>
            <div className='w-[10.45rem]'>
              <h1>NGN {slicedAmount}</h1>
            </div>
            {/* <div className='w-[9.4rem]'>
              <h1>Card</h1>
            </div> */}
            <div className='w-[18.8rem]'>
              <h1>{date ? date : ''}</h1>
            </div>
            <div className='w-[10.45rem]'>
                <div className='flex items-center   w-[6.65rem] h-[1.71rem] rounded-lg '>
                    <h1 className={`${status == 'Successful' ? 'text-[#61A72C]' : 'text-[#FF9635]'} text-base font-WorkSans font-normal leading-4`}>{status}</h1>
                </div>
            </div>
        </div>
    </div>
  )
}

export default TransactionTable