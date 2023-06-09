import Logo from '../Assets/logo/OnionPayLogo.svg'
import LogOutIcon from '../Assets/icon/LogOut.svg'
import Image from 'next/image'
import TransactionItem from './SidebarItems/TransactionItem'
import PaymentItem from './SidebarItems/PaymentItem'
import BusinessItem from './SidebarItems/BusinessItem'
import CloseIcon from '../Assets/icon/CloseIcon.svg'
import { useAppDispatch, useAppSelector } from '../redux/redux-hooks/hooks'
import { setShowSidebar } from '../redux/sidebarSlice'
import { RootState } from '../redux/store'
import TransfersItem from './SidebarItems/TransfersItem'
import { useEffect, useState } from 'react'
import { useLoadSettingsQuery } from '../modules/LoadSettings/settingsApi'
import { useToggleModeQuery } from '../modules/Environment/switchEnvironment'
import CustomToggle from './CustomToggle'
import SettingsItem from './SidebarItems/SettingsItem'
import LogoutConfirmation from './LogoutConfirmation'
import BalanceItem from './SidebarItems/BalanceItem'



const SideBarMobile = () =>{
  const dispatch  = useAppDispatch()
  const sidebarShow = useAppSelector((state:RootState) => state.sidebar.sidebarShow)
  const handleClose = (e:any) =>{
    if(e.target.id === 'wrapper'){
        dispatch(setShowSidebar(false))                                                   
    }
  }

  const [showModal,setShowModal] = useState<boolean>(false)
    

  const logoutUser = () => {
      setShowModal(true)
  }

  const [isSwitchOn, setIsSwitchOn] = useState<boolean>(false);
  const { data, isSuccess } = useToggleModeQuery(isSwitchOn);
  
  const switch_onChange_handle = () => {
    setIsSwitchOn((prevState) => !prevState);
  };
  
  useEffect(() => {
      if (isSuccess) {
          console.log('Retrieved')
      }
  },[isSuccess,data])

  const  [businessData,setBusinessData] = useState<any>()

  // const {data:generateKeyData,isSuccess} = useGenerateKeysQuery()
  const {data:settingsData,isSuccess:settingSuccess} = useLoadSettingsQuery()




  useEffect(() =>{
      // businessUpdated ? setRefetch(true) :   setRefetch(false)
      if (settingSuccess && settingsData.success == true) {
          setBusinessData(settingsData['business'])
      } else {
          console.log('An error occured')
      }

  
  },[settingSuccess,settingsData])

  return (
    <div className={` bg-[#262626] bg-opacity-50 backdrop-blur-[0.05rem]
       bg-transparent fixed inset-0 h-full  z-50 transition-all duration-500
    ${sidebarShow ? 'w-full right-20  bottom-0' : '-left-60 w-60 bottom-0'}
  `}  id='wrapper' onClick={handleClose}
  
  >
      {/*  */}
        <div className='flex lg:hidden h-full overflow-y-auto  '>
        <div className='flex flex-col w-60 bg-white'>
                <div className='flex items-center justify-between px-5 py-5'>
                    <div>
                        <Image
                            src={Logo}
                            className='w-[12rem] '
                            alt='Onion Pay Logo'
                        />
                    </div>
                    <div className='' onClick={() => {
                        dispatch(setShowSidebar(false))
                        }}>
                        <Image
                        src={CloseIcon}
                        alt='Close Icon'
                        />
                    </div>
            </div>
          <div className='h-[24rem]'>
            <h1 className='flex pl-7 mb-4 lg:flex text-[#898989] lg:pl-5 lg:mb-4 lg:text-sm'>
              Menu
            </h1>
            <div className='flex flex-col gap-2 lg:gap-1'>
                    <div>
                        <TransactionItem/>
                    </div>
                    <div>
                        <TransfersItem/>
                    </div>
                    <div>
                        <BalanceItem/>
                    </div>
                     <div>
                        <PaymentItem/>
                    </div>
                    {!businessData && <div>
                        <BusinessItem/>
                    </div>} 
                </div>
            </div>
            <div className={`flex flex-col lg:flex-col gap-[1.63rem] lg:h-32   }`}>
            <div className='flex justify-between items-center mx-6'>
                <h1 className='text-base text-[#1B1A1A] font-WorkSans font-normal leading-5'>{isSwitchOn ? 'Live Mode' : 'Test Mode'}</h1>
                <CustomToggle
                value={isSwitchOn}
                onChange={switch_onChange_handle}
                />
            </div>
            <hr className='border-solid border-[0.068rem] border-[#F5F0F3]'/>
            <SettingsItem/>
            {/* <div className='flex lg:flex'>
                <Link href='/settings'>
                                <div className='flex justify-center w-60'
                                >
                                <div className={`w-[0.26rem] h-11 rounded-tr-lg rounded-br-lg ${router.pathname == '/settings' ? 'bg-primary' : 'bg-transparent'}`}/>
                                    <div className={`flex items-center gap-[0.6rem] w-[13.5rem] h-[2.75rem] mx-4 px-2
                                    ${router.pathname == '/settings' ? 'bg-[#E7EDFF] rounded-[0.32rem]' : ''}
                                    `}>
                                        <div className='flex items-center justify-center bg-[#EEB625] rounded-full w-[1.5rem] h-[1.5rem] lg:w-[1.6rem] lg:h-[1.6rem]'>
                                            <Image src={SettingIcon}  alt='Customers Icon' className='lg:w-[1.2rem] lg:h-[1.5rem]'/>
                                        </div>
                                        <h1 className='text-[#262626] text-base font-WorkSans'>Settings</h1>
                                    </div>
                                </div>
                            </Link>
                </div> */}
               <div className='flex items-center gap-5 pl-7 lg:gap-2 lg:pl-7 cursor-pointer' onClick={logoutUser}>
                    <div className='flex items-center justify-center bg-[#F31212] rounded-full w-[1.5rem] h-[1.5rem] lg:w-[1.6rem] lg:h-[1.6rem]'>
                        <Image src={LogOutIcon} alt='Settings' className='lg:w-[1.6rem] lg:h-[1.6rem]'/>
                    </div>
                    <h1 className='text-[#262626] text-base leading-[1.19rem] font-WorkSans font-normal'>Log out</h1>
                </div>
            </div>
        </div>
              {/* Vertical line */}
              <div className='border-[#CACACA] border-solid border-[0.065rem] h-screen '/>
        </div>
        <LogoutConfirmation
        isVisible={showModal}  
        onClose={async () => setShowModal(false)} 
        />
    </div>
  )
}

export default SideBarMobile