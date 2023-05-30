import Image from 'next/image'
import MoneyDark from '../Assets/img/MoneyDark.svg'
import MoneyLight from '../Assets/img/MoneyLight.svg'
import MoneyLightRight from '../Assets/img/MoneyLightRight.svg'
import ButtonIcon from '../components/Buttons/ButtonIcon'
import Herosect from '../Assets/img/Herosect.svg'
import  HeroMan from '../Assets/img/HeroMan.png'
import  LargeHeroSect from '../Assets/img/LargeHeroSect.svg'
import ToolSection from '../components/pagesections/ToolSection'
import AfricanLady  from '../Assets/img/AfricanLady.svg'
import ApiSection from '../components/pagesections/ApiSection/ApiSection'
import JoinSection from '../components/pagesections/JoinSection/JoinSection'
import Link from 'next/link'
import PricingSection from '../components/pagesections/PricingSection'










export default function Home() {
  return (
    <>
     
    <div>
        <div className='relative z-20  bg-[#F5F5F5] w-full md:w-[72rem]
        lg:h-[53.75rem] pt-[1.875rem] 
        '>
            <div className='relative  h-[17.5rem] mt-[6rem]  ml-5 
            lg:ml-[6.75rem] xl:ml-[9.375rem] xl:mt-[12.65rem] xl:h-[9.875rem]
            min-[360px]:top-5 
            min-[412px]:top-4 min-[412px]:bottom-0 min-[1280px]:mb-12 min-[390px]:top-4 min-[540px]:mb-12
            sm:mb-0 sm:top-12
            '>
                  <div className='relative w-[15rem] min-[492px]:w-[30rem] sm:w-[35rem] lg:w-[40rem] xl:w-[46.875rem] 
                  min-[375px]:w-[19.5rem] 
                  min-[412px]:w-[19rem] min-[390px]:w-[19.5rem] min-[360px]:w-[14rem] min-[540px]:w-[20rem]'>
                      <h1 className='text-[#303778] text-[4rem] font-extrabold font-SpaceGrotesk leading-[4.375rem]
                      md:text-[4.5rem] md:leading-[5rem]
                      lg:text-[5rem] lg:leading-[4.95rem]
                      xl:text-[5rem] xl:leading-[4.95rem]
                      min-[280px]:text-[3rem] min-[280px]:leading-[3.8rem]
                      min-[375px]:text-[4rem] min-[375px]:leading-[4rem]
                      min-[540px]:text-[4rem] min-[540px]:leading-[4.4rem]
                      sm:text-[4rem] sm:leading-[4.375rem]
                      '>Swift payments 
                      <span className='text-[#FF9635]'> for every business!</span>
                      </h1>
                      
                  </div>
                
                  <div className='absolute bottom-60 left-48
                  md:left-[38rem]
                  min-[492px]:left-72  sm:top-0 sm:left-[32rem]
                  min-[412px]:bottom-[15rem]
                  lg:hidden
                  '>
                    <Image src={MoneyDark} loading='lazy' alt='Money Image'/>
                  </div>
                  <div className='absolute bottom-52 left-72
                  min-[492px]:left-96 sm:top-32
                  min-[412px]:bottom-[12.8rem] min-[412px]:left-[18.5rem]
                  lg:hidden
                  '>
                    <Image src={MoneyLight} loading='lazy' alt='Money Image'/>
                  </div>
            </div>
            {/* Hero section text */}
            <div className='flex flex-col w-[21.875rem] gap-[1.875rem] px-5 mt-6
            min-[492px]:w-[30rem] lg:px-[6.75rem] md:mt-1 md:w-[37.2rem] xl:px-[9.375rem] xl:w-[37.2rem]
            min-[280px]:mt-1 min-[412px]:mt-0 
            '>
              <p className='text-primaryText text-xl font-WorkSans font-light leading-6
             md:w-[37.2rem] md:text-2xl xl:w-[37.2rem] xl:text-2xl min-[280px]:text-sm min-[280px]:w-[15rem]
             min-[412px]:text-xl min-[412px]:w-[22rem] min-[390px]:text-xl min-[390px]:w-[20rem] min-[360px]:text-xl 
             min-[360px]:w-[20rem] xl:mt-4
             sm:w-[30rem] sm:text-3xl
              '>Process payments, manage revenue, and use tools designed to grow your business.</p>
              <Link href='/auth/signup' className='cursor-pointer z-30'>
                <ButtonIcon 
                width='w-[12.25rem] 
                sm:w-[20rem]' 
                height='h-11 sm:h-14' 
                backgroundColor='bg-primary' 
                textSize='text-sm sm:text-xl' 
                color='text-white'
                mainText='Create a free account'/>
              </Link>
            </div>
              <div className='inline-flex lg:hidden'>
                <Image src={Herosect}  loading='lazy' alt='Hero sect' className='w-screen md:w-[72rem] '/>
              </div>
              <div className='hidden  lg:inline-flex lg:absolute lg:bottom-0 lg:right-20 lg:z-20
              '>
                <Image src={LargeHeroSect} loading='lazy' alt='Hero sect large' className='w-screen'/>
              </div>
                <div className='lg:absolute lg:inline-flex hidden
                      lg:left-[3.82rem] lg:right-0 lg:top-[10rem]
                      '>
                        <Image src={MoneyDark} loading='lazy' alt='Money Image'/>
                </div>
                <div className='lg:absolute lg:inline-flex hidden
                      lg:left-[38rem] lg:top-[35rem]
                      '>
                        <Image src={MoneyLightRight} loading='lazy' alt='Money Image'/>
                </div>
                <div className='lg:absolute lg:inline-flex  hidden 
                min-[1062px]:top-14 min-[1062px]:left-[41rem] 
                md:top-14 md:left-[50rem]
                xl:top-[6rem] xl:left-[55rem]
              min-[1024px]:left-[42rem] 

                '>
                    <Image src={HeroMan} loading='lazy' alt='Hero section image'/>
                </div>
        </div>
     </div>
     <div className=''>
          <div className='hidden lg:flex lg:absolute lg:top-[123rem] md:w-[30rem]'>
            <Image src={AfricanLady} loading='lazy' alt=''/>
          </div>
        <div className='flex justify-center md:inline-flex md:ml-[3rem] xl:inline-flex xl:ml-[9.375rem]'>
            <ToolSection/>
        </div>
     </div>
     <div className='bg-[#1B1A1A] h-auto'>
        <ApiSection/>
     </div>
     <div className='mt-24'>
      <h1 className='text-center text-[5.625rem] text-[#FF9635] font-SpaceGrotesk font-bold'>Pricing</h1>
      <PricingSection/>
     </div>
     <div className='bg-white h-auto pt-[5.625rem] pb-[5.315rem]'>
        <JoinSection/>
     </div>
    </>
  )
}
