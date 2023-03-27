import Image from 'next/image'
import React from 'react'
import ArrowRight from '../../Assets/icons/ArrowRight.svg'


interface Props  {
    width:string,
    height:string,
    backgroundColor:string,
    mainText:string,
    color:string,
    textSize?:string
}

const ButtonIcon = ({width,height,backgroundColor,mainText,color,textSize}: Props) => {
  return (
    <div>
        <div className={`${width} ${height} cursor-pointer flex justify-center items-center ${backgroundColor} rounded-[0.313rem]`}>
            <div className='flex justify-between items-center gap-[0.375rem]'>
                <h1 className={`${color} ${textSize ? textSize : 'text-base'} font-WorkSans font-normal leading-5`}>{mainText}</h1>
                <div className='w-5 h-5 sm:w-8 sm:h-8'>
                    <Image src={ArrowRight} alt='Arrow Right Icon' width={300} height={300}/>
                </div>
            </div>
        </div>
    </div>
  )
}

export default ButtonIcon