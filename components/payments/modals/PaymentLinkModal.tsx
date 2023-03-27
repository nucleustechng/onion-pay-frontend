import { faChevronLeft  } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Image from 'next/image'
import React, { useState } from 'react'
import SingleChargeCard from '../../../Assets/img/SingleChargeCard.svg'
import SubLinkCard from '../../../Assets/img/SubLinkCard.svg'
import CloseIcon from '../../../Assets/icon/CloseIcon.svg'
import  CheckCircle from '../../../Assets/icon/CheckCircle.svg'
import  Circle from '../../../Assets/icon/Circle.svg'
import { useAppDispatch, useAppSelector } from '../../../redux/redux-hooks/hooks'
import { setSecondStep, setSingleCharge } from '../../../redux/Modal-Processes/paymentLinkSlice'
import { RootState } from '../../../redux/store'



interface Props {
    isVisible:boolean
    onClose:()=>{},
    handleShow?:()  => {},
}

const PaymentLinkModal = ({isVisible,onClose,handleShow}: Props) => {
    const handleClose = (e:any) =>{
        if(e.target.id === 'wrapper'){
            onClose()                                                   
        }
      }
      if (!isVisible) return null;
      const  [tab,setTab] = useState<number>();
      const  dispatch = useAppDispatch();

      const handleSelected = () => {
        switch(tab) {
            case 1: 
                dispatch(setSingleCharge(true))
                break;
            case 2:
                dispatch(setSingleCharge(false))
                break;
            default:
                dispatch(setSingleCharge(false))
        } 
        dispatch(setSecondStep(true))

      }

  return (
    <div>
        <div className='fixed inset-0 bg-[#262626] bg-opacity-50 z-20 backdrop-blur-[0.05rem] flex justify-center items-center' id='wrapper' onClick={handleClose}>
            <div className=' w-[29.5rem] h-[32rem] md:w-[36rem] md:h-[35rem] lg:w-[37.25rem] lg:h-[35.38rem] rounded-[0.63rem] bg-white'>
                <div className='mx-6 mt-6'>
                    <div className='flex items-center justify-between mb-7'>
                        <h1 className='text-[#262626] text-lg'>New payment link</h1>
                    <div className='cursor-pointer' onClick={()=>{
                        onClose()
                        }}>
                        <Image src={CloseIcon} alt='Close Icon'/>
                    </div>
                    </div>
                    <div>
                        <h1 className='text-[#262626] text-center text-xl font-WorkSans font-medium leading-6'>Select a payment link type to continue</h1>
                    </div>
                    <div className='flex flex-col md:flex md:flex-row md:items-center lg:flex lg:flex-row lg:items-center gap-4 mt-6'>
                        {/* small screen first payment link select */}
                        <div onClick={() => setTab(1)} className={`relative  md:hidden   flex items-center  w-[26.5rem] h-[8.5rem] border-[0.065rem] border-solid ${tab == 1 ? 'border-primary' : 'border-[#CACACA]'} rounded-[0.32rem] px-2 py-2`}>
                            <div className='flex gap-4 items-center w-[25rem]'>
                                <div className='w-64 h-48 flex justify-center pl-4 pr-3 '>
                                    <Image src={SingleChargeCard} alt='Single refund'/>
                                </div>
                                <div className='flex  flex-col gap-2'>
                                    <h1 className='text-xl text-[#262626] font-WorkSans font-medium leading-5'>Single charge</h1>
                                    <p className='text-sm text-[#262626] font-WorkSans font-normal leading-5'>Create a payment link to receive a one-time payment from your customer, modify the currency as needed.</p>
                                </div>
                            </div>
                            <div className='absolute right-2 top-2'>
                                {tab == 1 ? <Image src={CheckCircle} alt="Check circle" /> : <Image src={Circle} alt='Circle'/>}
                            </div>
                        </div>
                        {/* small screen second payment link select */}
                        <div onClick={() => setTab(2)} className={`relative md:hidden  flex items-center  w-[26.5rem] h-[8.5rem] border-[0.065rem] border-solid ${tab == 2 ? 'border-primary' : 'border-[#CACACA]'} rounded-[0.32rem] px-2 py-2`}>
                            <div className='flex gap-4 items-center w-[25rem]'>
                                <div className='w-80 h-48 flex items-center justify-center '>
                                    <Image src={SubLinkCard}  alt='Single refund'/>
                                </div>
                                <div className='flex  flex-col gap-2'>
                                    <h1 className='text-xl text-[#262626] font-WorkSans font-medium leading-5'>Subscription link</h1>
                                    <p className=' text-sm text-[#262626] font-WorkSans font-normal leading-5'>For recurring payments or payment plans, create a subscription link to suit your needs in your preferred currency.</p>
                                </div>
                            </div>
                            <div className='absolute right-2 top-2'>
                                {tab == 2 ? <Image src={CheckCircle} alt='Check circle'/> : <Image src={Circle} alt='Circle '/>}
                            </div>
                        </div>
                        {/* First refund select */}
                        <div onClick={() => setTab(1)} className={`hidden md:flex md:flex-col lg:flex lg:flex-col  w-[16.63rem] h-[21.2rem] border-[0.065rem] border-solid ${tab == 1 ? 'border-primary' : 'border-[#CACACA]'} rounded-[0.32rem] px-6 py-6`}>
                            <div className='flex justify-end'>
                            {tab == 1 ? <Image src={CheckCircle} alt='Check circle'/> : <Image src={Circle} alt='Circle '/>}
                            </div>
                            <div className='flex justify-center mt-1'>
                                <Image src={SingleChargeCard} alt='Single refund'/>
                            </div>
                            <div className='flex flex-col gap-4 mt-4 items-center'>
                                <h1 className='text-xl text-[#262626] font-WorkSans font-medium leading-5'>Single charge</h1>
                                <p className='text-base text-center text-[#262626] font-WorkSans font-normal leading-5'>Create a payment link to receive a one-time payment from your customer, modify the currency as needed.</p>
                            </div>
                        </div>
                        {/* Second refund select */}
                        <div onClick={() => setTab(2)} className={`hidden md:flex md:flex-col lg:flex lg:flex-col  w-[16.63rem] h-[21.2rem] border-[0.065rem] border-solid ${tab == 2 ? 'border-primary' : 'border-[#CACACA]'} rounded-[0.32rem] px-6 py-6`}>
                            <div className='flex justify-end'>
                            {tab == 2 ? <Image src={CheckCircle} alt='Check circle'/> : <Image src={Circle} alt='Circle '/>}
                            </div>
                            <div className='flex justify-center '>
                                <Image src={SubLinkCard} alt='Single refund'/>
                            </div>
                            <div className='flex flex-col gap-4 items-center mt-3'>
                                <h1 className='text-xl text-[#262626] font-WorkSans font-medium leading-5'>Subscription link</h1>
                                <p className='text-base text-center text-[#262626] font-WorkSans font-normal leading-5'>For recurring payments or payment plans, create a subscription link to suit your needs in your preferred currency.</p>
                            </div>
                        </div>
                    </div>
                    <div className='flex items-center gap-4 justify-end  mt-6'>
                        <button onClick={handleSelected} className='bg-[#3063E9] rounded-[0.315rem] w-[13.6rem] h-11 text-base text-white font-WorkSans font-normal'>Create payment link</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default PaymentLinkModal