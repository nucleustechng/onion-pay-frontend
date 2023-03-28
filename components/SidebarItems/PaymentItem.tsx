import { faChevronDown } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useState } from 'react'
import PaymentIcon from '../../Assets/icon/Payment.svg'


const PaymentItem = () => {
    const router = useRouter();
    const [payments,setPay] = useState<boolean>(false)
    const dropPay = () => {
        payments ? setPay(false) : setPay(true);
      };
    
    const transfersRoute = router.pathname == '/payments'
    const paymentlinksRoute = router.pathname == '/payments/paymentlinks'

    const isPaymentRoute = paymentlinksRoute;
    const isActiveRoute = paymentlinksRoute || transfersRoute;

  return (
    <div>
           {/* <div className='flex justify-center w-12 lg:hidden'>
            <div className='flex items-center lg:w-[1.1rem] lg:h-[1.5rem]'>
                <Image src={PaymentIcon}  alt='Home Icon' className='w-[1.1rem] h-[1.5rem]'/>
            </div>
        </div> */}
        <div>
        <Link href={isPaymentRoute ? router.pathname : '/payments/paymentlinks'}>
                        <div className='flex justify-center h-6 lg:w-60' >
                              <div className={`w-[0.26rem] h-11 rounded-tr-lg rounded-br-lg ${isActiveRoute ? 'bg-primary' : 'bg-transparent'}`}/>
                            <div className={`flex items-center gap-[0.67em] w-[13.5rem] h-[2.75rem] 
                            mx-4 px-2
                            ${isActiveRoute ? 'bg-[#E7EDFF] rounded-[0.32rem]' : ''}
                            `}>
                                <div className='flex items-center lg:w-[1.2rem] lg:h-[1.5rem]'>
                                    <Image src={PaymentIcon}  alt='Payment Icon' className='lg:w-[1.2rem] lg:h-[1.5rem]'/>
                                </div>
                                <div className='flex items-center justify-between w-[9rem]'>
                                    <h1 className='text-[#262626] text-base font-WorkSans'>Payments</h1>
                                    <FontAwesomeIcon icon={faChevronDown} className={`${payments ? 'rotate-180 ease-in-out duration-500' : 'rotate-0 duration-500 ease-in-out'}`} onClick={()=>{
                                        dropPay()
                                    }}/>
                                </div>
                            </div>
                        </div>
                        <div>
                        <ul className={`${payments ? 'flex flex-col h-9 translate-x-0 ease-in-out duration-500' : 'overflow-hidden p-0 h-0 ease-in-out -translate-x-28 duration-500'}   gap-[0.55rem]  mb-3 ${payments ? 'mt-[1.8rem]' : 'mt-[0.5rem]'} mx-6`}>
                                    <Link href='/payments'><li className={`text-sm ${transfersRoute ? 'text-primary' : 'text-[#262626]'} font-WorkSans font-normal leading-4`}>Transfers</li></Link>
                                    {/* <li className='text-sm text-[#262626] font-WorkSans font-normal leading-4'>Invoices</li> */}
                                   <Link href='/payments/paymentlinks'><li className={`text-sm ${paymentlinksRoute ? 'text-primary' : 'text-[#262626]'} font-WorkSans font-normal leading-4`}>Payment links</li></Link>
                                    {/* <li className='text-sm text-[#262626] font-WorkSans font-normal leading-4'>Payment plans</li> */}
                            </ul>
                        </div>
                    </Link>
        </div>
    </div>
  )
}

export default PaymentItem