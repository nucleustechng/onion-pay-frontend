import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Image from 'next/image'
import React, { useState } from 'react'
import CloseIcon from '../../../Assets/icon/CloseIcon.svg'
import ButtonRegular from '../../Buttons/ButtonRegular'
import Input from '../../Input'


interface Props {
    isVisible:boolean
    onClose:()=>{}
  }

const CompleteUpgrade = ({isVisible,onClose}: Props) => {
    const [fileAdded1,setFileAdded1] = useState<boolean>(false);
    const [fileAdded2,setFileAdded2] = useState<boolean>(false);
    const [address,setAddress] = useState<string>('')

    const hiddenFileInput1:any = React.useRef(null);
    const handleClick1 = () => {
            hiddenFileInput1.current?.click();
      };

    //   const [selectedImage1, setSelectedImage1] = useState<any>();
 
    // This function will be triggered when the file field change
    const imageChange1 = (e:any) => {
        if (e.target.files && e.target.files.length > 0) {
            // const selectedFile = e.target.files[0];
            setFileAdded1(true)
            // setSelectedImage(selectedFile);
            // setBusinessInfo(prevState => ({
            //     ...prevState,
            //     file: selectedFile
            // }));
        }
    };
      
    const hiddenFileInput2:any = React.useRef(null);
    const handleClick2 = () => {
            hiddenFileInput2.current?.click();
      };

    //   const [selectedImage2, setSelectedImage2] = useState<any>();
 
    // This function will be triggered when the file field change
    const imageChange2 = (e:any) => {
        if (e.target.files && e.target.files.length > 0) {
            // const selectedFile = e.target.files[0];
            setFileAdded2(true)

            // setSelectedImage(selectedFile);
            // setBusinessInfo(prevState => ({
            //     ...prevState,
            //     file: selectedFile
            // }));
        }
    };
    const handleClose = (e:any) =>{
        if(e.target.id === 'wrapper'){
            onClose()                                                   
        }
      }
      if (!isVisible) return null;
  return (
    <div>
          <div className='fixed inset-0 bg-[#262626] bg-opacity-50 backdrop-blur-[0.05rem] flex justify-center pt-16 overflow-y-scroll ' id='wrapper' onClick={handleClose}>
            <div className={`w-[28rem] lg:w-[33.01rem] h-[32.14rem] rounded-[0.63rem] bg-white `}>
            <div className='flex items-center justify-between mb-8 mx-6 mt-7'>
                    <h1 className='text-lg text-[#262626] font-WorkSans font-medium leading-5'>Upgrade your wallet</h1>
                    <div>
                        <Image src={CloseIcon} className='cursor-pointer' onClick={()=>{
                            onClose()
                        }} alt='Close Icon'/> 
                    </div>
                  </div>
                <div className='flex items-center gap-[4rem] mx-6 '>
                    <div className='flex items-center justify-center w-[5.32rem] h-5 rounded-[1.25rem] border-primary border-[0.065rem] '>
                        <h1 className='text-primary text-sm font-WorkSans font-normal leading-4 '>Step 2 of 2</h1>
                    </div>
                    <h1 className='text-base text-[#1B1A1A] text-center font-WorkSans font-medium leading-5'>Complete wallet upgrade</h1>
                </div>
                <div className='flex flex-col gap-6'>
                    <div className='flex justify-center'>
                        <div className='flex flex-col gap-2 mt-6 cursor-pointer' onClick={handleClick1}>
                                    <h1 className='text-[#262626] text-sm font-WorkSans font-normal leading-4'>Upload a valid form of ID</h1>
                                    <div className='flex items-center justify-between px-6 w-[30rem] h-[3.13rem] border-solid border-[#CACACA] border-[0.063rem] rounded-[0.32rem]'>
                                        <h1 className='text-sm text-[#1B1A1A] font-WorkSans font-normal leading-4'>{fileAdded1 ? "File added" : 'Select file'}</h1>
                                        <FontAwesomeIcon icon={faPlus} className="w-5 h-5"/>
                                    </div>
                                <input type='file' name='file'  className='hidden' onChange={imageChange1} ref={hiddenFileInput1}/> 
                        </div>
                    </div>
                    <div className='flex justify-center'>
                        <div className='flex flex-col gap-2 mt-6 cursor-pointer' onClick={handleClick2}>
                                    <h1 className='text-[#262626] text-sm font-WorkSans font-normal leading-4'>Upload a scan of your most utility bill</h1>
                                    <div className='flex items-center justify-between px-6 w-[30rem] h-[3.13rem] border-solid border-[#CACACA] border-[0.063rem] rounded-[0.32rem]'>
                                        <h1 className='text-sm text-[#1B1A1A] font-WorkSans font-normal leading-4'>{fileAdded2 ? "File added" : 'Select file'}</h1>
                                        <FontAwesomeIcon icon={faPlus} className="w-5 h-5"/>
                                    </div>
                                <input type='file' name='file'  className='hidden' onChange={imageChange2} ref={hiddenFileInput2}/> 
                        </div>
                        
                    </div>
                    <div className='flex justify-center'>
                                <Input
                                    width='w-[20.5rem] md:w-[25rem] lg:w-[30rem]'
                                    name='address'
                                    type='text' 
                                    value={address}
                                    label='Address' 
                                    onChange={(e) =>  setAddress(e.target.value)}
                                    placeholder=''
                                    height='h-[3.13rem]'
                                    textSize=''
                                />
                    </div>
                    <div className='flex justify-center'>
                        <ButtonRegular
                        backgroundColor='bg-primary'
                        mainText='Verify and upgrade wallet'
                        width='w-[30rem]'
                        height='h-11'
                        handlerFunc={() => {}}
                        color='text-white'
                        textSize='text-base'
                        />
                    </div>
                </div>

            </div>
            </div>
    </div>
  )
}

export default CompleteUpgrade