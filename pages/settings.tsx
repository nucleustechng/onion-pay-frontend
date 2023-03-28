import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import BusinessLogo from '../Assets/logo/BusinessLogo.svg'
import EditIcon from '../Assets/icon/EditIcon.svg'
import CopyIcon from '../Assets/icon/CopyIcon.svg'
import { useAppDispatch, useAppSelector } from '../redux/redux-hooks/hooks'
import { RootState } from '../redux/store'
import { setShowSidebar } from '../redux/sidebarSlice'
import Hamburger from '../Assets/icon/HamburgerIcon.svg'
import { useGenerateKeysQuery } from '../modules/ApiKeys/generateApiKeys'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from 'next/router'



const Settings = () => {
    const settingItems = [
        {title:'Business Name:',subtitle:'Mintfool'},
        {title:'Merchant ID:',subtitle:'OP49867466389'},
        {title:'Business Type:',subtitle:'Cooperate'},
        {title:'CAC Registration Number:',subtitle:'23456FSK90'},
    ]

    const dispatch = useAppDispatch();
    const sidebarShow = useAppSelector((state:RootState) => state.sidebar.sidebarShow)
    const isLoggedIn = useAppSelector((state:RootState) => state.login.isLoggedIn)
    const router = useRouter()

    const  [apiKey,setApiKey]  = useState<string>('')

    const {data:generateKeyData,isSuccess} = useGenerateKeysQuery()

    const webHook  = 'http://yourapp.com/data/12345?Customer=bob&value=10.00&item=paper'

    useEffect(() =>{
        if (isSuccess && generateKeyData.success == true){
            setApiKey(generateKeyData?.live_pub_key)
        } else{
            console.log(generateKeyData?.reason)
        }
    },[isSuccess,generateKeyData])

    // const [showPop, setShowPop] = useState(false);

    const copyToClipboard = (copyItem:any) => {
        navigator.clipboard.writeText(copyItem);
        toast.success('Copied!!',{autoClose:2000})
    };

    if (typeof window !== "undefined") {
        // import and use next/router here
        if(!isLoggedIn){
          router.push('/auth/signin')
        }
      }
  return (
    <div className=''>
        <ToastContainer/>
        <div className='w-auto xl:w-[71.5rem]'>
            <div className='mx-6 my-6'>
            <div className='flex justify-between items-center mr-9 mb-12'>
                <h1 className='text-[2rem] text-[#262626]  font-WorkSans font-medium leading-[2.4rem]'>Settings</h1>
                {!sidebarShow && <div className='lg:hidden' onClick={() => dispatch(setShowSidebar(true))}>
                <Image src={Hamburger} alt='Hamburger Icon' />
              </div>}
            </div>
                <div className='w-auto flex justify-between items-center pt-12'>
                    <div className='flex items-center gap-4'>
                        <div className='w-[4rem] h-[4rem]  lg:w-[6.25rem] lg:h-[6.25rem]'>
                            <Image src={BusinessLogo} alt=''/>
                        </div>
                        <div className='flex flex-col gap-1 md:gap-[0.375rem]'>
                            <h1 className='text-sm md:text-base text-[#1B1A1A] font-WorkSans font-medium leading-5'>Mintfool</h1>
                            <h2 className='text-xs md:text-sm text-[#898989] font-WorkSans font-normal leading-4 '>ID: OP49867466389</h2>
                        </div>
                    </div>
                    <div>
                        <div className='flex justify-center items-center w-[6rem] md:w-[7.5625rem] h-11 gap-[0.625rem] rounded-[0.3125rem] bg-primary'>
                            <h1 className='text-xs md:text-sm text-white font-WorkSans font-normal leading-4'>Edit logo</h1>
                            <Image src={EditIcon} alt='Edit Icon'/>
                        </div>
                    </div>
                </div>
                <hr className='w-[25rem] sm:w-[37rem] md:w-[47rem] lg:w-[50rem] xl:w-[70rem] border-primary border-[0.0625rem] my-6' />
                {settingItems.map((item) => (<div key={item.title} className='w-[25rem] sm:w-[37rem] md:w-[47rem] lg:w-[50rem] xl:w-[70rem] mb-6 flex justify-between items-center'>
                        <h1 className='text-sm text-[#898989] font-WorkSans font-normal leading-4'>{item.title}</h1>
                        <h2 className='text-sm text-[#1B1A1A] font-WorkSans font-normal leading-4'>{item.subtitle}</h2>
                    </div>))}
                <div className='w-[25rem] sm:w-[37rem] md:w-[47rem] lg:w-[50rem] xl:w-[70rem] flex justify-between items-center mb-6'>
                    <h1 className='text-sm text-[#898989] font-WorkSans font-normal leading-4'>CAC Certificate:</h1>
                    <h2 className='text-sm text-[#1B1A1A] font-WorkSans font-normal leading-4'>Mintfool</h2>
                </div>
                <div className='w-[25rem] sm:w-[37rem] md:w-[47rem] lg:w-[50rem] xl:w-[70rem] mb-6 flex justify-between items-center'>
                    <h1 className='text-sm text-[#898989] font-WorkSans font-normal leading-4'>Sign-up Date:</h1>
                    <h2 className='text-sm text-[#1B1A1A] font-WorkSans font-normal leading-4'>Nov 19, 2019 - 10:28 AM</h2>
                </div>
                <hr className='w-[25rem] sm:w-[37rem] md:w-[47rem] lg:w-[50rem] xl:w-[70rem] border-primary border-[0.0625rem] my-6' />
                <div className='w-[25rem] sm:w-[37rem] md:w-[47rem] lg:w-[50rem] xl:w-[70rem] mb-6 flex justify-between items-center'>
                    <h1 className='text-sm text-[#898989] font-WorkSans font-normal leading-4'>API Keys:</h1>
                    <div className='flex items-center gap-3'>
                        <h2 className='text-sm text-[#1B1A1A] font-WorkSans font-normal leading-4'>{apiKey}</h2>
                        <div className='cursor-pointer' onClick={() => copyToClipboard(apiKey)}>
                            <Image src={CopyIcon} alt=''/>
                        </div>
                    </div>
                </div>
                <div className='w-[25rem] sm:w-[37rem] md:w-[47rem] lg:w-[50rem] xl:w-[70rem] mb-6 flex justify-between items-center'>
                    <h1 className='text-sm text-[#898989] font-WorkSans font-normal leading-4'>Web hooks:</h1>
                    <div className='flex items-center gap-3'>
                        <div className='w-[16rem] sm:w-auto cursor-pointer flex justify-center text-sm text-[#1B1A1A] font-WorkSans font-normal leading-4'>{webHook}</div>
                        <Image src={CopyIcon} alt='' className='cursor-pointer' onClick={() => copyToClipboard(webHook)}/>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Settings