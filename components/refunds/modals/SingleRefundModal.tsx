import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import CloseIcon from '../../../Assets/icon/CloseIcon.svg'
import { useRequestRefundMutation } from '../../../modules/Refunds/refundApi'
import { useAppDispatch } from '../../../redux/redux-hooks/hooks'
import Input from '../../input fields/Input'
import Loader from '../../Loader';


interface Props {
    isVisible:boolean
    onClose:()=>{}
}

type RefundForm = {
    t_id:string,
    partial:boolean,
    amount:number,
    reason:string
}

const SingleRefundModal = ({isVisible,onClose}: Props) => {
    const dispatch = useAppDispatch()

    const [refundInfo, setRefundInfo] = useState<RefundForm>({
        t_id:'',
        partial:true,
        amount:0,
        reason:''
    });


    const [requestRefund, { data: refundData, isSuccess, isLoading }] =
    useRequestRefundMutation();
  
  const handleRequestRefund = async () => {
    try {
      if (
        refundInfo.t_id &&
        refundInfo.partial &&
        refundInfo.amount &&
        refundInfo.reason 
      ) {
        await requestRefund(refundInfo);
      }
    } catch (err) {
      console.log(err);
    }
  };
  
  useEffect(() => {
    if (isSuccess && refundData.success == true) {
      toast.success('You have successfully logged a refund.We will get back to you after 2 business days.');

      setTimeout(() => {
        onClose()
      },1500)
      setRefundInfo({
        t_id:'',
        partial:true,
        amount:0,
        reason:''
      });
    } else {
      toast.error(refundData?.reason);
    }
  },[isSuccess,refundData,dispatch]);
    const handleClose = (e:any) =>{
        if(e.target.id === 'wrapper'){
            onClose()                                                   
        }
      }
      if (!isVisible) return null;
  
  return (
    <div>
        <ToastContainer/>
        <div className='fixed inset-0 bg-[#262626] bg-opacity-50 backdrop-blur-[0.05rem] z-50 flex justify-center items-center overflow-y-scroll' id='wrapper' onClick={handleClose}>
            <div className='w-[20rem] md:w-[33rem] h-[28rem]  mt-32 md:mb-56 lg:mb-0 md:mt-0 mb-6 rounded-[0.63rem] bg-white'>
                <div className='mx-6 mt-7'>
                    <div className='flex items-center justify-between'>
                        <div className='flex items-center gap-2'>
                            {/* <FontAwesomeIcon icon={faChevronLeft}/> */}
                            <h1 className='text-[#262626] text-lg leading-5 font-WorkSans font-medium'>Log refund</h1>
                        </div>
                        <div>
                            <Image src={CloseIcon} className='cursor-pointer' onClick={()=>{
                            onClose()
                        }}  alt="Close Icon"/>
                        </div>
                    </div>
                    <div className='flex flex-col gap-6 mt-6'>
                        <div>
                            <Input 
                            name='t_id'
                            value={refundInfo.t_id}
                            onChange={(e) => setRefundInfo({...refundInfo, t_id: e.target.value})}
                            placeholder='Transaction id'
                            label='Transaction ID' 
                            type='text' 
                            width='w-[17rem] md:w-[30rem]'
                            height='h-[3.13rem]'
                            />
                        </div>
                        <div>
                            <Input
                            name='amount'
                            value={refundInfo.amount.toString()}
                            onChange={(e) => setRefundInfo({...refundInfo, amount: parseInt(e.target.value)})}
                            width='w-[17rem] md:w-[30rem]'
                            height='h-[3.13rem]'
                            type='number' 
                            label='How much do you want to refund'  
                            placeholder='0.00'
                            />
                        </div>
                        <div className='flex flex-col'>
                            <Input
                            name='reason'
                            value={refundInfo.reason}
                            onChange={(e) => setRefundInfo({...refundInfo, reason: e.target.value})}
                            width='w-[17rem] md:w-[30rem]'
                            height='h-[3.13rem]'
                            type='text' 
                            label='Comments'  
                            placeholder='Explain the reason for logging this refund'
                            />
                            {/* <h1 className='text-[#262626] text-sm font-WorkSans font-normal leading-4'>Comments</h1>
                            <div className='relative'>
                                <textarea 
                                
                                className='w-[30rem] h-[11.07rem] 
                                rounded-[0.313rem] pl-6 pt-4 pr-20 
                                border-[0.07rem] border-solid border-[#CACACA] 
                                outline-none text-[#898989] text-sm 
                                font-WorkSans font-normal leading-4' 
                                placeholder='Explain the reason for logging this refund '></textarea>
                                <h1 className='absolute bottom-[9.4rem] left-[25rem] text-[#898989] text-sm font-WorkSans font-normal leading-4'>0 / 255</h1>
                            </div> */}
                        </div>
                        <div className='flex items-center justify-end gap-4 mt-2'>
                            <button onClick={() => onClose()} className='flex items-center justify-center w-[5.4rem] h-11 bg-[#F5F5F5] rounded-[0.313rem] text-base text-[#262626] font-WorkSans font-normal leading-5'>
                            Cancel
                            </button>
                            <div onClick={handleRequestRefund} className='flex justify-center items-center cursor-pointer w-[9.4rem] h-11 bg-[#3063E9] rounded-[0.313rem] text-base text-white font-WorkSans font-normal leading-5'>
                             {isLoading ? <Loader isWhite={true}/> : <h1>Process refund</h1>}
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    </div>
  )
}

export default SingleRefundModal