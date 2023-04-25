import { faCircle } from '@fortawesome/free-regular-svg-icons'
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Image from 'next/image'
import React, { useState } from 'react'
import CloseIcon from '../../../Assets/icon/CloseIcon.svg'
import { useAppDispatch } from '../../../redux/redux-hooks/hooks'
import { setBankAccount, setOnionPay } from '../../../redux/Modal-Processes/paymentSlice'

interface Props {
    isVisible:boolean
    onClose:()=>{}
}

const TransferModal = ({isVisible,onClose}: Props) => {
    const [active,setActive] = useState<number>();
    const dispatch = useAppDispatch()
    // const isBankAccount = useAppSelector((state) => state.payment.isBankAccount)
    // const [isBankAccount,setBankAccount] = useState<boolean>(false)
    // const [isMobileMoney,setMobileMoney] = useState<boolean>(false)
    // const [isOnionPay,setOnionPay] = useState<boolean>(false)


   
    const handleActive = (activeTab:number) =>{
        active === activeTab ? setActive(0) : setActive(activeTab)
    };
    const handleClose = (e:any) =>{
        if(e.target.id === 'wrapper'){
            onClose()                                                   
        }
    };
  

      if (!isVisible) return null;
  return (
    <div>
        <div className='fixed inset-0 bg-[#262626] bg-opacity-50 backdrop-blur-[0.05rem] z-20 flex justify-center items-center' id='wrapper' onClick={handleClose}>
            <div className='w-[27.7rem] h-[32.75rem] rounded-[0.63rem] bg-white'>
                <div className='mx-6 my-6'>
                    <div className='flex items-center justify-between'>
                        <h1 className='text-lg text-[#262626] font-WorkSans font-semibold leading-5'>Make a transfer</h1>
                        <div>
                            <Image src={CloseIcon} className='cursor-pointer' onClick={()=>{
                            onClose()
                            }} alt='Close Icon'/> 
                        </div>
                    </div>
                    <div className='mt-6'>
                        <h1 className='text-xl text-center text-[#262626] font-WorkSans font-semibold  leading-6'>How would you like to make your transfer?</h1>
                    </div>
                    <div className='flex flex-col gap-4 mt-6'>
                        {/* First Card */}
                        <div className={`w-[24.69rem] h-[8.85rem] border-[0.063rem] ${active === 1 ? 'border-[#3063E9]' : 'border-[#CACACA]'} border-solid cursor-pointer rounded-[0.313rem]`} onClick={()=>{
                            handleActive(1)
                            active === 1 ? dispatch(setBankAccount(true)) : dispatch(setBankAccount(false))
                            }}>
                            <div className='mx-6 my-6' >
                                <div className='flex items-center justify-between mb-3'>
                                    <h1 className='text-xl text-[#262626] font-WorkSans font-semibold leading-6'>Transfer to Bank account</h1>
                                    <div className='flex justify-end w-6 h-6'>
                                        {active === 1 ? <FontAwesomeIcon icon={faCheckCircle} className='text-2xl  text-[#3063E9]'/> : 
                                        <FontAwesomeIcon icon={faCircle} className='text-2xl  text-[#CACACA] '/>}
                                    </div>
                                </div>
                                <p className='text-base  text-[#262626] font-WorkSans font-normal leading-5'>Send money directly from your Onion Pay account wallet to one or more bank accounts instantly.</p>
                            </div>
                        </div>
                        {/* Second card */}
                        {/* <div className={`w-[24.69rem] h-[8.85rem] border-[0.063rem] ${active === 2 ? 'border-[#3063E9]' : 'border-[#CACACA]'} border-solid cursor-pointer rounded-[0.313rem]`} onClick={()=>{
                            handleActive(2)
                            active === 2 ? dispatch(setMobileMoney(true)) : dispatch(setMobileMoney(false))
                            }}>
                            <div className='mx-6 my-6'>
                                <div className='flex items-center justify-between mb-3'>
                                    <h1 className='text-xl text-[#262626] font-WorkSans font-semibold leading-6'>Transfer to Mobile money</h1>
                                    <div className='flex justify-end w-6 h-6'>
                                    {active === 2 ? <FontAwesomeIcon icon={faCheckCircle} className='text-2xl  text-[#3063E9]'/> : 
                                        <FontAwesomeIcon icon={faCircle} className='text-2xl  text-[#CACACA] '/>}
                                    </div>
                                </div>
                                <p className='text-base  text-[#262626] font-WorkSans font-normal leading-5'>Send money to a mobile phone number seamlessly using Mobile Money Transfer. Bulk transfer options also available.</p>
                            </div>
                        </div> */}

                        {/* Third card */}
                        <div className={`w-[24.69rem] h-[8.85rem] border-[0.063rem] ${active === 2 ? 'border-[#3063E9]' : 'border-[#CACACA]'} border-solid cursor-pointer rounded-[0.313rem]`} onClick={()=>{
                            handleActive(2)
                            active === 2 ? dispatch(setOnionPay(true)) : dispatch(setOnionPay(false))
                            }}>
                            <div className='mx-6 my-6'>
                                <div className='flex items-center justify-between mb-3'>
                                    <h1 className='text-xl text-[#262626] font-WorkSans font-semibold leading-6'>Transfer to Onion Pay account</h1>
                                    <div className='flex justify-end w-6 h-6'>
                                    {active === 2 ? <FontAwesomeIcon icon={faCheckCircle} className='text-2xl  text-[#3063E9]'/> : 
                                        <FontAwesomeIcon icon={faCircle} className='text-2xl  text-[#CACACA] '/>}
                                    </div>
                                </div>
                                <p className='text-base  text-[#262626] font-WorkSans font-normal leading-5'>Send money in any currency from one Onion Pay account to another using a merchant ID.</p>
                            </div>
                        </div>
                    </div>
                    <div className='flex justify-center mt-6'>
                        <button className='w-[24.69rem] h-11 bg-[#3063E9] rounded-[0.313rem] text-base text-white font-WorkSans font-normal leading-5' >
                            Start transfer
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default TransferModal