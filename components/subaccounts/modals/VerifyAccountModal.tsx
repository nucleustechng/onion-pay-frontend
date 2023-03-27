import Image from 'next/image';
import React, { useState } from 'react'
import CloseIcon from '../../../Assets/icon/CloseIcon.svg'
import IndividualBusiness from '../../../Assets/illustrations/IndividualBusiness.svg'
import CooperateBusiness from '../../../Assets/illustrations/CooperateBusiness.svg'



interface Props {
    isVisible:boolean
    onClose:()=>{}
  }

const VerifyAccountModal = ({isVisible,onClose}: Props) => {
    const [tab,setTab] = useState<number>();
    const handleClose = (e:any) =>{
        if(e.target.id === 'wrapper'){
            onClose()                                                   
        }
      };
    
    
      if (!isVisible) return null;
  return (
    <div>
        <div className='fixed inset-0 bg-[#262626] bg-opacity-50 backdrop-blur-[0.05rem] flex justify-center items-center' id='wrapper' onClick={handleClose}>
            <div className='w-[35.25rem] h-[30.25rem] rounded-[0.63rem] bg-white'>
                <div className='flex flex-col mx-6 mt-6'>
                    <div className='flex items-center justify-between'>
                        <h1 className='text-[#1B1A1A] text-lg font-semibold font-WorkSans leading-5'>Verify your account</h1>
                        <div>
                            <Image src={CloseIcon} alt='Close Icon'/>
                        </div>
                    </div>

                    <div className='mt-7'>
                        <div className='flex items-center gap-[3.82rem]'>
                            <div className='flex items-center justify-center w-[5.32rem] h-5 rounded-[1.25rem] border-primary border-[0.065rem] '>
                                <h1 className='text-primary text-sm font-WorkSans font-normal leading-4 '>Step 1 of 2</h1>
                            </div>
                            <h1>Select your type of business</h1>
                        </div>
                        <div  className='flex items-center justify-between mt-6'>
                            <div onClick={() => setTab(1)} className={` cursor-pointer pt-7 w-[15.63rem] h-[21.2rem] border-[0.065rem] rounded-[0.313rem] ${tab == 1 ? 'border-primary' : 'border-[#CACACA]'}`}>
                                <div className='flex flex-col'>
                                    <div className='flex justify-center'>
                                        <Image src={IndividualBusiness} alt='Individual Business Illustration'/>
                                    </div>
                                    <div className='px-6 mt-6'>
                                        <h1 className='text-center text-xl text-[#1B1A1A] font-WorkSans font-medium leading-5 mb-4'>Individual Business</h1>
                                        <p className='text-center text-sm text-[#1B1A1A] font-WorkSans font-normal'>{`This type of business is owned by a single individual and it’s activities are carried out by only one person.`}</p>
                                    </div>
                                </div>
                            </div>
                            
                            <div onClick={() => setTab(2)} className={` cursor-pointer pt-7 w-[15.63rem] h-[21.2rem] border-[0.065rem] rounded-[0.313rem] ${tab == 2 ? 'border-primary' : 'border-[#CACACA]'}`}>
                                <div className='flex flex-col'>
                                    <div className='flex justify-center'>
                                        <Image src={CooperateBusiness} alt='Individual Business Illustration'/>
                                    </div>
                                    <div className='px-6 mt-6'>
                                        <h1 className='text-center text-xl text-[#1B1A1A] font-WorkSans font-medium leading-5 mb-4'>Individual Business</h1>
                                        <p className='text-center text-sm text-[#1B1A1A] font-WorkSans font-normal'>{`This type of business is owned by a single individual and it’s activities are carried out by only one person.`}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default VerifyAccountModal