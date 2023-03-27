import { faChevronDown, faChevronLeft } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Image from 'next/image'
import React from 'react'
import CloseIcon from '../../../../Assets/icon/CloseIcon.svg'

interface Props {
  isVisible:boolean
  onClose:()=>{}
}

const SingleMobileTransferModal = ({isVisible,onClose}: Props) => {
  const handleClose = (e:any) =>{
    if(e.target.id === 'wrapper'){
        onClose()                                                   
    }
};


  if (!isVisible) return null;
  return (
    <div>
        <div className='fixed inset-0 bg-[#262626] bg-opacity-50 backdrop-blur-[0.05rem] flex justify-center '  id='wrapper' onClick={handleClose}>
            <div className='w-[33.26rem] h-[21rem] mt-32 rounded-[0.63rem] bg-white'>
              <div className='mx-6 mt-6'>
                  <div className='flex justify-between items-center'>
                    <div className='flex items-center gap-2'>
                      <FontAwesomeIcon icon={faChevronLeft} className='cursor-pointer'/>
                      <h1 className='text-lg text-[#262626] font-WorkSans font-semibold leading-5'>Single account transfer</h1>
                    </div>
                    <div>
                        <Image src={CloseIcon} className='cursor-pointer' onClick={()=>{
                        onClose()
                        }} alt='Close Icon'/> 
                    </div>
                  </div>
                  {/* Input one */}
                  <div className='flex flex-col gap-2 mt-7'>
                    <h1 className='text-[#262626] text-sm font-WorkSans font-normal leading-4'>Choose balance to fund from</h1>
                    <div
                    tabIndex={0}
                    className="flex justify-end px-5 items-center border-[0.07rem] border-solid border-cacaca rounded-[0.315rem] w-[30rem] h-[3.15rem] relative cursor-pointer"
                    >
                    <FontAwesomeIcon icon={faChevronDown}/>
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <h1 className='text-base text-[#262626] font-WorkSans font-normal leading-5'>Choose a balance</h1>
                    </div>
                    </div>
                  </div>
                  {/* Input two */}
                  <div className='flex flex-col gap-2 mt-5'>
                        <h1 className='text-[#262626] text-sm font-WorkSans font-normal leading-4'>Choose a transfer currency</h1>
                        <div
                    tabIndex={0}
                    className="flex justify-end px-5 items-center border-[0.07rem] border-solid border-cacaca rounded-[0.315rem] w-[30rem] h-[3.15rem] relative cursor-pointer"
                    >
                    <FontAwesomeIcon icon={faChevronDown}/>
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <h1 className='text-base text-[#262626] font-WorkSans font-normal leading-5'>NGN</h1>
                    </div>
                  </div>
                 
                  {/* Action buttons */}
                  <div className='flex items-center justify-end gap-4 mt-5'>
                    <button className='flex items-center justify-center w-[5.4rem] h-11 bg-[#F5F5F5] rounded-[0.313rem] text-base text-[#262626] font-WorkSans font-normal leading-5'>
                      Cancel
                    </button>
                    <button className='w-[10.21rem] h-11 bg-[#3063E9] rounded-[0.313rem] text-base text-white font-WorkSans font-normal leading-5'>
                      Confirm transfer
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
    </div>
  )
}

export default SingleMobileTransferModal