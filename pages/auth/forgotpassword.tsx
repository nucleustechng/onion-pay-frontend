import ButtonIcon from '@/components/Buttons/ButtonIcon'
import ButtonRegular from '@/components/Buttons/ButtonRegular'
import Footer from '@/components/Footer/Footer'
import Input from '@/components/Input'
import CommerceItem from '@/components/Navbar/NavbarItems/CommerceItem'
import ContactItem from '@/components/Navbar/NavbarItems/ContactItem'
import DevelopersItem from '@/components/Navbar/NavbarItems/DeveloperItem'
import PaymentItem from '@/components/Navbar/NavbarItems/PaymentItem'
import CloseIcon from '../../assets/icons/CloseIcon.svg'
import Logo from '../../assets/logo/Logo.svg'
import Hamburger from '../../assets/icons/Hamburger.svg'
import Image from 'next/image'
import Link from 'next/link'
import React, { useState } from 'react'

type Props = {}

const forgotpassword = (props: Props) => {
  const [toggleNav,setToggleNav] = useState<boolean>(false);

  return (
    <div>
         <div>
        <div>
            <div className=''>
              <div  className={`px-5 overflow-y-scroll w-screen   bg-[#F5F5F5] fixed inset-0 h-full z-50 transition-all duration-500
              ${toggleNav ? "right-20" : "left-[30.65rem] min-[492px]:left-[45rem] sm:left-[50rem] md:left-[65rem] lg:left-[85rem] xl:left-[95rem] min-[280px]:left-[25rem] min-[412px]:left-[30rem]"}`}>
                    <div className='flex justify-end mt-[1.875rem] cursor-pointer' onClick={() => setToggleNav(!toggleNav)}>
                        <Image src={CloseIcon} alt='Close Icon'/>
                    </div>
                    {/* CTA buttons */}
                    <div className='flex flex-col gap-6 mt-[1.875rem]'>
                        <Link href='/auth/signin' className='flex justify-center'>
                            <ButtonRegular 
                            width='w-40' 
                            height='h-11' 
                            textSize='text-base' 
                            backgroundColor='bg-white' 
                            borderColor='border-primary' 
                            borderWidth='border-[0.0625rem]' 
                            color='text-primaryText' 
                            mainText='Sign in'/>
                        </Link>
                        <Link  href='/auth/signup' className='flex justify-center'>
                            <ButtonRegular 
                            width='w-40' 
                            height='h-11' 
                            textSize='text-base'
                            backgroundColor='bg-primary' 
                            color='text-white' 
                            mainText='Get started'/>
                        </Link>
                    </div>
                    <hr className='w-auto h-0 mt-6 border-[0.0625rem] border-[#CACACA]' />
                    <div className='flex flex-col mt-5 pb-11'>
                        <PaymentItem/>
                        <hr className='w-auto h-0 mt-6 mb-5 border-[0.0625rem] border-[#CACACA]' />
                        <CommerceItem/>
                        <hr className='w-auto h-0 mt-6 mb-5 border-[0.0625rem] border-[#CACACA]' />
                        <ContactItem/>
                        <hr className='w-auto h-0 mt-6 mb-5 border-[0.0625rem] border-[#CACACA]' />
                        <DevelopersItem/>
                    </div>
                </div>
            </div>
            {/* Closed state */}
            <div className='fixed left-0 right-0 top-0  z-30'>
                  <div className='flex justify-between px-5  items-center h-[4.375rem] pt-[1.875rem] pb-[0.625rem] 
                  bg-[#F5F5F5]
                  lg:px-28 xl:px-[9.375rem] xl:h-[5.75rem] 
                  '>
                    <Link href='/' className='cursor-pointer'>
                      <Image src={Logo} alt='Logo'/>
                    </Link>
                    
                    <div className='hidden lg:flex justify-between items-center w-[16rem]'>
                            <Link href='/auth/signin'>
                                <ButtonRegular 
                                width=' w-[5.875rem]' 
                                height='h-11' 
                                textSize='text-base' 
                                backgroundColor='bg-white cursor-pointer' 
                                borderColor='border-primary' 
                                borderWidth='border-[0.0625rem]' 
                                color='text-primaryText' mainText='Sign in'/>
                            </Link>
                            <Link  href='/auth/signup'>
                                <ButtonIcon 
                                width='w-[9.5rem]' 
                                height='h-11' 
                                backgroundColor='bg-primary cursor-pointer' 
                                color='text-white' 
                                mainText='Get started'/>
                            </Link>
                    </div>
                    <div className='flex items-center cursor-pointer lg:hidden' onClick={() => setToggleNav(!toggleNav)}>
                      <Image src={Hamburger} alt='Hamburger Icon'/>
                    </div>
                  </div>
            </div>
        </div>
        </div>
        <div className='flex  justify-center mb-[5rem] lg:mb-[16rem] '>
            <div className= 'flex flex-col pt-32 lg:pb-20'>
                <div className='flex flex-col gap-10'>
                    <h1 className='w-[21.875rem] sm:w-[25rem] xl:w-[70rem]  text-center text-[#303778] text-5xl font-SpaceGrotesk font-bold leading-[3.375rem]
                    lg:w-[60rem] lg:text-[5.625rem] lg:leading-[5.625rem]
                    '>Welcome<span className='text-[#FF9635]'>!</span></h1>
                    <h2 className='text-lg text-center text-[#1B1A1A] font-WorkSans font-normal leading-5'>Fill in your Sign in details below</h2>
                </div>
                <div className='flex justify-center mt-10 '>
                    <div className='flex flex-col gap-6'>
                        <Input width='w-[21.875rem] lg:w-[25rem] xl:w-[30rem]' height='h-[3.125rem]' 
                        label='Email' textSize='text-sm' placeholder='example@email.com'
                        type='email'
                        />
                        <div>
                         <Input width='w-[21.875rem] lg:w-[25rem] xl:w-[30rem]' height='h-[3.125rem]' 
                        label='Password' textSize='text-sm' placeholder='Password'
                        type='password'
                        />
                        <div>
                            <h1 className='cursor-pointer text-sm text-right font-WorkSans font-normal leading-4 text-primary mt-2'>Forgot password</h1>
                        </div> 
                        </div>
                        <div className='mt-4'>
                            <ButtonRegular width='w-[21.875rem] lg:w-[25rem] xl:w-[30rem]' height='h-11'
                            backgroundColor='bg-primary' borderWidth='0.313rem'
                            color='text-white' mainText='Continue'  textSize='text-base'
                            />
                        </div>
                    </div>
                    
                </div>
            </div>
        </div>
      
        <div className='relative z-20'>
            <Footer/>
        </div>
    </div>
  )
}

export default forgotpassword