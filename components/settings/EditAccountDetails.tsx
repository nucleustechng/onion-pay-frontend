import Image from 'next/image'
import React, { useEffect, useRef, useState } from 'react'
import CloseIcon from '../../Assets/icon/CloseIcon.svg'
import Input from '../input fields/Input'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Loader from '../Loader'
import { setBusinessUpdated } from '../../redux/Modal-Processes/createBusinessSlice'
import { useAppDispatch } from '../../redux/redux-hooks/hooks'
import {  useUpdateAccountDetailsMutation } from '../../modules/LoadSettings/settingsApi';

interface Props {
    isVisible:boolean
    onClose:()=>{}
}

type MerchantForm = {
    f_name:string,
    l_name:string,
    o_name:string
    email:string,
    phone:string,
    address:string,
    dob:string
}

const EditAccountDetails = ({isVisible,onClose}: Props) => {


    const dispatch = useAppDispatch()

    // const [successMessage,setSucccessMessage] = useState('')

    const [merchantInfo, setMerchantInfo] = useState<MerchantForm>({
    f_name:'',
    l_name:'',
    o_name:'-',
    email: '',
    phone: '',
    address: '',
    dob:Date.now().toString()
     
    });


    const [updateAccountDetails, { data: merchantData, isSuccess, isLoading }] =
    useUpdateAccountDetailsMutation();
  
  const handleUpdateAccountDetails = async () => {
    setMerchantInfo({
      ...merchantInfo,
      dob: Date.now().toString(),
      o_name: '--'
    });

    try {
      if (
        merchantInfo.email &&
        merchantInfo.address &&
        merchantInfo.phone &&
        merchantInfo.f_name &&
        merchantInfo.l_name && 
        merchantInfo.o_name &&
        merchantInfo.dob
      ) {
        await updateAccountDetails(merchantInfo);
      } else {
        console.log(merchantInfo)
        toast.error('All fields are required');
      }
    } catch (err) {
      console.log(err);
    }

  };

  const [showToast, setShowToast] = useState(false);
  const showToastRef = useRef(false);
  
  useEffect(() => {
    if (isSuccess && merchantData.success == true && !showToastRef.current) {
      toast.success('Your account details have been successfully updated!');
      setShowToast(true);
      showToastRef.current = true;
      dispatch(setBusinessUpdated(true))
      setTimeout(() => {
        setMerchantInfo({
          f_name:'',
          l_name:'',
          o_name:'',
          email: '',
          phone: '',
          address: '',
          dob: ''
        });
        onClose();
      }, 100);
    } 
    else {
      toast.error(merchantData?.reason);
      dispatch(setBusinessUpdated(false))
    }
    
  },[isSuccess,merchantData,dispatch,onClose,showToastRef,showToast,merchantInfo]);

  
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
            <div className='w-[29rem] md:w-[33rem] h-[37rem] mt-36 mb-6 rounded-[0.63rem] bg-white'>
                <div className='flex flex-col mx-6 mt-6 '>
                    <div className='flex items-center justify-between'>
                       <h1 className='text-lg text-[#1B1A1A] font-WorkSans font-semibold leading-5'>Update Account details</h1>
                       <div className='cursor-pointer'  onClick={()=>{
                        onClose()
                        }}>
                            <Image src={CloseIcon} alt='Close Icon'/> 
                       </div>
                    </div>
                    <div className='flex flex-col gap-4 mt-6'>
                        <Input 
                        name='f_name'
                        value={merchantInfo.f_name}
                        onChange={(e) => setMerchantInfo({...merchantInfo, f_name: e.target.value})}
                        placeholder='First name'
                        label='First name' 
                        type='text' 
                        width='w-[26rem] md:w-[30rem]'
                        height='h-[3.13rem]'/>
                        <Input 
                        name='l_name'
                        value={merchantInfo.l_name}
                        onChange={(e) => setMerchantInfo({...merchantInfo, l_name: e.target.value})}
                        placeholder='Last name'
                        label='Last name' 
                        type='text' 
                        width='w-[26rem] md:w-[30rem]'
                        height='h-[3.13rem]'/>
                        <Input 
                        name='email'
                        value={merchantInfo.email}
                        onChange={(e) => setMerchantInfo({...merchantInfo, email: e.target.value})}
                        placeholder='example@gmail.com'
                        label='Email' 
                        type='email' 
                        width='w-[26rem] md:w-[30rem]'
                        height='h-[3.13rem]'
                        />
                        <Input 
                        name='phone'
                        value={merchantInfo.phone}
                        onChange={(e) => setMerchantInfo({...merchantInfo, phone: e.target.value})}
                        placeholder='+234'
                        label='Phone' 
                        type='text' 
                        width='w-[26rem] md:w-[30rem]'
                        height='h-[3.13rem]'
                        />
                        <Input 
                        name='address'
                        value={merchantInfo.address}
                        onChange={(e) => setMerchantInfo({...merchantInfo, address: e.target.value})}
                        placeholder=''
                        label='Address' 
                        type='text' 
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
                        <button onClick={handleUpdateAccountDetails} className='w-[10.21rem] h-11 bg-[#3063E9] rounded-[0.313rem] text-base text-white font-WorkSans font-normal leading-5'>
                        <div className='flex justify-center items-center'>{isLoading ? <Loader/> : 'Update details'}</div>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default EditAccountDetails