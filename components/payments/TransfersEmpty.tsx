import { faChevronDown, faPlus } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Image from 'next/image'
// import Image from 'next/image'
import React, { useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../redux/redux-hooks/hooks'
import { setShowSidebar } from '../../redux/sidebarSlice'
import { RootState } from '../../redux/store'
// import DownloadIcon from '../../Assets/icon/Download.svg'
import SingleAccountModal from './modals/bankaccount/SingleAccountModal'
import TransferModal from './modals/TransferModal'
import Hamburger from '../../Assets/icon/HamburgerIcon.svg'




const TransfersEmpty = () => {
  const [showModal,setShowModal] = useState<boolean>(false);
  const [secondStep,setSecondStep] = useState<number>(1)
  // const [isSecondStep,setSecondStep] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const sidebarShow = useAppSelector((state:RootState) => state.sidebar.sidebarShow)

  return (
    <div>
        <div>
        <div className='w-[22rem] md:w-[32rem] lg:w-[72rem] mt-6 mx-4 lg:mx-6'>
            <div className='flex flex-col gap-5 lg:gap-0 lg:flex-row lg:justify-between lg:items-center '>
                <div className='flex justify-between items-center mx-4 mb-12 w-auto'>
                    <h1 className='text-[#262626] text-xl md:text-[2rem] lg:text-[2rem] font-WorkSans font-medium leading-9'>Transfers</h1>
                    {!sidebarShow ? <div className='lg:hidden' onClick={() => dispatch(setShowSidebar(true))}>
          <Image src={Hamburger} alt='Hamburger Icon' />
        </div> : null}
                </div>
            <div className='flex items-center gap-4'>
                <div className='flex justify-center items-center w-[7rem] lg:w-[9.4rem] h-11  rounded-[0.32rem] bg-[#F5F5F5]'>
                <div className='flex items-center gap-3 lg:gap-7'>
                  <h1 className='text-sm'>Last 7days</h1>
                  <FontAwesomeIcon icon={faChevronDown} className='w-4 h-4 lg:w-5 lg:h-5 text-sm'/>
                </div>
              </div>
              <div className='flex justify-center items-center w-[9.8rem] lg:w-[11.1rem] h-11 rounded-[0.32rem] bg-[#F5F5F5]'>
                <div className='flex items-center gap-4 lg:gap-7'>
                  <h1 className='text-sm'>Filters applied: 2</h1>
                  <FontAwesomeIcon icon={faChevronDown} className='w-4 h-4 lg:w-5 lg:h-5 text-sm'/>
                </div>
              </div>
                </div>
            </div>
            <div>
            <div className='flex items-center justify-end mt-12'>
            <div className='flex gap-4'>
                <div className='flex justify-between items-center '>
                  {/* <div className='flex justify-center items-center gap-4 rounded-[0.32rem] bg-[#F5F5F5] text-black  w-[9.15rem] h-11 text-base font-WorkSans font-normal leading-4'>
                    <h1>Download</h1>
                    <div>
                      <Image src={DownloadIcon} alt='Download Icon'/> 
                    </div> 
                  </div> */}
                </div>
                {/* <div>
                  <div className='flex  items-center lg:w-[15rem] h-11 rounded-[0.32rem] bg-[#3063E9] '>
                    <div className='flex items-center mx-4 gap-4'>
                      <h1 className='text-base font-WorkSans font-normal text-white'>Make a new transfer</h1>
                      <FontAwesomeIcon icon={faPlus} className='w-5 h-5 text-base text-white'/>
                    </div>
                  </div>
                </div> */}
            </div>
          </div>
            </div>
            <div className='lg:mt-6 w-[20rem] lg:w-[31.5rem] h-16 '>
                <h1 className='text-[2rem] text-[#262626]'>You have not made any transfers
                in the last 7 days.</h1>
                <div className='flex mt-6  items-center w-[13rem] md:w-[15rem] lg:w-[15rem] h-11 rounded-[0.32rem] bg-[#3063E9] '>
                    <div className='flex  items-center mx-4 gap-4 cursor-pointer' onClick={()=>{
                    setShowModal(true)
                    }}>
                      <h1 className='text-sm md:text-base font-WorkSans font-normal text-white'>Make a new transfer</h1>
                      <FontAwesomeIcon icon={faPlus} className='w-5 h-5 text-base text-white'/>
                    </div>
                </div>
            </div>
            </div>
            <div>
              {secondStep == 1 && <TransferModal handlerFunc={() => setSecondStep(2)} isVisible={showModal} onClose={async () => setShowModal(false)}/>}
              {/* <TransferTypeModal isVisible={showModal} onClose={async () => setShowModal(false)}/> */}
              {secondStep == 2 && <SingleAccountModal handleModal={(secondStep) => setSecondStep(secondStep)} isVisible={showModal} onClose={async () => {
                setShowModal(false)
                setSecondStep(1)
                }} />}
              {/* <SingleTransferModal isVisible={showModal} onClose={async () => setShowModal(false)} /> */}
              {/* <SingleMobileTransferModal isVisible={showModal} onClose={async () => setShowModal(false)}/> */}
            </div>

        </div>
    </div>
  )
}

export default TransfersEmpty