import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronDown } from '@fortawesome/free-solid-svg-icons'
import Image from 'next/image'
import SideBar from '../components/SideBar'
import Calendar from '../Assets/icon/Calendar.svg'
import HelpButton from '../components/HelpButton'
// import DashboardChart from '../components/dashboard/DashboardChart'
import dynamic from 'next/dynamic'
import MyChart from '../components/dashboard/MyChart'



export default function Home() {

  return (
    <div>
      <div>
        <div className='w-[71.5rem] mx-6 lg:mt-7'>
          <div className='flex items-center justify-between '>
            <h1 className='text-[#262626] lg:text-[2rem] font-WorkSans font-medium leading-9'>Dashboard</h1>
            <div className='flex items-center gap-[1.13rem]'>
              <div className='flex justify-center items-center lg:w-[9.4rem] lg:h-11 rounded-[0.32rem] bg-[#F5F5F5]'>
                <div className='flex items-center lg:gap-7'>
                  <h1 className='text-sm'>Last 7days</h1>
                  <FontAwesomeIcon icon={faChevronDown} className='text-sm'/>
                </div>
              </div>
              <div className='flex items-center divide-x-2 divide-solid'>
                <div className='flex justify-center  items-center lg:w-[9.4rem] lg:h-11 rounded-l-[0.32rem] rounded-r-none bg-[#F5F5F5]'>
                  <div className='flex items-center lg:gap-7'>
                    <h1 className='text-sm'>Nov 29, 2022</h1>
                    <div>
                      <Image src={Calendar} alt='Calendar Icon'/>
                    </div>
                  </div>
                </div>
                <div className='flex justify-center  items-center lg:w-[9.4rem] lg:h-11 rounded-r-[0.32rem] rounded-l-none bg-[#F5F5F5]'>
                  <div className='flex items-center lg:gap-7'>
                    <h1 className='text-sm'>Dec 06, 2022</h1>
                    <div>
                      <Image src={Calendar} alt='Calendar Icon'/>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className='flex justify-between mt-[3.4rem]'>
            <div className='w-[50.6rem] h-[28.5rem] p-6 rounded-[0.65rem] border-solid border-[0.065rem] border-[#CACACA]'>
              <MyChart/>
            </div>
            <div className='w-[18.8rem] h-[28.5rem]  rounded-[0.65rem] bg-[#303778]'>
              <div className='divide-y-2 divide-solid mx-5 mt-20  divide-white'>
                <div>
                  <div className='flex flex-col mb-10'>
                    <h2 className='font-WorkSans font-normal text-xs mb-4 text-white leading-3'>Total Value</h2>
                    <h1 className='font-WorkSans font-medium text-lg text-white leading-[1.35rem]'>NGN 304.20</h1>
                  </div>
                  <div className='flex flex-col mb-10'>
                    <h2 className='font-WorkSans font-normal text-xs mb-4 text-white leading-3'>Total Volume</h2>
                    <h1 className='font-WorkSans font-medium text-lg text-white leading-[1.35rem]'>1</h1>
                  </div>
                </div>
                <div>
                  <div className='flex flex-col mt-16 mb-4'>
                    <h2 className='font-WorkSans font-normal text-xs mb-4 text-white leading-3'>Total Value</h2>
                    <h1 className='font-WorkSans font-medium text-lg text-white leading-[1.35rem]'>NGN 304.20</h1>
                  </div>
                </div>
              </div>
              <h1 className='text-white mt-6 text-base font-WorkSans font-normal  leading-[1.2rem] mx-5'>See all settlements</h1>
            </div>
          </div>
          <div className='fixed left-auto top-3/4 z-50 right-0 mr-7 mt-[8.5rem]'>
            <HelpButton/>
          </div>
        </div>
      
      </div>
    </div>
  )
}
