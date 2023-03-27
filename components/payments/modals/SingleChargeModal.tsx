import { faChevronDown, faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Image from 'next/image'
import React, { useEffect, useRef, useState } from 'react'
import CloseIcon from '../../../Assets/icon/CloseIcon.svg'
import { paymentPageApi, useCreatePaymentPageMutation, useLoadPaymentLinksQuery } from '../../../modules/PaymentPageApi/paymentPageApi'
import { setCompleted, setSecondStep } from '../../../redux/Modal-Processes/paymentLinkSlice'
import { useAppDispatch } from '../../../redux/redux-hooks/hooks'
import Input from '../../input fields/Input'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Loader from '../../Loader'

interface Props {
    isVisible:boolean
    onClose:()=>{}
}


const SingleChargeModal = ({isVisible,onClose}: Props) => {
    const handleClose = (e:any) =>{
        if(e.target.id === 'wrapper'){
            onClose()                                                   
        }
      }
     
    if (!isVisible) return null;
      const dispatch = useAppDispatch();
      const [paymentLinkInfo, setPaymentLinkInfo] = useState({
        title: '',
        fixed: true,
        amount: 0,
        description: '',
        redirect_url: '',
      });

      const [createPaymentLink, { data: paymentLinkData, isSuccess, isLoading }] =
      useCreatePaymentPageMutation();

      const  paymentPages = useLoadPaymentLinksQuery()


     
    const handleCreatePaymentLink = async () => {
      try {
        if (
          paymentLinkInfo.title &&
          paymentLinkInfo.fixed &&
          paymentLinkInfo.amount &&
          paymentLinkInfo.description &&
          paymentLinkInfo.redirect_url
        ) {
          await createPaymentLink(paymentLinkInfo);
          paymentPages.refetch()
        }
      } catch (err) {
        console.log(err);
      }
    };
    
    useEffect(() => {
      if (isSuccess && paymentLinkData.success == true) {
        toast.success('Your payment link has been successfully created!');
        setTimeout(()=> {
          onClose()
        },1000)
        setPaymentLinkInfo({
          title: '',
          fixed: true,
          amount: 0,
          description: '',
          redirect_url: '',
        });
      } else {
        toast.error(paymentLinkData?.reason);
      }
    }, [isSuccess]);

  return (
    <div>
        <ToastContainer/>
        <div className='fixed inset-0 bg-[#262626] bg-opacity-50 backdrop-blur-[0.05rem] z-20 flex justify-center items-center' id='wrapper' onClick={handleClose}>
            <div className='w-[29rem] md:w-[33.01rem] h-[35rem] md:h-[41.54rem] rounded-[0.63rem] bg-white'>
                <div className='flex flex-col mx-6 mt-6'>
                    <div className='flex justify-between items-center'>
                        <div className='flex items-center gap-2 cursor-pointer'  onClick={() => dispatch(setSecondStep(false))}>
                            <FontAwesomeIcon icon={faChevronLeft} />
                            <h1 className='text-lg text-[#1B1A1A] font-WorkSans font-semibold '>Single charge</h1>
                        </div>
                        <div className='cursor-pointer' onClick={()=>{
                            onClose()
                        }}>
                            <Image src={CloseIcon} alt='Close Icon'/>
                        </div>
                    </div>
                    <div className='flex flex-col gap-5 mt-6 '>
                        <Input 
                         name='title'
                         value={paymentLinkInfo.title}
                         onChange={(e) => setPaymentLinkInfo({...paymentLinkInfo, title: e.target.value})}
                        label='Page name' 
                        type='text' 
                        width='w-[26rem] md:w-[30rem]'/>
                        {/* <Input label='Description' type='text' width='w-[30rem]' height='h-[9.4rem]'/>
                         */}
                         <div>
                         <Input 
                            name='description'
                            value={paymentLinkInfo.description}
                            onChange={(e) => setPaymentLinkInfo({...paymentLinkInfo, description: e.target.value})}
                            label='Description'
                            type='text'
                            width='w-[26rem] md:w-[30rem]'
                          />
                         </div>
                        
                        <div className='flex flex-col '>
                            <h1 className='text-[#262626] text-sm font-WorkSans font-normal leading-4 mb-2'>Amount</h1>
                            <div className='flex items-center justify-between'>
                                <div className='flex justify-center gap-2 md:justify-between px-5 items-center border-[0.07rem]  border-solid border-[#CACACA] md:gap-0 rounded-[0.315rem] w-[5rem] md:w-[7.15rem] h-[3.15rem]'>
                                <h1 className='text-base text-[#262626] font-WorkSans font-normal leading-5'>NGN</h1>
                                <FontAwesomeIcon icon={faChevronDown}/>
                                </div>
                                <div>
                                <input 
                                    name='amount'
                                    value={paymentLinkInfo.amount}
                                    onChange={(e) => setPaymentLinkInfo({...paymentLinkInfo, amount: parseFloat(e.target.value)})}
                                type='number'
                                inputMode='numeric' 
                                placeholder='0.00' className='flex px-5 items-center border-[0.07rem] outline-none  border-solid border-[#CACACA] rounded-[0.315rem] w-[20rem] md:w-[22.5rem] h-[3.15rem]'/>
                                </div>
                            </div>
                            <h1 className='mt-1 text-sm text-[#1B1A1A] font-WorkSans font-medium leading-4 '>Leave empty to allow customers enter desired amount</h1>
                        </div>
                        <div>
                        <div className='flex flex-col gap-2'>
                            <label htmlFor="redirect" className='text-[#262626] text-sm font-WorkSans font-normal leading-4'>Redirect after payment <span>(Optional)</span></label>
                            <input 
                            name='redirect_url'
                            value={paymentLinkInfo.redirect_url}
                            onChange={(e) => setPaymentLinkInfo({...paymentLinkInfo, redirect_url: e.target.value})}
                            type='url' 
                            placeholder='https://' 
                            className='w-[26rem] md:w-[30rem] h-[3.15rem] border-[0.07rem] border-solid border-[#CACACA] outline-none rounded-[0.32rem] text-base text-[#1B1A1A] font-WorkSans font-normal leading-4 px-4'/>
                        </div>
                        </div>
                        {/* <div className='flex flex-col '>
                            <h1 className='text-[#262626] text-sm font-WorkSans font-normal leading-4 mb-2'>Upload image</h1>
                            <div  className='flex justify-between items-center bg-[#F5F5F5] w-[30rem] h-[3.15rem] border-[0.07rem] border-solid border-[#CACACA] outline-none rounded-[0.32rem] text-base text-[#1B1A1A] font-WorkSans font-normal cursor-pointer leading-4 px-4'
                            onClick={handleClick}
                            >
                              <h1 className='text-base text-[#1B1A1A] font-WorkSans font-normal leading-5'>Select an image</h1>
                              <FontAwesomeIcon icon={faChevronRight}/>
                            </div>
                            <input type='file' ref={hiddenFileInput} onChange={handleChange} className='hidden'/>
                            <p className='mt-1 text-sm text-[#1B1A1A] font-WorkSans font-medium leading-4 '>Leaving this field blank adds the default image to the link</p>
                        </div> */}
                        <div className='flex items-center justify-end gap-4 mt-5'>
                            <button className='flex items-center justify-center w-[5.4rem] h-11 bg-[#F5F5F5] rounded-[0.313rem] text-base text-[#262626] font-WorkSans font-normal leading-5'>
                            Cancel
                            </button>
                            <button onClick={handleCreatePaymentLink} className='w-[7.5rem] h-11 bg-[#3063E9] rounded-[0.313rem] text-base text-white font-WorkSans font-normal leading-5'>
                                <div className='flex justify-center items-center'>{isLoading ? <Loader/> : 'Create Link'}</div>
                            </button>
                        </div>
                        
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default SingleChargeModal