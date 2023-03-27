import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useState } from 'react'
import SwapIcon from '../../Assets/icon/Swap.svg'

type Props = {}

const TransactionItem = (props: Props) => {
    const router = useRouter()
    const [transaction,setTransaction] = useState<boolean>(false)

    const dropTrans = () => {
        transaction ? setTransaction(false) : setTransaction(true);
      };
    const transactionsRoute = router.pathname == '/transactions'
    const refundsRoute =  router.pathname == '/transactions/refunds'
    const chargebacksRoute = router.pathname === '/transactions/chargebacks';
    
    const isTransactionRoute = refundsRoute || chargebacksRoute;
    const isActiveRoute = transactionsRoute || refundsRoute || chargebacksRoute;
  return (
    <div>
          {/* <div className='flex justify-center w-12 lg:hidden'>
            <div className='flex items-center lg:w-[1.1rem] lg:h-[1.5rem]'>
                <Image src={SwapIcon}  alt='Home Icon' className='w-[1.1rem] h-[1.5rem]'/>
            </div>
        </div> */}
        <div>
                  
                    <Link href={isTransactionRoute ? router.pathname : '/transactions'}>
                        <div className='flex lg:justify-center  w-60 mb-2 h-6 lg:w-60' >
                             <div className={`
                                    w-[0.26rem]
                                    h-11
                                    rounded-tr-lg
                                    rounded-br-lg
                                    ${isActiveRoute ? 'bg-primary' : 'bg-transparent'}`}/>
                            <div className={`flex items-center gap-[0.67rem] w-[13.5rem] h-[2.75rem]  mx-4 px-2
                            ${(isActiveRoute) ? 'bg-[#E7EDFF] rounded-[0.32rem]' : ''}
                            `}>
                                <div className='flex items-center lg:w-[1.2rem] lg:h-[1.5rem]'>
                                    <Image src={SwapIcon} alt='Swap Icon' className='lg:w-[1.2rem] lg:h-[1.5rem]'/>
                                </div>
                                <div className='flex items-center justify-between w-[9rem]'>
                                    <h1 className='text-[#262626] text-base font-WorkSans'>Transactions</h1>
                                    <FontAwesomeIcon icon={faChevronDown} className={`${transaction ? 'rotate-180 ease-in-out duration-500 cursor-pointer' : 'rotate-0 duration-500 ease-in-out cursor-pointer'}`} onClick={()=>{
                                       dropTrans()
                                    }}/>
                                </div>
                            </div>
                        </div>
                        <ul className={`${transaction ? 'flex flex-col h-16 translate-x-0 ease-in-out duration-500' : 'overflow-hidden p-0 h-0 ease-in-out -translate-x-28 duration-500'}   gap-[0.63rem]  mb-0 ${transaction ? 'mt-[1.8rem]' : 'mt-[1.2rem]'} mx-6`}>
                                    <Link href='/transactions'><li className={`text-sm 
                                   ${transactionsRoute ? 'text-primary' : 'text-[#262626]'} font-WorkSans font-normal leading-4`}>Transactions</li></Link>
                                   <Link href='/transactions/refunds'><li className={`text-sm 
                                   ${refundsRoute ? 'text-primary' : 'text-[#262626]'} font-WorkSans font-normal leading-4`}>Refunds</li></Link> 
                                   <Link href='/transactions/chargebacks'><li className={`text-sm 
                                   ${chargebacksRoute ? 'text-primary' : 'text-[#262626]'} font-WorkSans font-normal leading-4`}>Chargebacks</li></Link> 
                            </ul>
                    </Link>

        </div>
    </div>
  )
}

export default TransactionItem