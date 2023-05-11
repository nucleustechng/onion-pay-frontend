import React, { useEffect, useState } from 'react'

interface Props{
    type:string,
    amount:string,
    transactionID:string,
    // status:string,
    createdOn:any
}

const TransactionTable = ({transactionID,amount,createdOn,type}: Props) => {
  const slicedAmount = amount.slice(1)
  const [formattedDate, setFormattedDate] = useState('')

  useEffect(() => {
    const formatDate = (dateString:string) => {
      const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
      const date = new Date(dateString);
      const month = months[date.getMonth()];
      const day = date.getDate();
      const year = date.getFullYear();
      // const hours = date.getHours() > 12 ? date.getHours() - 12 : date.getHours();
      // const minutes = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes();
      // const amPm = date.getHours() >= 12 ? 'PM' : 'AM';
      const formattedDate = `${month} ${day}, ${year}  `;
      return formattedDate;
    }
    
    const formattedDate = formatDate(createdOn);
    setFormattedDate(formattedDate)
  }, [createdOn])

  return (
    <div>
     <div className='flex items-center px-4 w-[71.5rem] h-16'>
            <div className='w-[19.5rem]'>
              <h1>{transactionID}</h1>
            </div>
            <div className='w-[22rem]'>
              <h1>NGN {slicedAmount}</h1>
            </div>
            <div className='w-[18.4rem]'>
              <h1 className='capitalize'>{type}</h1>
            </div>
            <div className='w-[24rem]'>
              <h1>{formattedDate}</h1>
            </div>
            {/* <div className='w-[21.65rem]'>
                <div className='flex items-center   w-[6.65rem] h-[1.71rem] rounded-lg '>
                    <h1 className={`${status == 'Successful' ? 'text-[#61A72C]' : 'text-[#FF9635]'} text-base font-WorkSans font-normal leading-4`}>{status}</h1>
                </div>
            </div> */}
        </div>
    </div>
  )
}

export default TransactionTable