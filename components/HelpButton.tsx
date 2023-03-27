import React from 'react'

type Props = {}

const HelpButton = (props: Props) => {
  return (
    <div>
        <button className='bg-[#3063E9] rounded-[0.32rem] w-[10rem] md:w-[10rem] xl:w-[10rem]  text-sm lg:w-[11.15rem] h-11 lg:text-base text-white font-WorkSans font-normal leading-4'>
            Do you need help?
        </button>
    </div>
  )
}

export default HelpButton