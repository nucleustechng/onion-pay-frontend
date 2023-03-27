import { faChevronDown, faPlus } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import DownloadIcon from '../../Assets/icon/Download.svg'
import { useLoadPaymentLinksQuery } from '../../modules/PaymentPageApi/paymentPageApi'
import { useAppDispatch, useAppSelector } from '../../redux/redux-hooks/hooks'
import { setShowSidebar } from '../../redux/sidebarSlice'
import { RootState } from '../../redux/store'
import Loader from '../Loader'
import PaymentLinkModal from './modals/PaymentLinkModal'
import SingleChargeModal from './modals/SingleChargeModal'
import SubscriptionLinkModal from './modals/SubscriptionLinkModal'
import VerifyAccountModal from './modals/VerifyAccountModal'
import PaymentLinkContainer from './PaymentLinkContainer'
import PaymentsHeader from './PaymentsHeader'
import PaymentTable from './PaymentTable'
import Hamburger from '../../Assets/icon/HamburgerIcon.svg'
import SideBarMobile from '../SidebarMobile'

type Props = {}

const PaymentLinks = (props: Props) => {
  const [showModal, setShowModal] = useState(false);
  const [paymentLinksArray,setPaymentLinksArray] = useState<any>([])


 
  const isSingleCharge = useAppSelector((state:RootState) => state.paymentLink.isSingleCharge);
  const isSecondStep = useAppSelector((state:RootState) => state.paymentLink.isSecondStep);
  // const isCompleted  = useAppSelector((state:RootState) => state.paymentLink.isCompleted);
  const {data:paymentPageData,isSuccess,isLoading,refetch} = useLoadPaymentLinksQuery()


  useEffect(() => {
    if (isSuccess && paymentPageData.success == true) {
      setPaymentLinksArray(paymentPageData.pages)
    }
    console.log('Payment link array',paymentLinksArray)
  },[isSuccess])

  const dispatch = useAppDispatch();
  const sidebarShow = useAppSelector((state:RootState) => state.sidebar.sidebarShow)


  
  return (
    <div className='relative'>
       <div className='inline-flex absolute lg:hidden'>
            <SideBarMobile />
          </div>
        <div className='w-[30rem] sm:w-[40rem] md:w-[58rem]  xl:w-[71.5rem] mx-6 mt-6'>
        <div className='flex justify-between items-center mr-9 mb-12'>
                <h1 className='text-[2rem] text-[#262626]  font-WorkSans font-medium leading-[2.4rem]'>Payment link</h1>
                {!sidebarShow && <div className='lg:hidden' onClick={() => dispatch(setShowSidebar(true))}>
                <Image src={Hamburger} alt='Hamburger Icon' />
              </div>}
            </div>
            <div>
            <div className='flex gap-4 justify-start md:justify-start items-center mt-[3.2rem]'>
                <div className='flex justify-between items-center '>
                  <div className='flex justify-center items-center gap-4 rounded-[0.32rem] bg-[#F5F5F5] w-[3.5rem]  md:w-[9.15rem] h-11 text-base font-WorkSans font-normal leading-4'>
                    <h1 className='text-sm text-[#1B1A1A] font-WorkSans font-normal leading-4 hidden md:inline-flex'>Download</h1>
                    <div>
                      <Image src={DownloadIcon} alt='Download Icon'/> 
                    </div> 
                  </div>
                </div>
                <div>
                  <div className='flex  items-center md:w-[12.5rem]  h-11 rounded-[0.32rem] bg-[#F5F5F5] '>
                    <div className='flex  items-center mx-4 gap-4'>
                      <h1 className='text-base font-WorkSans font-normal text-[#262626] hidden md:inline-flex'>All payment links</h1>
                      <h1 className='text-base font-WorkSans font-normal text-[#262626] inline-flex md:hidden'>All</h1>
                      <FontAwesomeIcon icon={faChevronDown} className='text-base text-[#262626]'/>
                    </div>
                  </div>
                </div>
                <div>
                  <div className='flex  items-center lg:w-[12.7rem] h-11 rounded-[0.32rem] bg-[#3063E9] '>
                    <div className='flex  items-center mx-4 gap-4 cursor-pointer' onClick={()=>{
                    setShowModal(true)
                    }}>
                      <h1 className='text-base font-WorkSans font-normal text-white'>New payment link</h1>
                      <FontAwesomeIcon icon={faPlus} className='text-base text-white'/>
                    </div>
                  </div>
                </div>
            </div>
            </div>
              <div className='mt-6'>
                {isLoading ? <div className='flex justify-center'><Loader/></div>
                :  
                <div className='xl:w-[71.5rem] h-[40rem] overflow-y-auto scrollbar-hide'>
                  <div className="relative">
                    <div className="sticky top-0 z-10 bg-white"> 
                      <PaymentsHeader/>
                    </div>
                    <div className="pl-2 mt-5">
                      {paymentLinksArray?.map((item:any) => 
                      <div  key={item?.url}>
                        <PaymentTable amount={item?.amount} description={item?.description}  pageId={item?.p_id} pageName={item?.title} paymentLink={item?.url}/>
                        <hr className='border-[#F5F5F5] border-[1px]'/>
                      </div>)}
                    </div>
                  </div>
                </div>
                }
              </div>
            <div>
              <PaymentLinkModal isVisible={isSecondStep ? false : showModal}  onClose={async () => setShowModal(false)}/>
              {isSingleCharge && <SingleChargeModal isVisible={!isSecondStep ?  false : showModal} onClose={async () => setShowModal(false)}/>}
              {!isSingleCharge && <SubscriptionLinkModal isVisible={!isSecondStep ?  false : showModal} onClose={async () => setShowModal(false)}/>}
              
               {/* <VerifyAccountModal isVisible={showModal} onClose={async () => setShowModal(false)}/> */}
            </div>

        </div>
    </div>
  )
}

export default PaymentLinks