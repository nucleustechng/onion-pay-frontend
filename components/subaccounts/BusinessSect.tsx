import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../redux/redux-hooks/hooks'
import { setShowSidebar } from '../../redux/sidebarSlice'
import { RootState } from '../../redux/store'
import HelpButton from '../HelpButton'
// import VerifyAccountModal from './modals/VerifyAccountModal'
import Hamburger from '../../Assets/icon/HamburgerIcon.svg'
import Image from 'next/image'
import dynamic from 'next/dynamic'
import VerifyAccountModal from './modals/VerifyAccountModal'
import IndividualBusinessModal from './modals/IndividualBusinessModal'



const BusinessSect = () => {
  const [showModal,setShowModal] = useState<boolean>(false);
  const isSecondStep = useAppSelector((state:RootState) => state.business.isSecondStep);
  const sidebarShow = useAppSelector((state:RootState) => state.sidebar.sidebarShow)
  const dispatch = useAppDispatch();

  const CreateBusinessModal = dynamic(() => import('./modals/CreateBusinessModal'));

  

  return (
    <div>
      <div className='w-[25rem] sm:w-[45rem] md:w-[50rem] lg:w-[60rem] xl:w-[70rem] mt-6 mx-6'> 
      <div className='flex justify-between items-center mr-9 mb-12'>
                <h1 className='text-[2rem] text-[#262626]  font-WorkSans font-medium leading-[2.4rem]'>Business</h1>
                {!sidebarShow ? <div className='lg:hidden' onClick={() => dispatch(setShowSidebar(true))}>
                <Image src={Hamburger} alt='Hamburger Icon' />
              </div> : null}
            </div>
        {/* Button to add subaccounts */}
        <div className='flex justify-end'>
          <div className='flex items-center justify-center gap-3 w-[12.75rem] h-11 bg-primary rounded-[0.33rem] mt-10 cursor-pointer'  onClick={()=>{
            setShowModal(true)
            }}>
            <h1 className='text-base text-[#FFFFFF] font-normal font-WorkSans leading-5'>Create business</h1>
            <FontAwesomeIcon icon={faPlus} className='text-[#FFFFFF]'/>
          </div>
        </div>
        <div className='flex flex-col gap-5 mt-6'>
          <div className='w-[27.65rem]'>
            <h1 className='text-[2rem] text-[#262626] font-WorkSans font-normal leading-9'>You do not have any business</h1>
          </div>
          <div className='w-[27.65rem]'>
            <p className='text-base text-[#262626] font-WorkSans font-normal leading-5'>Create a business account.</p>
          </div>
          <div>
            <div className='flex items-center justify-center gap-3 w-[12.75rem] h-11 bg-primary rounded-[0.33rem] cursor-pointer'  onClick={()=>{
            setShowModal(true)
            }}>
              <h1 className='text-base text-[#FFFFFF] font-normal font-WorkSans leading-5'>Create business</h1>
              <FontAwesomeIcon icon={faPlus} className='text-[#FFFFFF]'/>
            </div>
          </div>
          <div>
            {/* {!isSecondStep ? <CreateBusinessModal isVisible={showModal} onClose={async () => setShowModal(false)}/> : null} */}
            {/* { <VerifyAccountModal isVisible={showModal} onClose={async () => setShowModal(isSecondStep)}/> } */}
            <IndividualBusinessModal isVisible={showModal} onClose={async () => setShowModal(false)}/>
            {/* <Verifying isVisible={showModal} onClose={async () => setShowModal(false)}/> */}
            {/* <CorporateBusinessModal isVisible={showModal} onClose={async () => setShowModal(false)}/> */}
          </div>
        </div>
        <div className='fixed left-auto top-3/4 right-0 mr-7 z-30 mt-[8.5rem]'>
          <HelpButton/>
        </div>
      </div>
    </div>
  )
}

export default BusinessSect