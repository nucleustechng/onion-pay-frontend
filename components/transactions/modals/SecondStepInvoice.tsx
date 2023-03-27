import { faChevronDown, faChevronLeft } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Image from 'next/image'
import React from 'react'
import Input from '../../input fields/Input'
import CloseIcon from '../../../Assets/icon/CloseIcon.svg'

interface Props {
    isVisible:boolean
    onClose:()=>{}
}

const SecondStepInvoice = ({isVisible,onClose}: Props) => {
    
      const handleClose = (e:any) =>{
        if(e.target.id === 'wrapper'){
            onClose()                                                   
        }
      }
      if (!isVisible) return null;
  return (
    <div>
        <div className='fixed inset-0 bg-[#262626] bg-opacity-50 backdrop-blur-[0.05rem] z-40 flex justify-center items-center overflow-x-scroll' id='wrapper' onClick={handleClose}>
            <div className='w-[22.5rem] md:w-[27rem] lg:w-[33rem] h-[49.5rem] mt-32 mb-6 rounded-[0.63rem] bg-white'>
                <div className='mx-4 lg:mx-6 mt-7'>
                    <div className='flex items-center justify-between'>
                        <div className='flex items-center gap-2'>
                            <FontAwesomeIcon icon={faChevronLeft}/>
                            <h1 className='text-[#262626] text-lg leading-5 font-WorkSans font-medium'>Create an invoice</h1>
                        </div>
                        <div>
                            <Image src={CloseIcon} className='cursor-pointer' onClick={()=>{
                            onClose()
                        }}  alt="Close Icon"/>
                        </div>
                    </div>
                    <div className='flex items-center gap-4 lg:gap-[4.15rem] mt-8'>
                        <div className='flex justify-center items-center w-[5.32rem] h-5 border-solid border-[0.07rem] border-[#3063E9] rounded-[1.25rem]'>
                            <h1 className='text-[#3063E9] text-sm font-WorkSans font-normal leading-4'>Step 2 of 3</h1>
                        </div>
                        <div>
                            <h1 className='text-base lg:text-lg text-[#262626] font-WorkSans font-medium leading-5'>Your customer information</h1>
                        </div>
                    </div>
                    <div className='flex flex-col gap-6 mt-6 '>
                        <Input width='w-[20.5rem] md:w-[25rem] lg:w-[30rem]' type='text' label='Customer name' placeholder='Enter an existing customer name'/>
                        <Input width='w-[20.5rem] md:w-[25rem] lg:w-[30rem]' type='email' label='Email address' placeholder='email@example.com'/>
                        <Input width='w-[20.5rem] md:w-[25rem] lg:w-[30rem]' type='text' label='Billing address' placeholder='0.00'/>
                        <div className='flex gap-[0.38rem] items-center'>
                            <Input width='w-[10.1rem] md:w-[12.25rem] lg:w-[14.82rem]' type='text' label='City' placeholder='Wuse 2'/>
                            <Input width='w-[10.1rem] md:w-[12.25rem] lg:w-[14.82rem]' horizontalPadding='px-6' type='number' label='Zip code' placeholder='675432'/>
                        </div>
                        <div className='flex flex-col gap-6'>
                        <div className='flex flex-col gap-2'>
                            <h1 className='text-[#262626] text-sm font-WorkSans font-normal leading-4'>Country</h1>
                            <div className='flex items-center justify-between px-6  w-[20.5rem] md:w-[25rem] lg:w-[30rem] h-[3.13rem] border-solid border-[#CACACA] border-[0.063rem] rounded-[0.32rem]'>
                                <h1 className='text-sm text-[#1B1A1A] font-WorkSans font-normal leading-4'>Nigeria</h1>
                                <FontAwesomeIcon icon={faChevronDown}/>
                            </div>
                        </div>
                        <div className='flex flex-col gap-2'>
                            <h1 className='text-[#262626] text-sm font-WorkSans font-normal leading-4'>State</h1>
                            <div className='flex items-center justify-end px-6 w-[20.5rem] md:w-[25rem] lg:w-[30rem] h-[3.13rem] border-solid border-[#CACACA] border-[0.063rem] rounded-[0.32rem]'>
                                <FontAwesomeIcon icon={faChevronDown}/>
                            </div>
                        </div>
                        <div className='flex items-center justify-end gap-4 mt-2'>
                            <button className='flex items-center justify-center w-[5.4rem] h-11 bg-[#F5F5F5] rounded-[0.313rem] text-base text-[#262626] font-WorkSans font-normal leading-5'>
                            Cancel
                            </button>
                            <button className='w-[6.5rem] h-11 bg-[#3063E9] rounded-[0.313rem] text-base text-white font-WorkSans font-normal leading-5'>
                            Continue
                            </button>
                        </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default SecondStepInvoice