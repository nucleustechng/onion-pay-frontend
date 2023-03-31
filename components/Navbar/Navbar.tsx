import Image from 'next/image'
import React, { useState } from 'react'
import Logo from '../../Assets/logo/Logo.svg'
import Hamburger from '../../Assets/icons/Hamburger.svg'
import PaymentItem from './NavbarItems/PaymentItem'
import CommerceItem from './NavbarItems/CommerceItem'
import ContactItem from './NavbarItems/ContactItem'
import DevelopersItem from './NavbarItems/DeveloperItem'
import ButtonRegular from '../Buttons/ButtonRegular'
import CloseIcon from '../../Assets/icons/CloseIcon.svg'
import ButtonIcon from '../Buttons/ButtonIcon'
import Link from 'next/link'


const Navbar = () => {
  const [toggleNav,setToggleNav] = useState<boolean>(false);
  const linkItems = [
    {title:'Payment',link:'/collect-payments'}
    ,{title:'Commerce',link:'/'}, 
    {title:'Developer',link:'https://ultra-organization.gitbook.io/onion-pay'}
  ]

  return (
    <div>
        <div>
            <div className=''>
            <div className={`
                  px-5 overflow-y-scroll w-screen bg-white fixed inset-0 h-full z-50 transition-all duration-500
                  ${toggleNav ? 'right-20' : 'left-[30.65rem] min-[492px]:left-[45rem] sm:left-[50rem] md:left-[65rem] lg:left-[85rem] xl:left-[95rem] min-[280px]:left-[25rem] min-[412px]:left-[30rem]'}
                `}
              >
                <div className="flex justify-end mt-[1.875rem] cursor-pointer" onClick={() => setToggleNav(!toggleNav)}>
                  <Image src={CloseIcon} alt="Close Icon" />
                </div>

                {/* CTA buttons */}
                <div className="flex flex-col gap-6 mt-[1.875rem]">
                  <Link href='/auth/signin' className="flex justify-center">
                    <ButtonRegular
                      width="w-40"
                      height="h-11"
                      textSize="text-base"
                      backgroundColor="bg-white"
                      borderColor="border-primary"
                      borderWidth="border-[0.0625rem]"
                      color="text-primaryText"
                      mainText="Sign in"
                    />
                  </Link>
                  <Link href='/auth/signup' className="flex justify-center">
                    <ButtonRegular
                      width="w-40"
                      height="h-11"
                      textSize="text-base"
                      backgroundColor="bg-primary"
                      color="text-white"
                      mainText="Get started"
                    />
                  </Link>
                </div>

                <hr className="w-auto h-0 mt-6 border-[0.0625rem] border-[#CACACA]" />

                <div className="flex flex-col mt-5 pb-11">
                  <PaymentItem />
                  <hr className="w-auto h-0 mt-6 mb-5 border-[0.0625rem] border-[#CACACA]" />
                  <CommerceItem />
                  <hr className="w-auto h-0 mt-6 mb-5 border-[0.0625rem] border-[#CACACA]" />
                  <ContactItem />
                  <hr className="w-auto h-0 mt-6 mb-5 border-[0.0625rem] border-[#CACACA]" />
                  <DevelopersItem />
                </div>
              </div>
            </div>
            {/* Closed state */}
            <div className='fixed left-0 right-0 top-0 z-30'>
              <div className='flex justify-between px-5 items-center h-[4.375rem] pt-[1.875rem] pb-[0.625rem] bg-[#F5F5F5] lg:px-28 xl:px-[9.375rem] xl:h-[5.75rem]'>
                <Link href='/' className='cursor-pointer'>
                  <Image src={Logo} alt='Logo' />
                </Link>
                <ul className='hidden lg:flex items-center justify-between w-[20rem]'>
                  {linkItems.map((item) => (
                    <Link href={item.link} key={item.title}><li key={item.title} className='text-sm text-primaryText font-WorkSans font-medium leading-4 cursor-pointer'>
                      {item.title}
                    </li></Link>
                  ))}
                  <Link href='/contact'>
                    <li className='text-sm text-primaryText font-WorkSans font-medium leading-4 cursor-pointer'>Contact</li>
                  </Link>
                </ul>
                <div className='hidden lg:flex justify-between items-center w-[16rem]'>
                  <Link href='/auth/signin'>
                    <ButtonRegular
                      width='w-[5.875rem]'
                      height='h-11'
                      textSize='text-base'
                      backgroundColor='bg-white cursor-pointer'
                      borderColor='border-primary'
                      borderWidth='border-[0.0625rem]'
                      color='text-primaryText'
                      mainText='Sign in'
                    />
                  </Link>
                  <Link href='/auth/signup'>
                    <ButtonIcon
                      width='w-[9.5rem]'
                      height='h-11'
                      backgroundColor='bg-primary cursor-pointer'
                      color='text-white'
                      mainText='Get started'
                    />
                  </Link>
                </div>
                <div className='flex items-center cursor-pointer lg:hidden' onClick={() => setToggleNav(!toggleNav)}>
                  <Image src={Hamburger} alt='Hamburger Icon' />
                </div>
              </div>
            </div>
        </div>
    </div>
  )
}

export default Navbar