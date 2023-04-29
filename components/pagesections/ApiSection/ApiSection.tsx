import ButtonRegular from '../../Buttons/ButtonRegular'
import Image from 'next/image'
import React from 'react'
import BackgroundArrows from '../../../Assets/img/apisection/BackgroundArrows.svg'
import L_BackgroundArrows from '../../../Assets/img/apisection/L-BackgroundArrows.svg'
import Link from 'next/link'



const ApiSection = () => {
  return (
    <div>
        <div className='flex justify-center mb-6 md:mb-12 md:pt-10'>
            <div className='w-full md:w-[35rem] lg:w-[54.2rem] flex flex-col items-center gap-4'>
                <h2 className='text-xl text-white font-WorkSans font-normal leading-[1.625rem] md:text-[3.375rem] lg:text-[4.5rem] text-center'>
                Easy-to-use
                </h2>
                <h1 className='text-5xl text-[#FF9635] font-SpaceGrotesk font-bold leading-none text-center md:text-[5.625rem] lg:text-[7.5rem]'>
                APIs for developers
                </h1>
            </div>
            </div>
            <div className='flex justify-center'>
            <div className='w-full md:w-[35rem] lg:w-[54.2rem]'>
                <p className='text-white text-base font-WorkSans font-normal leading-5 text-center'>
                Your team can easily integrate with our APIs and access multiple payment functionalities.
                </p>
            </div>
            </div>
            <div className='w-full flex justify-center md:hidden'>
            <Image src={BackgroundArrows} loading='lazy' alt='' className='w-screen'/>
            </div>
            <div className='hidden md:block w-full'>
            <Image src={L_BackgroundArrows} loading='lazy' alt='' className='w-screen'/>
            </div>
            <Link href='https://ultra-organization.gitbook.io/onion-pay' className='flex justify-center mt-8 md:mt-[3rem] xl:mt-[5rem] pb-10 md:pb-[7rem] xl:pb-[9.375rem]'>
            <ButtonRegular width='w-[11.94rem]' height='h-11' backgroundColor='bg-primary' color='text-white' mainText='Read the API docs' textSize='text-base' />
            </Link>
    </div>
  )
}

export default ApiSection