import Image from 'next/image'
import React, { useEffect } from 'react'
import DeleteIcon from '../../../Assets/icon/DeleteIcon.svg'
import { useDeletePaymentPageMutation, useLoadPaymentLinksQuery } from '../../../modules/PaymentPageApi/paymentPageApi'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Loader from '../../Loader'

interface Props {
    isVisible:boolean
    onClose:()=>{},
    pageID:string,
    amount:number,
    pageName:string
  }

const DeleteLinkModal = ({isVisible,onClose,pageID}: Props) => {


    const [deletePaymentLink, { data: deleteLinkData, isSuccess, isLoading }] =
  useDeletePaymentPageMutation();

  const  paymentPages = useLoadPaymentLinksQuery()
  


 
const handleDeletePaymentLink = async () => {
  try {
    if (pageID) {
      await deletePaymentLink(pageID);
      paymentPages.refetch()
    }
  } catch (err) {
    console.log(err);
  }
  // onClose()
};

    useEffect(() => {
        if (isSuccess ) {
            toast.success('You have successfully deleted the payment link!',{autoClose:800})
            // setTimeout(() => {
            //     onClose()
            // },1500)
        } else {
            toast.error(deleteLinkData?.reason)
        }
    },[isSuccess,deleteLinkData])

    const handleClose = (e:any) =>{
        if(e.target.id === 'wrapper'){
            onClose()                                                   
        }
    };
    if (!isVisible) return null;

  return (
    <div>
        <ToastContainer/>
        <div className='fixed inset-0 bg-[#262626] z-30 bg-opacity-50 backdrop-blur-[0.05rem] flex justify-center items-center'  id='wrapper' onClick={handleClose}>
            <div className='flex flex-col gap-6 w-[20rem] h-[16.325rem] py-6 rounded-[0.63rem] bg-white'>
                <h1 className='text-center text-lg text-[#1B1A1A] font-WorkSans font-semibold leading-5 '>Delete payment link</h1>
               <div className='flex justify-center items-center '>
                    <Image
                    src={DeleteIcon}
                    alt='Delete Icon'
                    className='w-11 h-11'
                    />
                </div>
                <div className='flex justify-center'>
                    <h2 className='w-[17rem] text-center text-sm text-[#1B1A1A] font-WorkSans font-normal leading-4'>Are you sure you want to delete the payment link?</h2>
                </div>
                <div className='flex justify-center items-center gap-3'>
                    <div onClick={() => onClose()} className='bg-[#F5F5F5] cursor-pointer flex justify-center items-center w-[8.125rem] h-11 rounded-[0.3125rem] text-sm text-[#1B1A1A] font-WorkSans font-normal leading-4'>
                        <h1>{`No, don’t delete`}</h1>
                    </div>
                    <div onClick={handleDeletePaymentLink} className='bg-primary cursor-pointer flex justify-center items-center w-[8.125rem] h-11 rounded-[0.3125rem] text-sm text-white font-WorkSans font-normal leading-4'>
                        {isLoading ? <Loader isWhite={true}/> : <h1>Yes, Delete</h1>}
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default DeleteLinkModal