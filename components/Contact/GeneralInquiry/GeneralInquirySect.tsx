import ButtonIcon from '../../Buttons/ButtonIcon'
import ButtonRegular from '../../Buttons/ButtonRegular'
import Input from '../../Input'
import Image from 'next/image'
import React from 'react'
import InfoIcon  from '../../../Assets/img/contact/InfoIcon.svg'



const GeneralInquirySect = () => {
  return (
    <div>
        <div>
        <div className='flex flex-col gap-4'>
                                    <Input label='Email' placeholder='example@email.com' 
                                    type='text' width='w-[19.94rem] sm:w-[25.94rem] lg:w-[59.3rem]  xl:w-[69rem]' height='h-[3.125rem]' textSize='text-sm'
                                    />
                                    <div className='flex flex-col gap-[0.375rem]'>
                                        <h1 className='text-sm text-primaryText font-WorkSans font-normal leading-4'>How may we help you?</h1>
                                        <textarea className='w-[19.94rem] h-[9.375rem] text-sm text-[#898989] font-WorkSans font-normal leading-4 p-6 rounded-[0.313rem] border-[0.0625rem] border-[#CACACA]
                                        sm:w-[25.94rem] lg:w-[59.3rem] xl:w-[69rem]
                                        ' />
                                    </div>
                                    <div className='flex  items-center justify-between lg:justify-start lg:gap-2'>
                                        <div>
                                            <Image src={InfoIcon} alt='Info Icon'/>
                                        </div>
                                        <p className='w-[18.325rem] text-sm text-primaryText font-WorkSans font-normal
                                        sm:w-[24.4rem] lg:w-[40rem]
                                        '>Our customer care will send you an email shortly to help you with your issue</p>
                                    </div>
                                    <div className='lg:flex lg:justify-end '>
                                        <div className='flex lg:hidden'>
                                            <ButtonRegular backgroundColor='bg-primary' color='text-white' 
                                            width='w-[19.95rem] sm:w-[25.94rem] ' height='h-11' mainText='Submit' textSize='text-base'
                                            />
                                        </div>
                                        <div className='hidden lg:flex'>
                                            <ButtonIcon backgroundColor='bg-primary' color='text-white' 
                                            width='lg:w-[8.21rem]' height='h-11' mainText='Submit' textSize='text-base'
                                            />
                                        </div>
                                    </div>
                                </div>
        </div>
    </div>
  )
}

export default GeneralInquirySect