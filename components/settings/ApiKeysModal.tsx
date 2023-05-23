import Image from 'next/image';
import React, { useEffect, useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CloseIcon from '../../Assets/icon/CloseIcon.svg'
import CopyIcon from '../../Assets/icon/CopyIcon.svg';
import { useGenerateKeysQuery, useLoadDevSettingsQuery } from '../../modules/ApiKeys/generateApiKeys';
import Loader from '../Loader';


type Props = {
    isVisible:boolean,
    onClose:() => {},
    businessName:string,
}

const ApiKeysModal = ({isVisible,onClose,businessName}: Props) => {
    const {data:settingsData,isSuccess:settingSuccess} = useLoadDevSettingsQuery()
    const { isLoading,isSuccess:generateKeySuccess, data: generateKeysData, refetch: generateKeysQuery } = useGenerateKeysQuery();

    const handleGenerateKeysClick = () => {
      generateKeysQuery();
    };
    
    const [apiKeys,setApiKeys] = useState<any>([])



    useEffect(() =>{
        // businessUpdated ? setRefetch(true) :   setRefetch(false)
        if (settingSuccess && settingsData.success == true || generateKeySuccess && generateKeysData.success == true) {
            generateKeysData ? setApiKeys(generateKeysData) : setApiKeys(settingsData['business'])
            console.log("Dev settings",settingsData['business'])
        } else {
            toast.error(settingsData?.reason)
        }

    
    },[settingSuccess,settingsData,generateKeySuccess,generateKeysData])
    const handleClose = (e:any) =>{
        if(e.target.id === 'wrapper'){
            onClose()                                                   
        }
      }
      if (!isVisible) return null;

    

      interface IApiKey {
        title:string
        devKey:string
      }
      const ApiKeyContainer = ({title,devKey,}:IApiKey) => (
        <div>
            <h1 className='text-sm text-[#1B1A1A] font-WorkSans font-normal leading-4'>{title}</h1>
            <div className='flex items-center w-[30rem] h-[3.125rem] mt-[0.375rem] border-[0.0625rem] border-[#CACACA] rounded-[0.313rem]'>
                <h1 className='w-[22rem] break-words ml-6 text-sm text-[#1B1A1A] font-WorkSans font-normal leading-4'>{devKey}</h1>
                <div className='flex justify-end w-[30rem]'>
                    <div 
                    onClick={() => copyToClipboard(devKey)}
                    className='flex items-center justify-center w-[5.25rem] h-[3rem] cursor-pointer bg-[#E7EDFF] border-l-primary border-l-[0.0625rem] rounded-r-[0.313rem]'>
                        <div className='flex justify-center items-center gap-2'>
                            <h1 className='text-sm text-primary font-WorkSans font-normal leading-4'>Copy</h1>
                            <Image src={CopyIcon} alt='Copy Icon' />
                        </div>
                    </div>
                </div>
            </div>
        </div>
      )

      const copyToClipboard = (copyItem:any) => {
        navigator.clipboard.writeText(copyItem);
        toast.success('Copied!!',{autoClose:150,})
     };
  return (
    <div>
    <ToastContainer/>
    <div className='fixed inset-0 bg-[#262626] bg-opacity-50 backdrop-blur-[0.05rem] z-40 flex justify-center items-center overflow-y-scroll' id='wrapper' onClick={handleClose}>
        {/* h-[57.2rem] */}
        <div className='w-[29rem] md:w-[33rem] h-[33rem] mt-36 mb-6 rounded-[0.63rem] bg-white'>
            <div className='flex flex-col mx-6 mt-6 '>
                <div className='flex items-center justify-between'>
                   <h1 className='text-lg text-[#1B1A1A] font-WorkSans font-semibold leading-5'>API Keys for {businessName}</h1>
                   <div className='cursor-pointer'  onClick={()=>{
                    onClose()
                    }}>
                        <Image src={CloseIcon} alt='Close Icon'/> 
                   </div>
                </div>
                <div className='flex flex-col gap-6 mt-7'>
                        <ApiKeyContainer
                        title='Test sec key'
                        devKey={apiKeys?.test_sec_key}
                        />
                        <ApiKeyContainer
                        title='Test pub key'
                        devKey={apiKeys?.test_pub_key}
                        />
                         <ApiKeyContainer
                        title='Live sec key'
                        devKey={apiKeys?.live_sec_key}

                        />
                         <ApiKeyContainer
                        title='Live pub key'
                        devKey={apiKeys?.live_pub_key}
                        />
                </div>
                <div className='flex justify-end'>
                    <div 
                    onClick={handleGenerateKeysClick}
                    className='flex justify-center items-center w-[10.525rem] h-11 cursor-pointer bg-primary rounded-[0.313rem] mt-6'>
                        {isLoading ? <Loader isWhite={true}/> : <h1 className='text-sm text-white font-WorkSans font-normal leading-4'>Regenerate API Keys</h1>}
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
  )
}

export default ApiKeysModal