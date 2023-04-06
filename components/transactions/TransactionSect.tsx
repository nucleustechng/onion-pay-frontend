import { faChevronDown, faPlus } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import HelpButton from '../HelpButton'
import TransactionHeader from './TransactionHeader'
import TransactionTable from './TransactionTable'
import SearchIcon from '../../Assets/icon/Search.svg'
// import CreateInvoiceModal from './modals/CreateInvoiceModal'
import { faCalendar } from '@fortawesome/free-regular-svg-icons'
import Hamburger from '../../Assets/icon/HamburgerIcon.svg'
import { useAppDispatch, useAppSelector } from '../../redux/redux-hooks/hooks'
import { setShowSidebar } from '../../redux/sidebarSlice'
import { RootState } from '../../redux/store'
import CreateInvoiceModal from './modals/CreateInvoiceModal'
import CompleteInvoiceModal from './modals/CompletInvoiceModal'
import { useLoadInvoicesQuery } from '../../modules/Invoices/invoiceApi'


const TransactionSect = () => {
  const [showModal,setShowModal] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const sidebarShow = useAppSelector((state:RootState) => state.sidebar.sidebarShow)
  const isSecondStep = useAppSelector((state:RootState) => state.invoice.isSecondStep)

  const [invoicesArray,setInvoicesArray] = useState<any>([])


  const {data:invoiceData,isSuccess,isLoading} = useLoadInvoicesQuery()


  useEffect(() => {
    if (isSuccess && invoiceData.success == true) {
      setInvoicesArray(invoiceData['invoices'])
    } else {
      console.log('An error occured')
    }
  },[isSuccess,invoicesArray,invoiceData])
  

  return (
    <div>
        <div className='w-screen lg:w-[72rem] mt-5 lg:mx-6 lg:mt-7'>
        
          <div className='flex flex-col lg:flex lg:justify-between lg:flex-row'>
            <div className='flex justify-between items-center mb-6 px-5 lg:px-0 lg:mb-0'>
              <h1 className='inline-flex text-[2rem] lg:flex text-[#262626] lg:text-[2rem] font-WorkSans font-medium leading-9'>Transactions</h1>
              {!sidebarShow && <div className='lg:hidden' onClick={() => dispatch(setShowSidebar(true))}>
                <Image src={Hamburger} alt='Hamburger Icon' />
              </div>}
            </div>
            {/* Small screen search input */}
            <div className='w-screen h-11 px-5 sm:w-[35rem] flex items-center  rounded-[0.65rem] md:hidden lg:hidden'>
                  <div className='absolute  pl-[0.7rem] '>
                    <Image src={SearchIcon} alt='Search Icon' className='w-4 h-4'/>
                  </div>
                  {/* <FontAwesomeIcon icon={faSearch} className='absolute pl-[1.13rem] text-2xl '/> */}
                  <input type="text" className='w-screen h-11 text-sm font-normal font-WorkSans pl-10 leading-4 rounded-[0.32rem] border-solid border-[0.07rem] border-[#CACACA]' placeholder='Search' />
            </div>
            <div className='flex flex-row gap-3 mt-4 md:pl-5 lg:gap-3 lg:mt-0'>
                <div className='hidden md:flex  md:items-center md:w-[15rem] md:h-11  lg:w-[18.75rem] lg:h-11 lg:flex lg:items-center  lg:rounded-[0.65rem]'>
                  <div className='absolute  pl-[0.7rem] '>
                    <Image src={SearchIcon} alt='Search Icon' className='w-4 h-4'/>
                  </div>
                  {/* <FontAwesomeIcon icon={faSearch} className='absolute pl-[1.13rem] text-2xl '/> */}
                  <input type="text" className='w-[18.75rem] h-11 text-sm font-normal font-WorkSans pl-10 leading-4 rounded-[0.32rem] border-solid border-[0.07rem] border-[#CACACA]' placeholder='Search' />
                </div>
                <div className=''>
                  <div className='flex justify-center items-center w-[3.7rem] h-9 ml-5 md:w-[9.4rem] md:h-11 lg:ml-0 lg:w-[9.4rem] lg:h-11 rounded-[0.32rem] bg-[#F5F5F5]'>
                    <div className='flex items-center gap-3 md:gap-7 lg:gap-7'>
                      <h1 className='hidden md:inline-flex md:text-sm lg:inline-flex lg:text-sm'>Last 7days</h1>
                      <FontAwesomeIcon className='inline-flex md:hidden lg:hidden ' icon={faCalendar}/>
                      <FontAwesomeIcon icon={faChevronDown} className='text-sm'/>
                    </div>
                  </div>
                </div>
                <div className=' '>
                  <div className='w-[3.7rem] h-9 md:w-[9.4rem]  md:h-11 lg:w-[9.4rem] lg:h-11 rounded-[0.32rem] bg-[#F5F5F5]'>
                    <div className='flex items-center justify-center pt-2 gap-3 md:pt-3 md:gap-20 lg:gap-20'>
                      <h1 className='text-sm'>All</h1>
                      <FontAwesomeIcon icon={faChevronDown} className='text-sm'/>
                    </div>
                  </div>
                </div>
                {/* Create invoice button for small screens */}
                <div className='flex justify-end lg:hidden cursor-pointer' onClick={()=>{
                    setShowModal(true)
                  }}>
                    <div className='flex justify-center items-center gap-4 rounded-[0.32rem] text-white bg-[#3063E9]
                    w-[12rem] h-9 text-sm md:w-[12rem] md:h-11
                    lg:hidden font-WorkSans font-normal leading-4'>
                      Create an Invoice
                      <FontAwesomeIcon icon={faPlus}/>  
                    </div>
                  </div>
              </div>
          </div>

          <div className='hidden lg:flex lg:justify-end lg:mt-12 cursor-pointer' onClick={()=>{
            setShowModal(true)
          }}>
            <div className='flex justify-center items-center gap-4 rounded-[0.32rem] text-white bg-[#3063E9]
            w-[10rem] h-9 text-sm
            lg:w-[13.4rem] lg:h-11 lg:text-base font-WorkSans font-normal leading-4'>
              Create an Invoice
              <FontAwesomeIcon icon={faPlus}/>  
            </div>
          </div>
          <div className='fixed mr-3 left-auto top-3/4 right-0 lg:mr-7 z-40 mt-[8.5rem]'>
            <HelpButton/>
          </div>
          <div className='xl:w-[71.5rem] h-[35rem] overflow-y-auto scrollbar-hide mt-10'>
                  <div className="relative">
                    <div className="sticky top-0 z-10 bg-white"> 
                      <TransactionHeader/>
                    </div>
                    <div className="mt-5">
                      {invoicesArray.map((invoice:any) => (
                      <div key={invoice.i_id}>
                          <TransactionTable 
                          status={invoice.paid ? 'Successful' : 'Pending...'}
                          amount={invoice.amount_string ? invoice.amount_string : '--'}
                          date={invoice.paid_on ? invoice.paid_on : '--'}
                          paymentId={invoice.i_id ? invoice.i_id : '---'}
                          />
                      </div>
                      ))}
                    </div>
                  </div>
                </div>
              <div>
                <div>
                  <CreateInvoiceModal isVisible={isSecondStep ? false : showModal} onClose={async () => setShowModal(false)}/>
                  {isSecondStep && <CompleteInvoiceModal  isVisible={!isSecondStep ?  false : showModal} onClose={async () => setShowModal(false)}/>}
                </div>
            </div>
        </div>
    </div>
  )
}

export default TransactionSect