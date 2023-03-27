import React from 'react'

type Props = {}

const CustomersHeader = (props: Props) => {
  return (
    <div>
        <div className='flex items-center px-4 rounded-[0.32rem] w-[71.5rem] h-[3rem] mt-6 bg-[#F5F5F5]'>
            <div className='w-[20rem]'>
                <h1 className='text-base text-[#262626] font-WorkSans font-normal leading-[1.2rem]'>Full name</h1>
            </div>
            <div className='w-[17.7rem]'>
                <h1 className='text-base text-[#262626] font-WorkSans font-normal leading-[1.2rem]'>Email address</h1>
            </div>
            <div className='w-[17.7rem]'>
                <h1 className='text-base text-[#262626] font-WorkSans font-normal leading-[1.2rem]'>Merchant ID</h1>
            </div>
            <div className='w-[16.3rem]'>
                <h1 className='text-base text-[#262626] font-WorkSans font-normal leading-[1.2rem]'>Date added</h1>
            </div>
        </div>
    </div>
  )
}

export default CustomersHeader