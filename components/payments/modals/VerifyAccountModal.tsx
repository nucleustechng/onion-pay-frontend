import Image from 'next/image'
import React from 'react'
import CloseIcon from '../../../Assets/icon/CloseIcon.svg'
import Verify from '../../../Assets/img/VerifyAccount.svg'

interface Props {
    isVisible:boolean
    onClose:()=>{}
}

const VerifyAccountModal = ({isVisible,onClose}: Props) => {
    const handleClose = (e:any) =>{
        if(e.target.id === 'wrapper'){
            onClose()                                                   
        }
      }
      if (!isVisible) return null;
  return (
    <div>
        <div className='fixed inset-0 bg-[#262626] bg-opacity-50 backdrop-blur-[0.05rem] z-20 flex justify-center items-center' id='wrapper' onClick={handleClose}>
            <div className='w-[25rem] h-[23.2rem] rounded-[0.63rem] bg-white'>
                <div className='mx-6 mt-6'>
                    <div className='relative flex justify-center items-center'>
                        <h1 className='text-xl text-[#1B1A1A] font-WorkSans font-semibold leading-5'>Verify your account</h1>
                        <div className='absolute left-[20rem] cursor-pointer right-0' onClick={()=>{
                            onClose()
                        }}>
                            <Image src={CloseIcon} alt='Close Icon'/>
                        </div>
                    </div>
                    <div className='flex justify-center mt-10'>
                        <Image src={Verify} alt="Verify account"/>
                    </div>
                    <div className='flex flex-col gap-3 mt-6'>
                        <p className='text-base text-[#1B1A1A] text-center font-WorkSans font-normal leading-5'>Hello, In order to successfully withdraw payments from your transactions, you will need to verify your account.
                        </p>
                        <p className='text-base text-[#1B1A1A] text-center font-WorkSans font-normal leading-5'>
                        Verifying your account helps us ensure that your identity and money are kept safe and secure.</p>
                    </div>
                    <div className='flex justify-center mt-6'>
                        <button className='w-[11.44rem] h-11 bg-[#3063E9] rounded-[0.313rem] text-base text-white font-WorkSans font-normal leading-5' >
                        Verify account now
                        </button>
                    </div>
                </div>
            </div>
        </div>  
    </div>
  )
}

export default VerifyAccountModal