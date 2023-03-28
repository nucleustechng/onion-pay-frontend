import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import HelpButton from '../HelpButton'
import OverviewTable from './OverviewTable'



const MyOverview = () => {
  return (
    <div>
      <div className='w-[27rem] sm:w-[40rem] md:w-[45rem] lg:w-[68rem] xl:w-[71.5rem] mt-6 mx-6'> 
        <h1 className='text-[2rem] text-[#262626] font-semibold font-WorkSans leading-9'>Overview</h1>
        {/* Button to add subaccounts */}
        <div className='flex  justify-end'>
          <div className='flex items-center justify-center gap-3 w-[12.75rem] h-11 bg-primary rounded-[0.33rem] mt-10 cursor-pointer'>
            <h1 className='text-base text-[#FFFFFF] font-normal font-WorkSans leading-5'>Add subaccounts</h1>
            <FontAwesomeIcon icon={faPlus} className='text-[#FFFFFF]'/>
          </div>
        </div>
        <div className='flex flex-col mt-6 divide-y-[0.05rem] divide-[#F5F5F5]'>
          <OverviewTable mainText='Total value' subText='NGN 0.00'/>
          <OverviewTable mainText='Total commissions earned' subText='NGN 0.00'/>
          <OverviewTable mainText='Total transaction' subText='0'/>
          <hr />
        </div>
        <div className='fixed left-auto top-3/4 right-0 mr-7 z-50 mt-[8.5rem]'>
          <HelpButton/>
        </div>
      </div>
    </div>
  )
}

export default MyOverview