import Logo from '../Assets/logo/Logo.svg'
import LogOutIcon from '../Assets/icon/LogOut.svg'
import Image from 'next/image'
// import HomeItem from './SidebarItems/HomeItem'
import TransactionItem from './SidebarItems/TransactionItem'
// import BalanceItem from './SidebarItems/BalanceItem'
import PaymentItem from './SidebarItems/PaymentItem'
import BusinessItem from './SidebarItems/BusinessItem'
// import Link from 'next/link'
// import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import { useEffect, useState } from 'react'
import { useToggleModeQuery } from '../modules/Environment/switchEnvironment'
import CustomToggle from './CustomToggle'
import SettingsItem from './SidebarItems/SettingsItem'
import LogoutConfirmation from './LogoutConfirmation'
import TransfersItem from './SidebarItems/TransfersItem'
import { useLoadSettingsQuery } from '../modules/LoadSettings/settingsApi'



const SideBar = () =>{
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
            console.log(data)
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
    <div>
        {/* <ToastContainer/> */}
      {/*  */}
        <div className='hidden md:flex lg:flex  h-screen lg:h-screen  '>
        <div className='flex flex-col w-60 h-screen'>
          <div className='flex items-center pl-5 mt-6 mb-16 lg:pl-5 lg:mb-16 lg:mt-6 w-[14rem] h-6'>
            <div>
              <Image
                src={Logo}
                alt='Onion Pay Logo'
              />
            </div>
          </div>
          <div className='h-[24rem]'>
            <h1 className='flex pl-7 mb-4 lg:flex text-[#898989] lg:pl-5 lg:mb-4 lg:text-sm'>
              Menu
            </h1>
            <div className='flex flex-col gap-2 lg:gap-1'>
                    {/* <div>
                        <HomeItem/>  
                    </div> */}
                    <div>
                        <TransactionItem/>
                    </div>
                    <div>
                        <TransfersItem/>
                    </div>
                    {/* <div>
                        <BalanceItem/>
                    </div> */}
                     <div>
                        <PaymentItem/>
                    </div>
                    {!businessData && <div>
                        <BusinessItem/>
                    </div>} 
                   
                </div>
            </div>
            <div className={`flex flex-col lg:flex-col gap-[1.63rem] lg:h-32  mt-8 }`}>
            <div className='flex justify-between items-center mx-6'>
                <h1 className='text-base text-[#1B1A1A] font-WorkSans font-normal leading-5'>{isSwitchOn ? 'Live Mode' : 'Test Mode'}</h1>
                <CustomToggle
                value={isSwitchOn}
                onChange={switch_onChange_handle}
                />
            </div>
            <hr className='border-solid border-[0.068rem] border-[#F5F0F3]'/>
            <div className='flex lg:flex  mt-7'>
                <SettingsItem/>
                {/* <Link href='/settings'>
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
                            </Link> */}
                </div>
                <div className='flex items-center gap-5 pl-7 lg:gap-2 lg:pl-7 cursor-pointer' onClick={logoutUser}>
                    <div className='flex items-center justify-center bg-[#F31212] rounded-full w-[1.5rem] h-[1.5rem] lg:w-[1.6rem] lg:h-[1.6rem]'>
                        <Image src={LogOutIcon} alt='Settings' className='lg:w-[1.6rem] lg:h-[1.6rem]'/>
                    </div>
                    <h1 className='text-[#262626] text-base leading-[1.19rem] font-WorkSans font-normal'>Log out</h1>
                </div>
            {/* <hr className='lg:mt-[0.2rem] border-solid border-[0.068rem] border-[#F5F0F3]' />
                <div className='flex items-center pl-7 gap-2 lg:gap-2 h-6   lg:pl-7'>
                    <div className='flex justify-center items-center w-[2rem] h-[2rem]  lg:w-10 lg:h-10 bg-[#61A72C] rounded-full'>
                        <h1 className='font-Montserrat font-medium text-base text-white leading-5 '>JD</h1>
                    </div>
                    <div className='flex items-center gap-[3.7rem]'>
                        <div className='flex flex-col gap-1'>
                            <h1 className='text-base text-black font-WorkSans font-normal leading-[1.2rem]'>John Doe</h1>
                            <h2 className='text-xs text-[#898989] font-WorkSans font-normal  leading-3'>ID: 1002345678</h2>
                        </div>
                        <FontAwesomeIcon icon={faEllipsisVertical} className='text-base'/>
                    </div>
                </div> */}
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

export default SideBar