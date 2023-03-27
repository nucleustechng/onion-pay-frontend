import React from 'react'
import SingleCoin from '../../../Assets/img/SingleCoin.svg'
import DoubleCoin from '../../../Assets/img/DoubleCoin.svg'
import Image from 'next/image'
import CloseIcon from '../../../Assets/icon/CloseIcon.svg'
import CheckCircle from '../../../Assets/icon/CheckCircle.svg'
import Circle from '../../../Assets/icon/Circle.svg'


interface Props {
    isVisible:boolean
    onClose:()=>{}
}

const LogRefundModal = ({isVisible,onClose}:Props) => {
    const handleClose = (e:any) =>{
        if(e.target.id === 'wrapper'){
            onClose()                                                   
        }
      }

    if (!isVisible) return null;
  return (
    <div>
        <div className='fixed inset-0 bg-[#262626] bg-opacity-50 backdrop-blur-[0.05rem] flex justify-center items-center' id='wrapper' onClick={handleClose}>
            <div className=' w-[22.5rem] h-[29rem] md:w-[36rem] md:h-[35rem] lg:w-[37.25rem] lg:h-[35.38rem] rounded-[0.63rem] bg-white'>
                <div className='mx-6 mt-6'>
                    <div className='flex items-center justify-between mb-7'>
                        <h1 className='text-[#262626] text-lg'>Log a refund</h1>
                    <div className='cursor-pointer' onClick={()=>{
                        onClose()
                        }}>
                        <Image src={CloseIcon} alt='Close Icon'/>
                    </div>
                    </div>
                    <div>
                        <h1 className='text-[#262626] text-center text-xl font-WorkSans font-medium leading-6'>Select the type of refund you want to make</h1>
                    </div>
                    <div className='flex flex-col md:flex md:flex-row md:items-center lg:flex lg:flex-row lg:items-center gap-4 mt-6'>
                        {/* small screen first refund select */}
                        <div className='relative  md:hidden  flex items-center  w-[19.5rem] h-[6.5rem] border-[0.065rem] border-solid border-[#3063E9] rounded-[0.32rem] px-2 py-2'>
                            <div className='flex gap-4 items-center'>
                                <div className='w-32 h-32 flex justify-center '>
                                    <Image src={SingleCoin} alt='Single refund'/>
                                </div>
                                <div className='flex  flex-col gap-2'>
                                    <h1 className='text-xl text-[#262626] font-WorkSans font-medium leading-5'>Single refund</h1>
                                    <p className='text-base text-[#262626] font-WorkSans font-normal leading-5'>Single refund allows you log one refund at a time.</p>
                                </div>
                            </div>
                            <div className='absolute right-2 top-2'>
                                <Image src={CheckCircle} alt="Check circle" />
                            </div>
                        </div>
                        {/* small screen second refund select */}
                        <div className='relative md:hidden  flex items-center  w-[19.5rem] h-[6.5rem] border-[0.065rem] border-solid border-[#CACACA] rounded-[0.32rem] px-2 py-2'>
                            <div className='flex gap-4 items-center'>
                                <div className='w-32 h-32 flex justify-center '>
                                    <Image src={DoubleCoin} alt='Single refund'/>
                                </div>
                                <div className='flex  flex-col gap-2'>
                                    <h1 className='text-xl text-[#262626] font-WorkSans font-medium leading-5'>Single refund</h1>
                                    <p className='text-base text-[#262626] font-WorkSans font-normal leading-5'>Single refund allows you log one refund at a time.</p>
                                </div>
                            </div>
                            <div className='absolute right-2 top-2'>
                                <Image src={Circle} alt='Circle '/>
                            </div>
                        </div>
                        {/* First refund select */}
                        <div className='hidden md:flex md:flex-col lg:flex lg:flex-col  w-[16.63rem] h-[21.2rem] border-[0.065rem] border-solid border-[#3063E9] rounded-[0.32rem] px-6 py-6'>
                            <div className='flex justify-end'>
                                <Image src={CheckCircle} alt="Check circle" />
                            </div>
                            <div className='flex justify-center mt-1'>
                                <Image src={SingleCoin} alt='Single refund'/>
                            </div>
                            <div className='flex flex-col gap-4 mt-4 items-center'>
                                <h1 className='text-xl text-[#262626] font-WorkSans font-medium leading-5'>Single refund</h1>
                                <p className='text-base text-center text-[#262626] font-WorkSans font-normal leading-5'>Single refund allows you log one refund at a time.</p>
                            </div>
                        </div>
                        {/* Second refund select */}
                        <div className='hidden md:flex md:flex-col lg:flex lg:flex-col  w-[16.63rem] h-[21.2rem] border-[0.065rem] border-solid border-[#CACACA] rounded-[0.32rem] px-6 py-6'>
                            <div className='flex justify-end'>
                                <Image src={Circle} alt='Circle '/>
                            </div>
                            <div className='flex justify-center '>
                                <Image src={DoubleCoin} alt='Single refund'/>
                            </div>
                            <div className='flex flex-col gap-4 items-center mt-3'>
                                <h1 className='text-xl text-[#262626] font-WorkSans font-medium leading-5'>Bulk refund</h1>
                                <p className='text-base text-center text-[#262626] font-WorkSans font-normal leading-5'>Bulk refund allows you log multiple refunds at once.</p>
                            </div>
                        </div>
                    </div>
                    <div className='flex items-center gap-4 justify-end  mt-6'>
                        <button className='bg-[#F5F5F5] rounded-[0.315rem] w-[5.38rem] h-11 text-base text-[#262626] font-WorkSans font-normal'>Cancel</button>
                        <button className='bg-[#3063E9] rounded-[0.315rem] w-[13.6rem] h-11 text-base text-white font-WorkSans font-normal'>Proceed to log a refund</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default LogRefundModal