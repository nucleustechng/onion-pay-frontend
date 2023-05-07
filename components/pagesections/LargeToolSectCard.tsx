import Image from 'next/image'
import React from 'react'
import ArrowRight  from '../../Assets/icons/ArrowRight.svg'


interface Props {
    header:string,
    mainText:string,
    backgroundColor:string,
    img:any,
    circleColor:string,
    alt:string,
    height?:string,
    left?:string,
    top?:string
}

const LargeToolSectCard = ({backgroundColor,header,img,mainText,height,top,left}: Props) => {
  return (
    <div>
        <div className={`relative xl:w-[21.5rem] xl:h-[22rem] md:h-[20.8rem] md:w-[18rem] ${backgroundColor} hidden md:inline-flex rounded-[0.625rem]`}>
            <div className='flex justify-center pt-6'>
                <div className='flex flex-col gap-6  xl:w-[18.515rem] md:w-[15rem] px-6'>
                    <div className='flex flex-col gap-6 '>
                    <h1 className='text-white xl:text-4xl md:text-2xl  font-WorkSans font-medium leading-[2.625rem]'>{header}</h1>
                    <p className='xl:h-[7.5rem] md:h-[6.5rem] xl:w-[18.515rem] md:w-[15rem] text-white xl:text-xl md:text-base  font-WorkSans font-normal leading-[1.875rem]'>{mainText}</p>
                    </div>
                    <div className='flex items-center gap-[0.375rem]'>
                        <h1 className='text-white xl:text-base md:text-sm  font-WorkSans font-normal leading-5'>Learn more</h1>
                        <div className='w-6 h-6 flex items-center'>
                            <Image src={ArrowRight} loading='lazy' alt='Right arrow icon'  className='w-9 h-9'/>
                        </div>
                    </div>
                </div>
            </div>
            <div className={`absolute ${top ? top : 'top-[15.2rem]'} ${left} ${height}`}>
                <Image src={img} alt=''/>
            </div>
        </div>
    </div>
  )
}

export default LargeToolSectCard