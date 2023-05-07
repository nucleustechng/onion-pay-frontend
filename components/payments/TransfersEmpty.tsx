import { faChevronDown, faPlus } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Image from 'next/image'
import React, { useState } from 'react'
import DownloadIcon from '../../Assets/icon/Download.svg'
import SingleAccountModal from './modals/bankaccount/SingleAccountModal'
import TransferModal from './modals/TransferModal'




const TransfersEmpty = () => {
  const [showModal,setShowModal] = useState<boolean>(false);
  const [secondStep,setSecondStep] = useState<number>(1)
  // const [isSecondStep,setSecondStep] = useState<boolean>(false);

  return (
    <div>
        <div>
        <div className='w-[72rem] mt-6 mx-6'>
            <div className='flex justify-between items-center '>
                <div>
                    <h1 className='text-[#262626] lg:text-[2rem] font-WorkSans font-medium leading-9'>Transfers</h1>
                </div>
            <div className='flex items-center gap-4'>
                <div className='flex justify-center items-center lg:w-[9.4rem] lg:h-11 rounded-[0.32rem] bg-[#F5F5F5]'>
                <div className='flex items-center lg:gap-7'>
                  <h1 className='text-sm'>Last 7days</h1>
                  <FontAwesomeIcon icon={faChevronDown} className='text-sm'/>
                </div>
              </div>
              <div className='flex justify-center items-center lg:w-[11.1rem] lg:h-11 rounded-[0.32rem] bg-[#F5F5F5]'>
                <div className='flex items-center lg:gap-7'>
                  <h1 className='text-sm'>Filters applied: 2</h1>
                  <FontAwesomeIcon icon={faChevronDown} className='text-sm'/>
                </div>
              </div>
                </div>
            </div>
            <div>
            <div className='flex items-center justify-end mt-12'>
            <div className='flex gap-4'>
                <div className='flex justify-between items-center '>
                  <div className='flex justify-center items-center gap-4 rounded-[0.32rem] bg-[#F5F5F5] text-black  w-[9.15rem] h-11 text-base font-WorkSans font-normal leading-4'>
                    <h1>Download</h1>
                    <div>
                      <Image src={DownloadIcon} alt='Download Icon'/> 
                    </div> 
                  </div>
                </div>
                <div>
                  <div className='flex  items-center lg:w-[14rem] lg:h-11 rounded-[0.32rem] bg-[#3063E9] '>
                    <div className='flex  items-center mx-4 gap-4'>
                      <h1 className='text-base font-WorkSans font-normal text-white'>Make a new transfer</h1>
                      <FontAwesomeIcon icon={faPlus} className='text-base text-white'/>
                    </div>
                  </div>
                </div>
            </div>
          </div>
            </div>
            <div className='lg:mt-6 w-[31.5rem] h-16 '>
                <h1 className='text-[2rem] text-[#262626]'>You have not made any transfers
                in the last 7 days.</h1>
                <div className='flex mt-6  items-center lg:w-[14rem] lg:h-11 rounded-[0.32rem] bg-[#3063E9] '>
                    <div className='flex  items-center mx-4 gap-4 cursor-pointer' onClick={()=>{
                    setShowModal(true)
                    }}>
                      <h1 className='text-base font-WorkSans font-normal text-white'>Make a new transfer</h1>
                      <FontAwesomeIcon icon={faPlus} className='text-base text-white'/>
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