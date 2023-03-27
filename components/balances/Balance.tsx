import Image from 'next/image'
import React, { useState } from 'react'
import FundBalanceModal from './modals/FundBalanceModal'
import Hamburger from '../../Assets/icon/HamburgerIcon.svg'
import { useAppDispatch, useAppSelector } from '../../redux/redux-hooks/hooks'
import { RootState } from '../../redux/store'
import { setShowSidebar } from '../../redux/sidebarSlice'


const Balance = () => {
    const [showModal,setShowModal] = useState<boolean>(false)
    const dispatch = useAppDispatch();
    const sidebarShow = useAppSelector((state:RootState) => state.sidebar.sidebarShow)

  return (
    <div className=''>
        <div className=' mx-6 mt-6'>
            <div className='flex justify-between items-center mb-12'>
                <h1 className='text-[2rem] text-[#262626]  font-WorkSans font-medium leading-[2.4rem]'>Balance</h1>
                {!sidebarShow && <div className='lg:hidden' onClick={() => dispatch(setShowSidebar(true))}>
                <Image src={Hamburger} alt='Hamburger Icon' />
              </div>}
            </div>
            <div className='flex items-center justify-between pb-2'>
                <div>
                <h1 className='text-[1.25rem] text-[#1B1A1A]'>NGN balance</h1>
                </div>
                <div className='flex items-center gap-4'>
                    <button className='w-[8.3rem] h-11 text-sm text-[#1B1A1A] font-WorkSans font-normal leading-5 bg-[#F5F5F5] rounded-[0.32rem]'>
                        Set low limit
                    </button>
                    <button className='w-[8.65rem] h-11 text-sm text-white font-WorkSans font-normal leading-5 bg-[#3063E9] rounded-[0.32rem]' onClick={()=>{
                    setShowModal(true)
                    }}>
                    Fund balance
                    </button>
                </div>
            </div>
            <hr className='border-[#898989]'/>
            <div>
                <div className='flex items-center px-4 justify-between h-[3.8rem]'>
                    <h1 className='text-sm text-[#262626] font-WorkSans font-normal leading-5'>Collection balance</h1>
                    <h2 className='text-sm text-[#262626] font-WorkSans font-normal leading-5'>NGN 6,040.00</h2>
                </div>
                <hr className='border-[#F5F5F5]' />
                <div className='flex items-center px-4 justify-between h-[3.8rem]'>
                    <h1 className='text-sm text-[#262626] font-WorkSans font-normal leading-5'>Payment Balance</h1>
                    <h2 className='text-sm text-[#262626] font-WorkSans font-normal leading-5'>NGN 6,040.00</h2>
                </div>
                <hr className='border-[#F5F5F5]'/>
            </div>
            <div>
                <FundBalanceModal isVisible={showModal} onClose={async () => setShowModal(false)}/>
            </div>
        </div>
    </div>
  )
}

export default Balance