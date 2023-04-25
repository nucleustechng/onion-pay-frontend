import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import Input from '../../input fields/Input'
import CloseIcon from '../../../Assets/icon/CloseIcon.svg'
import { setSecondStep, setSliceInvoice } from '../../../redux/invoiceSlice'
import { useAppDispatch } from '../../../redux/redux-hooks/hooks'
import Loader from '../../Loader'
import {  ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import 'react-toastify/dist/ReactToastify.css';




interface Props {
    isVisible:boolean
    onClose:()=>{}
}

type InvoiceForm = {
    full_name:string,
    email:string,
    phone:string,
    address:string,
    ref:string
}

const CreateInvoiceModal = ({isVisible,onClose}: Props) => {
    // const [invoices, setInvoices] = useState<InvoiceForm[]>([]);
    const dispatch = useAppDispatch();
    const [isLoading,setIsloading] = useState<boolean>();

    const [invoiceInfo, setInvoiceInfo] = useState<InvoiceForm>({
        full_name: '',
        email: '',
        phone: '',
        address: '',
        ref:''
      });



      const handleSubmit = () => {
        // const { full_name, email, phone, address, ref } = invoiceInfo;


        // if (!full_name || !email || !phone || !address || !ref) {
        //     toast.error('Please fill in all fields');
        //     return;
        //   }

        setInvoiceInfo({
          full_name: '',
          email: '',
          phone: '',
          address: '',
          ref:''
        });
        dispatch(setSliceInvoice(invoiceInfo))
    
        setIsloading(true)
        setTimeout(() => {
            setIsloading(false)
            dispatch(setSecondStep(true))
        },500)
      };

      useEffect(() => {

      },[])
      

  

      const handleClose = (e:any) =>{
        if(e.target.id === 'wrapper'){
            onClose()                                                   
        }
      }
      if (!isVisible) return null;
  
  return (
    <div>
        <ToastContainer/>
        <div className='fixed inset-0 bg-[#262626] z-40
        0 bg-opacity-50 backdrop-blur-[0.05rem] flex justify-center items-center overflow-y-scroll' id='wrapper' onClick={handleClose}>
            <div className='w-[22.5rem] md:w-[27rem]  lg:w-[33rem] h-[37.71rem] mt-32 mb-6 rounded-[0.63rem] bg-white'>
                <div className='mx-4 lg:mx-6 mt-7'>
                    <div className='flex items-center justify-between'>
                        <h1 className='text-[#262626] text-lg leading-5 font-WorkSans font-medium'>Create an invoice</h1>
                    <div>
                        <Image src={CloseIcon} className='cursor-pointer' onClick={()=>{
                            onClose()
                        }} alt='Close Icon'/> 
                    </div>
                    </div>
                    <div className='flex items-center gap-4 md:gap-5 lg:gap-[4.15rem] mt-8'>
                        <div className='flex justify-center items-center w-[5.32rem] h-5 border-solid border-[0.07rem] border-[#3063E9] rounded-[1.25rem]'>
                            <h1 className='text-[#3063E9] text-sm font-WorkSans font-normal leading-4'>Step 1 of 2</h1>
                        </div>
                        <div>
                            <h1 className='text-base lg:text-lg text-[#262626] font-WorkSans font-medium leading-5'>Client information</h1>
                        </div>
                    </div>
                    <div className='flex flex-col gap-6 mt-6 '>
                        <Input
                        width='w-[20.5rem] md:w-[25rem] lg:w-[30rem]'
                        name='full_name'
                        value={invoiceInfo.full_name}
                        onChange={(e) => setInvoiceInfo({...invoiceInfo, full_name: e.target.value})}
                        type='text' 
                        label='Client name' 
                        placeholder='Client name'
                        />
                        <Input 
                        width='w-[20.5rem] md:w-[25rem] lg:w-[30rem]' 
                        name='email'
                        value={invoiceInfo.email}
                        onChange={(e) => setInvoiceInfo({...invoiceInfo, email: e.target.value})}
                        type='email' 
                        label='Client email' 
                        placeholder='email@example.com'
                        />
                        <Input 
                        width='w-[20.5rem] md:w-[25rem] lg:w-[30rem]' 
                        name='phone'
                        value={invoiceInfo.phone}
                        onChange={(e) => setInvoiceInfo({...invoiceInfo, phone: e.target.value})}
                        type='text' 
                        label='Client phone' 
                        placeholder='+234'
                        />
                        <Input 
                        width='w-[20.5rem] md:w-[25rem] lg:w-[30rem]'
                        value={invoiceInfo.address}
                        onChange={(e) => setInvoiceInfo({...invoiceInfo, address: e.target.value})} 
                        name='address'
                        type='text' label='Client address' 
                        />
                        
                        <div className='flex items-center justify-end gap-4 mt-2'>
                            <button className='flex items-center justify-center w-[5.4rem] h-11 bg-[#F5F5F5] rounded-[0.313rem] text-base text-[#262626] font-WorkSans font-normal leading-5'>
                            Cancel
                            </button>
                            <div onClick={handleSubmit} className='w-[6.5rem] h-11 cursor-pointer flex items-center justify-center bg-[#3063E9] rounded-[0.313rem] text-base text-white font-WorkSans font-normal leading-5'>
                            {isLoading ? <Loader/> : 'Continue'}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default CreateInvoiceModal