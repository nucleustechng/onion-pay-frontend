import ButtonIcon from '../../Buttons/ButtonIcon'
import ButtonRegular from '../../Buttons/ButtonRegular'
import Input from '../../Input'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Image from 'next/image'
import React from 'react'
import InfoIcon  from '../../../Assets/img/contact/InfoIcon.svg'


const AccountSect = () => {
  return (
    <div>
        <div className='inline-flex lg:hidden'>
        <div className='flex flex-col gap-[0.375rem]'>
                                        <h1 className='text-base text-primaryText font-WorkSans font-medium leading-5'>Select what you need help with</h1>
                                        <div className='flex items-center pl-2 w-[19.945rem] h-12 bg-[#E7EDFF] rounded-[0.313rem]'>
                                            <div className='flex items-center gap-[0.375rem]'>
                                                <div className='w-[0.375rem] h-[0.375rem] bg-primaryText rounded-full'/>
                                                <p className='text-base text-primaryText font-WorkSans font-normal leading-5 '>Need help setting up my account</p>
                                            </div>
                                        </div>
                                        <div className='flex flex-col gap-4 w-[19.945rem] h-auto mt-[0.375rem] rounded-[0.625rem] px-4 py-4 bg-[#F5F5F5]
                                        sm:w-[26rem] lg:w-[47.5rem]
                                        '>
                                            <Input label='Email' placeholder='example@email.com' 
                                            type='text' width='w-[17.945rem] sm:w-[23.94rem] lg:w-[44.5rem]  xl:w-[44.5rem]' height='h-[3.125rem]' textSize='text-sm'
                                            />
                                            <div className='flex items-center gap-2 lg:justify-start lg:gap-2'>
                                                <div className='h-11'>
                                                    <Image src={InfoIcon} alt='Info Icon'/>
                                                </div>
                                                <p className='w-[18.325rem] h-12 text-sm text-primaryText font-WorkSans font-normal
                                                sm:w-[24.4rem] lg:w-[40rem]
                                                '>Our customer care will send you an email shortly to help you with your issue</p>
                                            </div>
                                            <div className='lg:flex lg:justify-end '>
                                                <div className='flex lg:hidden'>
                                                    <ButtonRegular backgroundColor='bg-primary' color='text-white' 
                                                    width='w-[17.945rem] sm:w-[23.94rem] ' height='h-11' mainText='Submit' textSize='text-base'
                                                    />
                                                </div>
                                                <div className='hidden lg:flex'>
                                                    <ButtonIcon backgroundColor='bg-primary' color='text-white' 
                                                    width='lg:w-[8.21rem]' height='h-11' mainText='Submit' textSize='text-base'
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                            <div className='flex flex-col gap-[0.375rem]'>
                                                <div className='flex items-center pl-2 w-[19.945rem] h-12  rounded-[0.313rem]'>
                                                    <div className='flex items-center gap-[0.375rem]'>
                                                        <div className='w-[0.375rem] h-[0.375rem] bg-primaryText rounded-full'/>
                                                        <p className='text-base text-primaryText font-WorkSans font-normal leading-5 '>Problem adding a password</p>
                                                    </div>
                                                </div>
                                                <div className='flex items-center pl-2 w-[19.945rem] h-12  rounded-[0.313rem]'>
                                                    <div className='flex items-center gap-[0.375rem]'>
                                                        <div className='w-[0.375rem] h-[0.375rem] bg-primaryText rounded-full'/>
                                                        <p className='text-base text-primaryText font-WorkSans font-normal leading-5 '>Change password</p>
                                                    </div>
                                                </div>
                                                <div className='flex items-center pl-2 w-[19.945rem] h-12  rounded-[0.313rem]'>
                                                    <div className='flex items-center gap-3'>
                                                        <p className='text-base text-primaryText font-WorkSans font-normal leading-5 '>Dispute not included, add yours</p>
                                                        <FontAwesomeIcon icon={faPlus} className='text-xl text-primary'/>
                                                    </div>
                                                </div>
                                            </div>
                                    </div>
        </div>
        <div className='hidden  lg:inline-flex'>
                    <div className='flex  gap-3'>
                                <div>
                                        <h1 className='text-base text-primaryText font-WorkSans font-medium leading-5'>Select what you need help with</h1>
                                        <div className='flex items-center pl-2 w-[19rem] h-12 bg-[#E7EDFF] rounded-[0.313rem] mt-6'>
                                            <div className='flex items-center gap-[0.375rem]'>
                                                <div className='w-[0.375rem] h-[0.375rem] bg-primaryText rounded-full'/>
                                                <p className='text-base text-primaryText font-WorkSans font-normal leading-5 '>Need help setting up my account</p>
                                            </div>
                                        </div>
                                        <div className='flex flex-col gap-[0.375rem]'>
                                                <div className='flex items-center pl-2 w-[19rem] h-12  rounded-[0.313rem]'>
                                                    <div className='flex items-center gap-[0.375rem]'>
                                                        <div className='w-[0.375rem] h-[0.375rem] bg-primaryText rounded-full'/>
                                                        <p className='text-base text-primaryText font-WorkSans font-normal leading-5 '>Problem adding a password</p>
                                                    </div>
                                                </div>
                                                <div className='flex items-center pl-2 w-[19rem] h-12  rounded-[0.313rem]'>
                                                    <div className='flex items-center gap-[0.375rem]'>
                                                        <div className='w-[0.375rem] h-[0.375rem] bg-primaryText rounded-full'/>
                                                        <p className='text-base text-primaryText font-WorkSans font-normal leading-5 '>Change password</p>
                                                    </div>
                                                </div>
                                                <div className='flex items-center pl-2 w-[19rem] h-12  rounded-[0.313rem]'>
                                                    <div className='flex items-center gap-3'>
                                                        <p className='text-base text-primaryText font-WorkSans font-normal leading-5 '>Dispute not included, add yours</p>
                                                        <FontAwesomeIcon icon={faPlus} className='text-xl text-primary'/>
                                                    </div>
                                                </div>
                                            </div>
                                    </div>
                                </div>
                                {/* Form */}
                                <div className='ml-3'>
                                <div className='flex flex-col gap-4 w-[19.945rem] h-auto mt-[0.375rem] rounded-[0.625rem] px-4 py-4 bg-[#F5F5F5]
                                        sm:w-[26rem] lg:w-[39.5rem] xl:w-[49.4rem]
                                        '>
                                            <Input label='Email' placeholder='example@email.com' 
                                            type='text' width='w-[17.945rem] sm:w-[23.94rem] lg:w-[37.5rem]  xl:w-[47.5rem]' height='h-[3.125rem]' textSize='text-sm'
                                            />
                                            <div className='flex items-center gap-2 lg:justify-start lg:gap-2'>
                                                <div className='h-11'>
                                                    <Image src={InfoIcon} alt='Info Icon'/>
                                                </div>
                                                <p className='w-[18.325rem] h-12 text-sm text-primaryText font-WorkSans font-normal
                                                sm:w-[24.4rem] lg:w-[40rem]
                                                '>Our customer care will send you an email shortly to help you with your issue</p>
                                            </div>
                                            <div className='lg:flex lg:justify-end '>
                                                <div className='flex lg:hidden'>
                                                    <ButtonRegular backgroundColor='bg-primary' color='text-white' 
                                                    width='w-[17.945rem] sm:w-[23.94rem] ' height='h-11' mainText='Submit' textSize='text-base'
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
    </div>
  )
}

export default AccountSect