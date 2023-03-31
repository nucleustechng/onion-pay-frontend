import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import ButtonIcon from '../components/Buttons/ButtonIcon'
import SendmoneyImg from '../Assets/img/sendmoney/Sendmoney.svg'
import CurvedArrow from '../Assets/img/sendmoney/CurvedArrow.svg'




const Sendmoney = () => {
  return (
    <div className='relative'>
        <div className='hidden lg:absolute xl:left-[43rem] xl:bottom-[22rem]'>
            <Image src={CurvedArrow} alt='Curved arrow'/>
        </div>
           <div className='h-[30rem] md:h-[50rem] mt-32'>
            <div  className='lg:flex lg:justify-between '>
                <div className='flex flex-col gap-6  w-[22rem] md:w-[35rem] mx-4 md:pt-32 md:ml-[5rem] lg:ml-[4rem] xl:ml-[9.375rem]'>
                    <h1 className='text-[3.2rem] md:text-[5rem]
                    text-[#303778] font-SpaceGrotesk 
                    font-bold leading-[3.5rem] md:leading-[5rem]'>Send money to <span className='text-[#FF9635]'>anyone</span> or <span className='text-[#FF9635]'>any business<span className='italic'>!</span></span></h1>
                    <p className='w-[22rem] md:w-[35rem] h-[1.875rem] text-lg  md:text-2xl text-[#1B1A1A] font-WorkSans font-normal  leading-[1.875rem]'>Make single or bulk transfers to bank accounts from your Onion Pay dashboard.</p>
                    <Link href='/auth/signup' className='mt-16 md:mt-8' >
                        <ButtonIcon width='w-[10.2rem]' height='h-11' mainText='Get started' backgroundColor='bg-primary' color='text-white' textSize='text-base'/>
                    </Link>
                </div>
                <div className='hidden lg:flex lg:items-center'>
                    <Image src={SendmoneyImg} alt='Collect Payments Illustration'/>
                </div>

            </div>

        </div>
    </div>
  )
}

export default Sendmoney