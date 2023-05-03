import { faChevronDown, faPlus } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import HelpButton from '../HelpButton'
import TransactionHeader from './TransactionHeader'
import TransactionTable from './TransactionTable'
import SearchIcon from '../../Assets/icon/Search.svg'
import { faCalendar } from '@fortawesome/free-regular-svg-icons'
import Hamburger from '../../Assets/icon/HamburgerIcon.svg'
import { useAppDispatch, useAppSelector } from '../../redux/redux-hooks/hooks'
import { setShowSidebar } from '../../redux/sidebarSlice'
import { RootState } from '../../redux/store'
// import CreateInvoiceModal from './modals/CreateInvoiceModal'
// import CompleteInvoiceModal from './modals/CompleteInvoiceModal'
import { useLoadSingleTransactionQuery, useLoadTransactionsQuery } from '../../modules/TransactionsApi/transactionsApi'
import Loader from '../Loader'
import CreateInvoiceModal from './modals/CreateInvoiceModal'
import CompleteInvoiceModal from './modals/CompleteInvoiceModal'


const TransactionSect = () => {
  // const [showModal,setShowModal] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const [outputData, setOutputData] = useState('');

  const handleDataSubmit = (data:any) => {
    setOutputData(data);
  };
  const sidebarShow = useAppSelector((state:RootState) => state.sidebar.sidebarShow)
  const isSecondStep = useAppSelector((state:RootState) => state.invoice.isSecondStep)
  const  [showModal,setShowModal] = useState<boolean>(false)

  const [transactionID,setTransactionID] = useState<string>('')
  const [mytransaction,setMyTransaction] = useState<any>()


  const [transactionsArray,setTransactionsArray] = useState<any>([])


  const {data:transactionsData,isSuccess,isLoading} = useLoadTransactionsQuery()

  const {data:transaction,isSuccess:transactionSuccess} = useLoadSingleTransactionQuery(transactionID)

  // const  [showEmpty,setShowEmpty] = useState<boolean>(true)

  useEffect(() => {
    // invoicesArray.length >= 1 ?  setShowEmpty(false) : setShowEmpty(true);
    if (transactionSuccess ) {
      const strIndex:any = 'transaction' 
      setMyTransaction(transaction[strIndex])
      // console.log('My transaction',transction)
    }

    if (isSuccess && transactionsData.success == true) {
      setTransactionsArray(transactionsData['transactions'])
      // console.log(transactionsArray[6]['events'][0].status)
    } else {
      console.log('An error occured')
    }
  },[isSuccess,transactionsArray,transactionsData,transaction,mytransaction,transactionID,transactionSuccess])
  

  return (
    <div>
        {transactionsArray.length == 0 ?

<div className='w-[25rem] sm:w-[45rem] md:w-[50rem] lg:w-[60rem] xl:w-[70rem] mt-6 mx-6'> 
<div className='flex justify-between items-center mr-9 mb-12'>
          <h1 className='text-[2rem] text-[#262626]  font-WorkSans font-medium leading-[2.4rem]'>Transactions</h1>
          {!sidebarShow ? <div className='lg:hidden' onClick={() => dispatch(setShowSidebar(true))}>
          <Image src={Hamburger} alt='Hamburger Icon' />
        </div> : null}
      </div> 
  {/* Button to add subaccounts */}
   <div className='flex justify-end'>
    <div className='flex items-center justify-center gap-3 w-[12.75rem] h-11 bg-primary rounded-[0.33rem] mt-10 cursor-pointer'  onClick={()=>{
      setShowModal(true)
      }}>
      <h1 className='text-base text-[#FFFFFF] font-normal font-WorkSans leading-5'>Create an invoice</h1>
      <FontAwesomeIcon icon={faPlus} className='text-[#FFFFFF]'/>
    </div>
  </div>
  <div className='flex flex-col gap-5 mt-6'>
    <div className='w-[27.65rem]'>
      <h1 className='text-[2rem] text-[#262626] font-WorkSans font-normal leading-9'>You have no transactions in the last
30 days, but you can change that.</h1>
    </div>
    <div className='w-[27.65rem]'>
      <p className='text-base text-[#262626] font-WorkSans font-normal leading-5'>Your customers might be looking for ways to pay you, create a payment link or send them invoices.</p>
    </div>
    <div>
      <div className='flex items-center justify-center gap-3 w-[12.75rem] h-11 bg-primary rounded-[0.33rem] cursor-pointer'  onClick={()=>{
      setShowModal(true)
      }}>
        <h1 className='text-base text-[#FFFFFF] font-normal font-WorkSans leading-5'>Create an invoice</h1>
        <FontAwesomeIcon icon={faPlus} className='text-[#FFFFFF]'/>
      </div>
    </div>
    <div>
        <CreateInvoiceModal 
          onSubmit={handleDataSubmit} 
          isVisible={isSecondStep ?  false : showModal} 
          onClose={async () => setShowModal(false)}
        />
        {<CompleteInvoiceModal  
        data={outputData} 
        isVisible={!isSecondStep ?  false : showModal} 
        onClose={async () => setShowModal(false)}
        />}
    </div>
  </div>
  <div className='fixed left-auto top-3/4 right-0 mr-7 z-30 mt-[8.5rem]'>
    <HelpButton/>
  </div>
</div>
    
          : 
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
                  <input type="text" 
                  name='t_id'
                  value={transactionID}
                  onChange={(e) => setTransactionID(e.target.value)}
                  className='w-screen h-11 text-sm font-normal font-WorkSans pl-10 leading-4 rounded-[0.32rem] border-solid border-[0.07rem] border-[#CACACA]' placeholder='Search' />
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
                    {isLoading ? <div className='  h-56 flex justify-center items-center'>
                                    <Loader width='w-16' height='h-16'/>
                        </div> 
                                    :
                      <div className="mt-5">
                      {mytransaction ? 
                           <TransactionTable
                               status={mytransaction['events'][0]?.status ? mytransaction['events'][0]?.status : '--'}
                               amount={mytransaction.amount_string}
                               createdOn={mytransaction.created_on ? mytransaction.created_on : '--'}
                               transactionID={mytransaction.t_id}
                               type={mytransaction?.type}
                               />
                                
                               :

                      transactionsArray.map((transaction:any,index:any) => (
                        <div key={index}>
                          <TransactionTable
                          status={transactionsArray[index]['events'][0]?.status ? transactionsArray[index]['events'][0]?.status : '--'}
                          amount={transaction.amount_string}
                          createdOn={transaction.created_on ? transaction.created_on : '--'}
                          transactionID={transaction.t_id}
                          type={transaction?.type}
                          />
                        </div>
                      ))}
                      {/* {invoicesArray.map((invoice:any,index:number) => (
                      <div key={index}>
                          <TransactionTable 
                          status={invoice.paid ? 'Successful' : 'Pending...'}
                          amount={invoice.amount_string ? invoice.amount_string : '--'}
                          date={invoice.paid_on ? invoice.paid_on : '--'}
                          paymentId={invoice.i_id ? invoice.i_id : '---'}
                          />
                      </div>
                      ))} */}
                    </div>}
                  </div>
                </div>
              <div>
                <div>
                {/* <CreateInvoiceModal isVisible={isSecondStep ?  false : showModal} onClose={async () => setShowModal(false)}/>
              <CompleteInvoiceModal isVisible={!isSecondStep ?  false : showModal} onClose={async () => setShowModal(false)}/> */}
                </div>
            </div>
        </div>}
    </div>
  )
}

export default TransactionSect