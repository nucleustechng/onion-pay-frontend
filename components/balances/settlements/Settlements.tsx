import { faCalendar, faChevronDown } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Image from 'next/image'
import React from 'react'
import SearchIcon from '../../../Assets/icon/Search.svg'
import DownloadIcon from '../../../Assets/icon/Download.svg'
import Hamburger from '../../../Assets/icon/HamburgerIcon.svg'
import SettlementHeader from './SettlementHeader'
import SettlementTable from './SettlementTable'
import { setShowSidebar } from '../../../redux/sidebarSlice'
import { RootState } from '../../../redux/store'
import { useAppDispatch, useAppSelector } from '../../../redux/redux-hooks/hooks'
import HelpButton from '../../HelpButton'

const MySettlements = () => {
  const dispatch = useAppDispatch();
  const sidebarShow = useAppSelector((state:RootState) => state.sidebar.sidebarShow)

  return (
    <div>
      <div className=''>
        <div className='w-[30rem]  sm:w-[40rem] md:w-[47rem]  lg:w-[50rem]     overflow-hidden xl:w-[72rem] mx-5 mt-4 lg:mt-7'>
            
          <div className='flex flex-col lg:flex lg:items-center xl:flex xl:flex-row  mx-1 md:mx-3 lg:mx-5 lg:flex-row lg:justify-between'>
            <div className='flex justify-between items-center ml-0  mb-5  lg:mb-5'>
              <h1 className='text-[#262626] text-[2rem] font-WorkSans font-medium leading-9'>Settlements</h1>
              {!sidebarShow && <div className='mr-4  sm:mr-10 md:mr-5 lg:hidden' onClick={() => dispatch(setShowSidebar(true))}>
                <Image src={Hamburger} alt='Hamburger Icon' />
              </div>}
            </div>
             {/* Small screen search input */}
             <div className='w-[21rem] h-11  sm:w-[35rem] flex items-center  rounded-[0.65rem] md:hidden lg:hidden'>
                  <div className='absolute  pl-[0.7rem] '>
                    <Image src={SearchIcon} alt='Search Icon' className='w-4 h-4'/>
                  </div>
                  <input type="text" className='w-screen h-11 text-sm font-normal font-WorkSans pl-10 leading-4 rounded-[0.32rem] border-solid border-[0.07rem] border-[#CACACA]' placeholder='Search' />
            </div>
            <div className='flex flex-col'>
            <div className='flex flex-row gap-3 mt-4 lg:ml-56 lg:gap-3 lg:mt-0'>
              <div className='hidden  md:flex  md:items-center md:w-[15rem] md:h-11  lg:w-[12.75rem] lg:h-11 lg:flex lg:items-center  lg:rounded-[0.65rem]'>
                  <div className='absolute  pl-[0.7rem] '>
                    <Image src={SearchIcon} alt='Search Icon' className='w-4 h-4'/>
                  </div>
                  <input type="text" className='lg:w-[12.75rem] h-11 text-sm font-normal font-WorkSans pl-10 leading-4 rounded-[0.32rem] border-solid border-[0.07rem] border-[#CACACA]' placeholder='Search' />
                </div>
                <div>
                  <div className='flex justify-center items-center w-[3.7rem] h-9  md:w-[9.4rem] md:h-11 lg:ml-0 lg:w-[9.4rem] lg:h-11 rounded-[0.32rem] bg-[#F5F5F5]'>
                    <div className='flex items-center gap-3 md:gap-7 lg:gap-7'>
                      <h1 className='hidden md:inline-flex md:text-sm lg:inline-flex lg:text-sm'>Last 7days</h1>
                      <FontAwesomeIcon className='inline-flex md:hidden lg:hidden ' icon={faCalendar}/>
                      <FontAwesomeIcon icon={faChevronDown} className='text-sm'/>
                    </div>
                  </div>
                </div>
                <div>
                </div>
              </div>
          </div>
          <div className='lg:flex items-center justify-start xl:hidden hidden mt-0 xl:mt-0  mr-5   '>
            <div className='flex gap-4'>
                <div className='flex justify-between items-center lg:hidden '>
                  <div className='flex justify-center items-center gap-4 rounded-[0.32rem] bg-[#F5F5F5] w-[9.15rem] h-11 text-base font-WorkSans font-normal leading-4'>
                    <h1 className='text-[#1B1A1A]'>Download</h1>
                    <div>
                      <Image src={DownloadIcon} alt='Download Icon'/> 
                    </div> 
                  </div>
                </div>
                <div className='flex justify-center items-center h-11 lg:hidden lg:ml-0 w-[9.4rem]  rounded-[0.32rem] bg-[#F5F5F5]'>
                    <div className='flex items-center gap-3 md:gap-7 lg:gap-7'>
                      <h1 className='inline-flex text-sm '>All settlements</h1>
                      <FontAwesomeIcon icon={faChevronDown} className='text-sm'/>
                    </div>
                  </div>
            </div>
          </div>
          </div>
          <div className='flex items-center justify-between mt-5 mr-7 '>
          <h1 className='text-base text-[#1B1A1A] font-WorkSans font-normal leading-5 pl-3 pt-5'>5 settlements</h1>
          <div className='flex items-center justify-start  mt-5 xl:mt-0     '>
            <div className='flex gap-4 pl-0 lg:pl-[23rem] xl:pl-0'>
                <div className='flex justify-between items-center '>
                  <div className='flex justify-center items-center gap-4 rounded-[0.32rem] bg-[#F5F5F5] w-[9.15rem] h-11 text-base font-WorkSans font-normal leading-4'>
                    <h1 className='text-[#1B1A1A]'>Download</h1>
                    <div>
                      <Image src={DownloadIcon} alt='Download Icon'/> 
                    </div> 
                  </div>
                </div>
                <div className='flex justify-center items-center h-11 lg:ml-0 w-[9.4rem]  rounded-[0.32rem] bg-[#F5F5F5]'>
                    <div className='flex items-center gap-3 md:gap-7 lg:gap-7'>
                      <h1 className='inline-flex text-sm '>All settlements</h1>
                      <FontAwesomeIcon icon={faChevronDown} className='text-sm'/>
                    </div>
                  </div>
            </div>
          </div>
          </div>
          <div className='fixed left-auto top-3/4 right-0 mr-7 z-50 mt-[8.5rem]'>
            <HelpButton/>
          </div>
          <div className='ml-0 md:ml-2 mr-7'>
              <div className='flex flex-col gap-4 mt-2 ml-2 lg:ml-0 overflow-x-scroll xl:overflow-hidden '>
                <SettlementHeader/>
                <SettlementTable status='Successful'/>
                <SettlementTable status='Pending'/>
              </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MySettlements