import CopyIcon from '../../Assets/icon/CopyIcon.svg'
import Image from 'next/image';
import React from 'react'
import { ToastContainer ,toast } from 'react-toastify';

interface Props  {
    paymentLink:string,
    pageName:string,
    amount:number,
    description?:string,
    pageId:string
    
}

const PaymentTable = ({paymentLink,amount,pageId,pageName,description}: Props) => {
  

  const copyToClipboard = (copyItem:any) => {
    navigator.clipboard.writeText(copyItem);
   toast.success('Copied!!',{autoClose:100,})
  };

  return (
    <div>
        <ToastContainer/>
         <div className='flex items-center  rounded-[0.32rem] w-[71.5rem] h-[3.75rem] '>
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
                className="w-[17.5rem] flex gap-2 items-center "
            >
                <p className="flex-grow ">{paymentLink}</p>
                <div className='cursor-pointer' onClick={() => copyToClipboard(paymentLink)}>
                    <Image src={CopyIcon} alt=''/> 
                </div>
            </div>
            </div>
        </div>
    </div>
  )
}

export default PaymentTable