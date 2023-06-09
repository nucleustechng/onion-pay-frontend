import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Image from 'next/image'
import React from 'react'
import { faChevronLeft, faPlus } from '@fortawesome/free-solid-svg-icons'
import CloseIcon from '../../../Assets/icon/CloseIcon.svg'
import CAC from '../../../Assets/img/CAC.svg'

interface Props {
    isVisible:boolean
    onClose:()=>{}
    handlerFunc:(nextstep:string) => void
  }

const CorporateBusinessModal = ({isVisible,onClose,handlerFunc}: Props) => {
    const handleClose = (e:any) =>{
        if(e.target.id === 'wrapper'){
            onClose()                                                   
        }
      };
      if (!isVisible) return null;
  return (
    <div>
        <div className='fixed inset-0 bg-[#262626] bg-opacity-50 backdrop-blur-[0.05rem] flex justify-center items-center' id='wrapper' onClick={handleClose}>
            <div className='w-[33rem] h-[40rem] rounded-[0.63rem] bg-white'>
                <div className='flex flex-col mx-6 mt-6'>
                    <div className='flex items-center justify-between'>
                        <div onClick={() => handlerFunc('business-type')} className='flex items-center cursor-pointer gap-[0.85rem]'>
                            <FontAwesomeIcon icon={faChevronLeft} />
                            <h1 className='text-[#1B1A1A] text-lg font-semibold font-WorkSans leading-5'>Corporate business</h1>
                        </div>
                        <div className='cursor-pointer' onClick={() => {
                            onClose()
                        }}>
                            <Image src={CloseIcon} alt='Close Icon'/>
                        </div>
                    </div>

                    <div className='mt-7'>
                        <div className='flex items-center gap-[3.82rem]'>
                            <div className='flex items-center justify-center w-[5.32rem] h-5 rounded-[1.25rem] border-primary border-[0.065rem] '>
                                <h1 className='text-primary text-sm font-WorkSans font-normal leading-4 '>Step 2 of 2</h1>
                            </div>
                            <h1>Select your type of business</h1>
                        </div>
                    </div>
                    {/*  */}
                    <div className='w-[30rem] h-[20.8rem] bg-[#F5F5F5] rounded-[0.313rem] mt-6'>
                            <div className='flex justify-center mt-4'>
                                <h1>Your ID should look like this</h1>
                            </div>
                            <div className='flex justify-center mt-4'>
                                <Image src={CAC} alt='CAC Certificate'/>
                            </div>
                    </div>
                    <div className='flex flex-col gap-2 mt-6'>
                                <h1 className='text-[#262626] text-sm font-WorkSans font-normal leading-4'>Upload certificate</h1>
                                <div className='flex items-center justify-between px-6 w-[30rem] h-[3.13rem] border-solid border-[#CACACA] border-[0.063rem] rounded-[0.32rem]'>
                                    <h1 className='text-sm text-[#1B1A1A] font-WorkSans font-normal leading-4'>Select file</h1>
                                    <FontAwesomeIcon icon={faPlus}/>
                                </div>
                    </div>
                    {/* Call to action button */}
                    <div onClick={() => handlerFunc('verify')} className='flex justify-center mt-6'>
                        <button className='w-[12.5rem] h-11 bg-primary rounded-[0.313rem] text-white text-base font-WorkSans leading-5'>Start verification</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default CorporateBusinessModal