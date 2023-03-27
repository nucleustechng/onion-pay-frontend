import Image from 'next/image'
import React from 'react'
import ArrowRight  from '../../assets/icons/ArrowRight.svg'

interface Props {
    header:string,
    mainText:string,
    backgroundColor:string,
    img:any,
    circleColor:string,
    alt:string,
    height?:string
}

const ToolSectionCard = ({backgroundColor,circleColor,header,img,mainText,alt,height}: Props) => {
  return (
    <div>
        <div className={`relative w-[21.875rem] h-[11.875rem] ${backgroundColor} rounded-[0.5rem]
            sm:w-[37rem] sm:h-[14rem] md:hidden
        `}>
            <div className='flex justify-center'>
                <div className='flex flex-col gap-[1.065rem] mt-[1.065rem] w-[19.688rem]
                sm:w-[30rem]
                '>
                    <h1 className='text-2xl text-white font-WorkSans font-medium leading-7
                    sm:text-4xl
                    '>{header}</h1>
                    <p className='text-base text-white font-WorkSans font-normal leading-5
                    sm:text-xl
                    '>{mainText}</p>
                </div>
            </div>
            <div className='flex justify-end mr-3 '>
                <div className={`flex items-center justify-center w-[3.375rem] h-[3.375rem] ${circleColor} rounded-full`}>
                    <Image src={ArrowRight} alt='Right arrow icon'  className='w-9 h-9'/>
                </div>
            </div>
            <div className={`absolute bottom-0 left-4 ${height}`}>
                <Image src={img} alt={alt}/>
            </div>
        </div>
    </div>
  )
}

export default ToolSectionCard