import Image from 'next/image'
import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronDown } from '@fortawesome/free-solid-svg-icons'
import HelpButton from '../components/HelpButton'
import SearchIcon from '../Assets/icon/Search.svg'
import CustomersTab from '../components/customers/CustomersTab'
import BlackListed from '../components/customers/BlackListed'
import { useAppDispatch, useAppSelector } from '../redux/redux-hooks/hooks'
import { RootState } from '../redux/store'
import Hamburger from '../Assets/icon/HamburgerIcon.svg'
import { setShowSidebar } from '../redux/sidebarSlice'
import useAuth from '../useAuth'
// import { useRouter } from 'next/router'



const Customers = () => {
  useAuth()

  const [tab,setTab] = useState(1);


  
  const toggleTab = (tabNumber:number) =>{
    setTab(tabNumber)
  }

  const dispatch = useAppDispatch();
  const sidebarShow = useAppSelector((state:RootState) => state.sidebar.sidebarShow)

  // const router = useRouter()


 



  return (
    <div>
       <div >
            {/* Header section */}
            <div className='w-[30rem] md:w-[60rem] xl:w-[71.5rem] mt-5 lg:mx-6 lg:mt-7'>
            <div className='flex flex-col lg:flex lg:flex-row lg:items-center  lg:justify-between'>
              <div className='flex justify-between items-center mx-5 lg:mx-0'>
               <h1 className='text-[#262626] text-[2rem] lg:text-[2rem] font-WorkSans font-medium leading-9  lg:mx-0'>Customers</h1>
               {!sidebarShow && <div className='lg:hidden' onClick={() => dispatch(setShowSidebar(true))}>
                <Image src={Hamburger} alt='Hamburger Icon' />
              </div>}
            </div>
            <div className='flex items-center gap-[1.13rem] mt-5 lg:mt-0 mx-5 lg:mx-5 mb-5 lg:mb-0'>
                <div className='w-[18.8rem] h-11 flex items-center  rounded-[0.65rem]'>
                  <div className='absolute  pl-[1.13rem] '>
                    <Image src={SearchIcon} alt='Search Icon' className='w-5 h-5'/>
                  </div>
                  {/* <FontAwesomeIcon icon={faSearch} className='absolute pl-[1.13rem] text-2xl '/> */}
                  <input type="text" className='w-[18.8rem] h-11 text-sm font-normal font-WorkSans pl-12 leading-4 rounded-[0.65rem] border-solid border-[0.07rem] border-[#CACACA]' placeholder='Search' />
                </div>
              <div className='flex justify-center items-center w-[7.5rem] lg:w-[9.4rem] h-11 rounded-[0.32rem] bg-[#F5F5F5]'>
                <div className='flex items-center gap-4 lg:gap-7'>
                  <h1 className='text-sm'>Last 7days</h1>
                  <FontAwesomeIcon icon={faChevronDown} className='w-5 h-5 text-sm'/>
                </div>
              </div>
            </div>
          </div>
            {/* Tab Header section */}
          <div className='flex items-center gap-6 mx-5 mb-2 lg:mb-0 lg:mx-0 lg:mt-12'>
            <h1 className={`text-base font-normal leading-5 text-[#262626] font-WorkSans  ${tab === 1 ? 'underline underline-offset-[0.6rem]' : ''} cursor-pointer decoration-4 decoration-[#3063E9] pb-2`}
            onClick={()=>{
              toggleTab(1)
            }}
            >All customers</h1>
            <h1 className={`text-base font-normal leading-5   ${tab === 2 ? 'underline underline-offset-[0.6rem]' : ''} cursor-pointer decoration-4 decoration-[#3063E9] text-[#262626] font-WorkSans pb-2`}
              onClick={()=>{
                toggleTab(2)
              }}
            >Blacklisted customers</h1>
          </div>
          <hr className='border-[0.06rem] border-[#F5F0F3]' />
          {/* Help section */}
            <div className='fixed left-auto top-3/4 right-0 mr-7 z-50 mt-[8.5rem]'>
            <HelpButton/>
          </div>
        <div>
            {tab === 1 ? <CustomersTab/> : <div/>}
            {tab === 2 ? <BlackListed/> : <div/>} 
        </div>
            </div>
        </div>
    </div>
  )
}

export default Customers