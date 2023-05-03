import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import CloseIcon from '../../../Assets/icon/CloseIcon.svg'
import { useCreateBusinessMutation } from '../../../modules/BusinessPageApi/businessApi'
import Input from '../../input fields/Input'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Loader from '../../Loader'
import { setSecondStep } from '../../../redux/Modal-Processes/createBusinessSlice'
import { useAppDispatch } from '../../../redux/redux-hooks/hooks'

interface Props {
    isVisible:boolean
    onClose:()=>{}
    handlerFunc:() => void
}

type BusinessForm = {
    b_name:string,
    b_email:string,
    b_phone:string,
    b_address:string,
    website:string
}

const CreateBusinessModal = ({isVisible,onClose,handlerFunc}: Props) => {


    const dispatch = useAppDispatch()

    const [businessInfo, setBusinessInfo] = useState<BusinessForm>({
      b_name: '',
      b_email: '',
      b_phone: '',
      b_address: '',
      website: '',
    });


    const [createBusiness, { data: businessData, isSuccess, isLoading }] =
    useCreateBusinessMutation();
  
  const handleCreateBusiness = async () => {
    handlerFunc()

    try {
      if (
        businessInfo.b_name &&
        businessInfo.b_email &&
        businessInfo.b_address &&
        businessInfo.b_phone &&
        businessInfo.website
      ) {
        await createBusiness(businessInfo);
      }
    } catch (err) {
      console.log(err);
    }
  };
  
  useEffect(() => {
    if (isSuccess && businessData.success == true) {
      // toast.success('Your business has been successfully created!');
      setTimeout(() => {
        handlerFunc()
      },1500)
      setBusinessInfo({
        b_name: '',
        b_email: '',
        b_phone: '',
        b_address: '',
        website: '',
      });
      dispatch(setSecondStep(true))
    } else {
      toast.error(businessData?.reason);
    }
  },[isSuccess,businessData,dispatch]);

  
    const handleClose = (e:any) =>{
        if(e.target.id === 'wrapper'){
            onClose()                                                   
        }
      }
      if (!isVisible) return null;

      
      
      


   
  return (
    <div>
        <ToastContainer/>
        <div className='fixed inset-0 bg-[#262626] bg-opacity-50 backdrop-blur-[0.05rem] z-40 flex justify-center items-center overflow-y-scroll' id='wrapper' onClick={handleClose}>
            {/* h-[57.2rem] */}
            <div className='w-[29rem] md:w-[33rem] h-[38rem] mt-36 mb-6 rounded-[0.63rem] bg-white'>
                <div className='flex flex-col mx-6 mt-6 '>
                    <div className='flex items-center justify-between'>
                       <h1 className='text-lg text-[#1B1A1A] font-WorkSans font-semibold leading-5'>Create business</h1>
                       <div className='cursor-pointer'  onClick={()=>{
                        onClose()
                        }}>
                            <Image src={CloseIcon} alt='Close Icon'/> 
                       </div>
                    </div>
                    <div className='flex flex-col gap-4 mt-6'>
                        <Input 
                        name='b_name'
                        value={businessInfo.b_name}
                        onChange={(e) => setBusinessInfo({...businessInfo, b_name: e.target.value})}
                        placeholder='Business name'
                        label='Business name' 
                        type='text' 
                        width='w-[26rem] md:w-[30rem]'
                        height='h-[3.13rem]'
                        />
                        <Input 
                        name='b_email'
                        value={businessInfo.b_email}
                        onChange={(e) => setBusinessInfo({...businessInfo, b_email: e.target.value})}
                        placeholder='Business email'
                        label='Business email' 
                        type='text' 
                        width='w-[26rem] md:w-[30rem]'
                        height='h-[3.13rem]'/>
                        <Input 
                        name='b_phone'
                        value={businessInfo.b_phone}
                        onChange={(e) => setBusinessInfo({...businessInfo, b_phone: e.target.value})}
                        placeholder='+234'
                        label='Business phone' 
                        type='tel' 
                        width='w-[26rem] md:w-[30rem]'
                        height='h-[3.13rem]'
                        />
                        <Input 
                        name='b_address'
                        value={businessInfo.b_address}
                        onChange={(e) => setBusinessInfo({...businessInfo, b_address: e.target.value})}
                        placeholder='Business address'
                        label='Business address' 
                        type='text' 
                        width='w-[26rem] md:w-[30rem]'
                        height='h-[3.13rem]'
                        />
                        <Input 
                        name='website'
                        value={businessInfo.website}
                        onChange={(e) => setBusinessInfo({...businessInfo, website: e.target.value})}
                        placeholder='https://'
                        label='Business website' 
                        type='url' 
                        width='w-[26rem] md:w-[30rem]'
                        height='h-[3.13rem]'
                        />
                        
                    </div>
                    <div className='flex items-center justify-end gap-4 mt-6'>
                        <button onClick={()=>{
                        onClose()
                        }} className='flex items-center cursor-pointer justify-center w-[5.4rem] h-11 bg-[#F5F5F5] rounded-[0.313rem] text-base text-[#262626] font-WorkSans font-normal leading-5'>
                        Cancel
                        </button>
                        <button onClick={handleCreateBusiness} className='w-[10.21rem] h-11 bg-[#3063E9] rounded-[0.313rem] text-base text-white font-WorkSans font-normal leading-5'>
                        <div className='flex justify-center items-center'>{isLoading ? <Loader isWhite={true}/> : 'Create business'}</div>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default CreateBusinessModal