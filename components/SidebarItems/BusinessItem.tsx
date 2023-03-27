import { faChevronDown } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useState } from 'react'
import FolderIcon from '../../Assets/icon/Folder.svg'



const BusinessItem = () => {
    const router = useRouter()
    const [account,setAccount] = useState<boolean>(false)
    const dropAccount = () => {
        account ? setAccount(false) : setAccount(true);
      };
    
    const overviewRoute = router.pathname == '/business/overview'
    const businessRoute = router.pathname == '/business'

    const isAccountRoute = businessRoute;
    const isActiveRoute = overviewRoute || businessRoute;
  return (
    <div>
           {/* <div className='flex justify-center w-12 lg:hidden'>
            <div className='flex items-center lg:w-[1.1rem] lg:h-[1.5rem]'>
                <Image src={FolderIcon}  alt='Home Icon' className='w-[1.1rem] h-[1.5rem]'/>
            </div>
        </div> */}
        <div>
        <Link href={isAccountRoute ? router.pathname : '/business'}>
                        <div className={`flex justify-center lg:w-60`}>
                          <div className={`w-[0.26rem] h-11  rounded-tr-lg rounded-br-lg ${isActiveRoute ? 'bg-primary' : 'bg-transparent'}`}/>
                            <div className={`flex items-center gap-[0.67em] w-[13.5rem] h-[2.75rem] 
                            mx-4 px-2
                            ${isActiveRoute ? 'bg-[#E7EDFF] rounded-[0.32rem]' : ''}
                            `}>
                                <div className='flex items-center w-[1.2rem] h-[1.5rem]'>
                                    <Image src={FolderIcon} alt='Swap Icon' className='llg:w-[1.2rem] lg:h-[1.5rem]'/>
                                </div>
                                <div className='flex items-center justify-between w-[9rem]'>
                                    <h1 className='text-[#262626] text-base font-WorkSans'>Business</h1>
                                    <FontAwesomeIcon icon={faChevronDown} className={`${account ? 'rotate-180 ease-in-out duration-500 cursor-pointer' : 'rotate-0 duration-500 ease-in-out cursor-pointer'}`}
                                    onClick={()=>{
                                        dropAccount()
                                    }}
                                    />
                                </div>
                            </div>
                        </div>
                        <ul className={`${account ? 'flex flex-col h-16 translate-x-0 ease-in-out duration-500' : 'overflow-hidden p-0 h-0 ease-in-out -translate-x-28 duration-500'}   gap-[0.63rem]  mb-0 mt-[0.5rem] mx-6`}>
                                    <Link href='/business/overview'><li className={`text-sm 
                                   ${overviewRoute ? 'text-primary' : 'text-[#262626]'} font-WorkSans font-normal leading-4`}>Overview</li></Link>
                                   <Link href='/business'><li className={`text-sm 
                                   ${businessRoute ? 'text-primary' : 'text-[#262626]'} font-WorkSans font-normal leading-4`}>Business</li></Link> 
                            </ul>
                    </Link>
        </div>
    </div>
  )
}

export default BusinessItem