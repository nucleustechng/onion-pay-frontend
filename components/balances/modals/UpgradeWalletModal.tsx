import Image from 'next/image'
import React, { useCallback, useRef, useState } from 'react'
import Webcam from 'react-webcam'
import CloseIcon from '../../../Assets/icon/CloseIcon.svg'
import ButtonRegular from '../../Buttons/ButtonRegular'


interface Props {
    isVisible:boolean
    onClose:()=>{},
    nextFunc:()=>{},
  }

const UpgradeWalletModal = ({isVisible,onClose,nextFunc}: Props) => {
    const webcamRef = useRef<Webcam>(null);
    const [capturedImage, setCapturedImage] = useState<string | null>(null);
  
    const captureImage = useCallback(() => {
      const imageSrc:any = webcamRef.current?.getScreenshot();
      setCapturedImage(imageSrc);
    }, []);
  
    const handleClose = (e:any) =>{
        if(e.target.id === 'wrapper'){
            onClose()                                                   
        }
      }
      if (!isVisible) return null;
  return (
    <div>
        <div className='fixed inset-0 bg-[#262626] bg-opacity-50 backdrop-blur-[0.05rem] flex justify-center pt-16 overflow-y-scroll ' id='wrapper' onClick={handleClose}>
            <div className={`w-[28rem] lg:w-[33.01rem] ${capturedImage ? "h-[43rem]" : "h-[39.14rem]"} rounded-[0.63rem] bg-white `}>
            <div className='flex items-center justify-between mb-8 mx-6 mt-7'>
                    <h1 className='text-lg text-[#262626] font-WorkSans font-medium leading-5'>Upgrade your wallet</h1>
                    <div>
                        <Image src={CloseIcon} className='cursor-pointer' onClick={()=>{
                            onClose()
                        }} alt='Close Icon'/> 
                    </div>
                  </div>
                <div className='flex items-center gap-[7rem] mx-6 '>
                    <div className='flex items-center justify-center w-[5.32rem] h-5 rounded-[1.25rem] border-primary border-[0.065rem] '>
                        <h1 className='text-primary text-sm font-WorkSans font-normal leading-4 '>Step 1 of 2</h1>
                    </div>
                    <h1 className='text-base text-[#1B1A1A] text-center font-WorkSans font-medium leading-5'>Take a selfie</h1>
                </div>
                <div className='flex justify-center mt-6'>
                    <div className='flex justify-center w-[30rem] h-[26rem] bg-[#1B1A1A]'>
                        <div className='flex flex-col'>
                            <h1 className='text-white text-center text-sm font-WorkSans font-normal leading-4 mt-4'>Fit your face in the space bellow</h1>
                            <div className="relative w-[14.9rem] h-[22rem] border-[#FF9635] border-[0.0625rem] rounded-full overflow-hidden mt-4">
                            {capturedImage ? (
                                <Image src={capturedImage} 
                                width={238.4}
                                height={352}
                                className="object-cover w-full h-full" alt="Captured" />
                            ) : (
                                <Webcam
                                audio={false}
                                mirrored={true}
                                ref={webcamRef}
                                screenshotFormat="image/jpeg"
                                className="object-cover w-full h-full"
                                />
                            )}
                            </div>
                        </div>
                    </div>
            
                </div>
                <div className='flex justify-center mt-6'>
                {!capturedImage ? <ButtonRegular
                    backgroundColor='bg-primary'
                    mainText='Capture'
                    width='w-[30rem]'
                    height='h-11'
                    handlerFunc={captureImage}
                    color='text-white'
                    textSize='text-base'
                    />
                    :
                    <div className='flex flex-col  gap-4'>
                        <ButtonRegular
                        backgroundColor='bg-primary'
                        mainText='Retake Photo'
                        width='w-[30rem]'
                        height='h-11'
                        handlerFunc={captureImage}
                        color='text-white'
                        textSize='text-base'
                        />
                        <ButtonRegular
                        backgroundColor='bg-primary'
                        mainText='Next'
                        width='w-[30rem]'
                        height='h-11'
                        handlerFunc={() => nextFunc()}
                        color='text-white'
                        textSize='text-base'
                        />
                    </div>
                }
                </div>
            </div>
        </div>
    </div>
  )
}

export default UpgradeWalletModal