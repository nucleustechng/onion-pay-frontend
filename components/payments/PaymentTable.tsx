import { faCopy } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react'

interface Props  {
    paymentLink:string,
    pageName:string,
    amount:number,
    description?:string,
    pageId:string
    
}

const PaymentTable = ({paymentLink,amount,pageId,pageName,description}: Props) => {
  
    const [showPop, setShowPop] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(paymentLink);
    setShowPop(true);
    setTimeout(() => {
      setShowPop(false);
    }, 2000);
  };

  return (
    <div>
         <div className='flex items-center px-4 rounded-[0.32rem] w-[71.5rem] h-[3.75rem] '>
            <div className='w-[14.25rem]'>
                <h1 className='text-base text-[#262626] font-WorkSans font-normal leading-[1.2rem]'>{pageName}</h1>
            </div>
            <div className='w-[12.3rem]'>
                <h1 className='text-base text-[#262626] font-WorkSans font-normal leading-[1.2rem]'>{amount}</h1>
            </div>
            <div className='w-[10.3rem]'>
                <h1 className='text-base text-[#262626] font-WorkSans font-normal leading-[1.2rem]'>{pageId}</h1>
            </div>
            <div className='w-[14.3rem]'>
                <h1 className='text-base text-[#262626] font-WorkSans font-normal leading-[1.2rem]'>{description}</h1>
            </div>
            <div className="w-[14.3rem] relative">
            <div
                className="bg-gray-200 rounded p-2 flex items-center"
            >
                <p className="flex-grow ">{paymentLink}</p>
                <button
                className="bg-gray-700 text-white px-2 py-1 rounded mt-1 ml-2"
                onClick={copyToClipboard}
                >
                <FontAwesomeIcon icon={faCopy} className='text-primary' />
                </button>
                {showPop && (
                <div className="absolute bg-primary text-white px-2 py-1 rounded mt-1 right-0">
                    Copied to clipboard!
                </div>
                )}
            </div>
            </div>
        </div>
    </div>
  )
}

export default PaymentTable