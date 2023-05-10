import { faCalendar, faChevronDown, faPlus } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Image from 'next/image'
import React, { useState } from 'react'
import HelpButton from '../HelpButton'
import SearchIcon from '../../Assets/icon/Search.svg'
import RefundHeader from './RefundHeader'
import RefundTable from './RefundTable'
import DownloadIcon from '../../Assets/icon/Download.svg'
// import SingleRefundModal from './modals/SingleRefundModal'
import { useAppDispatch, useAppSelector } from '../../redux/redux-hooks/hooks'
import { RootState } from '../../redux/store'
import Hamburger from '../../Assets/icon/HamburgerIcon.svg'
import { setShowSidebar } from '../../redux/sidebarSlice'
// import dynamic from 'next/dynamic'
import SingleRefundModal from './modals/SingleRefundModal'

const TransactionRefunds = () => {
  const [showModal,setShowModal] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const sidebarShow = useAppSelector((state:RootState) => state.sidebar.sidebarShow)

  // const LogRefundModal = dynamic(() => import('./modals/LogRefundModal'));
  const  [showEmpty] = useState<boolean>(true)
  // const isSecondStep = useAppSelector((state:RootState) => state.invoice.isSecondStep)


  return (
    <div>
      {showEmpty ? 

<div className='w-[25rem] sm:w-[45rem] md:w-[50rem] lg:w-[60rem] xl:w-[70rem] mt-6 mx-6'> 
<div className='flex justify-between items-center mr-9 mb-12'>
          <h1 className='text-[2rem] text-[#262626]  font-WorkSans font-medium leading-[2.4rem]'>Refunds</h1>
          {!sidebarShow ? <div className='lg:hidden' onClick={() => dispatch(setShowSidebar(true))}>
          <Image src={Hamburger} alt='Hamburger Icon' />
        </div> : null}
      </div>
  {/* Button to add subaccounts */}
  <div className='flex justify-end'>
    <div className='flex items-center justify-center gap-3 w-[12.75rem] h-11 bg-primary rounded-[0.33rem] mt-10 cursor-pointer'  onClick={()=>{
      setShowModal(true)
      }}>
      <h1 className='text-base text-[#FFFFFF] font-normal font-WorkSans leading-5'>Log a refund</h1>
      <FontAwesomeIcon icon={faPlus} className='text-[#FFFFFF]  w-5 h-5'/>
    </div>
  </div>
  <div className='flex flex-col gap-5 mt-6'>
    <div className='w-[27.65rem]'>
      <h1 className='text-[2rem] text-[#262626] font-WorkSans font-normal leading-9'>You do not have any refunds yet.</h1>
    </div>
    <div className='w-[27.65rem]'>
      <p className='text-base text-[#262626] font-WorkSans font-normal leading-5'>You will see the record of all your refunds to your customers here when you log a refund.</p>
    </div>
    <div>
      <div className='flex items-center justify-center gap-3 w-[12.75rem] h-11 bg-primary rounded-[0.33rem] cursor-pointer'  onClick={()=>{
      setShowModal(true)
      }}>
        <h1 className='text-base text-[#FFFFFF] font-normal font-WorkSans leading-5'>Log a refund</h1>
        <FontAwesomeIcon icon={faPlus} className='text-[#FFFFFF] w-5 h-5'/>
      </div>
    </div>
    <div>
        {/* <LogRefundModal isVisible={isSecondStep ? false : showModal} onClose={async () => setShowModal(false)}/> */}
         <SingleRefundModal  isVisible={showModal} onClose={async () => setShowModal(false)}/>
    </div>
  </div>
  <div className='fixed left-auto top-3/4 right-0 mr-7 z-30 mt-[8.5rem]'>
    <HelpButton/>
  </div>
</div>
    
    :
      

      
      <div className='w-screen lg:w-[72rem] mt-5 lg:mx-6 lg:mt-7'>
        <div className='w-screen  sm:w-[42rem] md:w-screen     overflow-hidden xl:w-[72rem] mx-5 mt-4 lg:mt-7'>
            
          <div className='flex flex-col lg:flex xl:flex xl:flex-row  mx-1 md:mx-3 lg:mx-5 lg:flex-col lg:justify-between'>
            <div className='flex justify-between items-center ml-0  mb-5  lg:mb-5'>
              <h1 className='text-[#262626] text-[2rem] font-WorkSans font-medium leading-9'>Refunds</h1>
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
            <div className='flex flex-row gap-3 mt-4  lg:gap-3 lg:mt-0'>
              <div className='hidden  md:flex  md:items-center md:w-[15rem] md:h-11  lg:w-[18.75rem] lg:h-11 lg:flex lg:items-center  lg:rounded-[0.65rem]'>
                  <div className='absolute  pl-[0.7rem] '>
                    <Image src={SearchIcon} alt='Search Icon' className='w-4 h-4'/>
                  </div>
                  <input type="text" className='w-[18.75rem] h-11 text-sm font-normal font-WorkSans pl-10 leading-4 rounded-[0.32rem] border-solid border-[0.07rem] border-[#CACACA]' placeholder='Search' />
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
                <div className='w-[3.7rem] h-9 md:w-[9.4rem]  md:h-11 lg:w-[9.4rem] lg:h-11 rounded-[0.32rem] bg-[#F5F5F5]'>
                    <div className='flex items-center justify-center pt-2 gap-3 md:pt-3 md:gap-20 lg:gap-20'>
                      <h1 className='text-sm'>All</h1>
                      <FontAwesomeIcon icon={faChevronDown} className='text-sm'/>
                    </div>
                  </div>
                </div>
              </div>
          </div>
          <div className='flex md:items-center md:justify-start mt-5  md:mr-5  xl:hidden '>
            <div className='flex gap-4'>
                <div className='flex justify-between items-center '>
                  <div className='flex justify-center items-center gap-4 rounded-[0.32rem] bg-[#F5F5F5] w-[9.15rem] h-11 text-base font-WorkSans font-normal leading-4'>
                    <h1 className='text-[#1B1A1A]'>Download</h1>
                    <div>
                      <Image src={DownloadIcon} alt='Download Icon'/> 
                    </div> 
                  </div>
                </div>
                <div className='flex justify-between items-center '>
                  <div className='flex justify-center items-center gap-4 rounded-[0.32rem] text-white bg-[#3063E9] w-[9.15rem] h-11 text-base font-WorkSans font-normal leading-4 cursor-pointer' onClick={()=>{
                    setShowModal(true)
                   }}>
                    <h1>Log a refund</h1>
                    <div>
                      <FontAwesomeIcon icon={faPlus} /> 
                    </div> 
                  </div>
                </div>
            </div>
          </div>
          </div>
          <div className='xl:flex items-center justify-end mt-12 mr-5 hidden'>
            <div className='flex gap-4'>
                <div className='flex justify-between items-center '>
                  <div className='flex justify-center items-center gap-4 rounded-[0.32rem] bg-[#F5F5F5] w-[9.15rem] h-11 text-base font-WorkSans font-normal leading-4'>
                    <h1 className='text-[#1B1A1A]'>Download</h1>
                    <div>
                      <Image src={DownloadIcon} alt='Download Icon'/> 
                    </div> 
                  </div>
                </div>
                <div className='flex justify-between items-center '>
                  <div className='flex justify-center items-center gap-4 rounded-[0.32rem] text-white bg-[#3063E9] w-[9.15rem] h-11 text-base font-WorkSans font-normal leading-4 cursor-pointer' onClick={()=>{
                    setShowModal(true)
                   }}>
                    <h1>Log a refund</h1>
                    <div>
                      <FontAwesomeIcon icon={faPlus} /> 
                    </div> 
                  </div>
                </div>
            </div>
          </div>
          <div className='fixed left-auto top-3/4 right-0 mr-7 z-50 mt-[8.5rem]'>
            <HelpButton/>
          </div>
          <div className='ml-0 md:ml-2'>
              <div className='flex flex-col gap-4 mt-6 ml-2 lg:ml-0 overflow-x-scroll xl:overflow-hidden '>
                <RefundHeader/>
                <RefundTable status='Successful'/>
                <RefundTable status='Pending'/>
              </div>
          </div>
          <div>
            {/* <LogRefundModal isVisible={showModal} onClose={async () => setShowModal(false)}/> */}
            
             {/* <SingleRefundModal isVisible={showModal} onClose={async () => setShowModal(false)}/> */}
          
          </div>
        </div>
      </div>}
    </div>
  )
}

export default TransactionRefunds