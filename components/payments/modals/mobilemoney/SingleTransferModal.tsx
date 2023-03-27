import { faCircle } from '@fortawesome/free-regular-svg-icons'
import { faCheckCircle, faChevronLeft } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Image from 'next/image'
import React, { useState } from 'react'
import MultipleTransferType from '../../../../Assets/img/MultipleTransferType.svg'
import SingleTransferType from '../../../../Assets/img/SingleTransferType.svg'
import CloseIcon from '../../../../Assets/icon/CloseIcon.svg'


interface Props {
    isVisible:boolean
    onClose:()=>{}
}

const SingleTransferModal = ({isVisible,onClose}: Props) => {
    const [active,setActive] = useState<number>();

    const handleActive = (activeTab:number) =>{
        active === activeTab ? setActive(0) : setActive(activeTab)
    };
    const handleClose = (e:any) =>{
        if(e.target.id === 'wrapper'){
            onClose()                                                   
        }
    };
  

      if (!isVisible) return null;
  return (
    <div>
         <div className='fixed inset-0 bg-[#262626] bg-opacity-50 backdrop-blur-[0.05rem] flex justify-center items-center' id='wrapper' onClick={handleClose}>
            <div className='w-[37.01rem] h-[35.54rem] rounded-[0.63rem] bg-white'>
                <div className='mx-5 my-6'>
                    <div className='flex items-center justify-between'>
                        <div className='flex items-center gap-3'>
                            <FontAwesomeIcon icon={faChevronLeft} className='cursor-pointer'/>
                            <h1 className='text-lg text-[#262626] font-WorkSans font-semibold leading-5'>Transfer to Mobile Money account</h1>
                        </div>
                        <div>
                            <Image src={CloseIcon} className='cursor-pointer' onClick={()=>{
                            onClose()
                            }} alt='Close Icon'/> 
                        </div>
                    </div>
                    <div className='mt-6'>
                        <h1 className='text-xl text-[#262626] text-center font-WorkSans font-semibold leading-6'>Select a transfer type to continue</h1>
                    </div>
                    <div className='flex items-center gap-4 mt-6'>
                    {/* First payment link select */}
                        <div className={`flex flex-col  w-[16.63rem] h-[22.3rem] border-[0.065rem] border-solid cursor-pointer ${active === 1 ? 'border-[#3063E9]' : 'border-[#CACACA]'} rounded-[0.32rem] px-6 py-6`} 
                           onClick={()=>{
                            handleActive(1)
                        }}
                        >
                            <div className='flex justify-end'>
                            {active === 1 ? <FontAwesomeIcon icon={faCheckCircle} className='text-3xl  text-[#3063E9]'/> : <FontAwesomeIcon icon={faCircle} className='text-3xl  text-[#CACACA]'/>} 
                            </div>
                            <div className='flex justify-center h-28 mt-4 mb-4'>
                                <Image src={SingleTransferType} alt='Single transfer image'/>
                            </div>
                            <div className='flex flex-col gap-4 items-center '>
                                <h1 className='text-xl text-center text-[#262626] font-WorkSans font-semibold leading-5'>Transfer to an individual</h1>
                                <p className=' text-base text-center text-[#262626] font-WorkSans font-normal leading-5'>This type of transfer allows you to send money to one Mobile Money account at a time.</p>
                            </div>
                        </div>

                         {/* second payment link select */}
                         <div className={`flex flex-col  w-[16.63rem] h-[22.3rem] border-[0.065rem] border-solid cursor-pointer ${active === 2 ? 'border-[#3063E9]' : 'border-[#CACACA]'} rounded-[0.32rem] px-6 py-6`}
                             onClick={()=>{
                                handleActive(2)
                            }}
                         >
                            <div className='flex justify-end'>
                            {active === 2 ? <FontAwesomeIcon icon={faCheckCircle} className='text-3xl  text-[#3063E9]'/> : <FontAwesomeIcon icon={faCircle} className='text-3xl  text-[#CACACA]'/>} 
                            </div>
                            <div className='flex justify-center h-28 mt-4 mb-4'>
                                <Image src={MultipleTransferType} alt='Multiple transfer image'/>
                            </div>
                            <div className='flex flex-col gap-4 items-center'>
                                <h1 className='text-xl text-center text-[#262626] font-WorkSans font-semibold leading-5'>Transfer to multiple people</h1>
                                <p className=' text-base text-center text-[#262626] font-WorkSans font-normal leading-5'>This type of transfer allows you to send money to multiple Mobile Money accounts at the same time..</p>
                            </div>
                        </div>
                    </div>
                    <div className='flex justify-end mt-6'>
                        <button className='w-[8.71rem] h-11 bg-[#3063E9] rounded-[0.313rem] text-base text-white font-WorkSans font-normal leading-5'>
                        Start transfer
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default SingleTransferModal