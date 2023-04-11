import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import Input from '../../input fields/Input'
import CloseIcon from '../../../Assets/icon/CloseIcon.svg'
import { setSecondStep } from '../../../redux/invoiceSlice'
import { useAppDispatch, useAppSelector } from '../../../redux/redux-hooks/hooks'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import { useCreateInvoiceMutation } from '../../../modules/Invoices/invoiceApi'
import { RootState } from '../../../redux/store'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import Loader from '../../Loader'



interface Props {
    isVisible:boolean
    onClose:()=>{}
}



const CompleteInvoiceModal = ({isVisible,onClose}: Props) => {
    const dispatch = useAppDispatch();
    const invoicePrevData = useAppSelector((state: RootState) => state.invoice.invoices);
    const [itemsCount,setItemsCount] = useState<number>(0)
  
    const { ref, full_name, email, phone, address } = invoicePrevData;
  
    const [invoiceData, setInvoiceData] = useState<any>({
      ref,
      full_name,
      email,
      phone,
      address,
      order: [],
    });
  
    const [order, setOrder] = useState({
      name: '',
      quantity: 0,
      price: 0,
    });
  
    const addOrder = (newOrder: any) => {
      // this creates a shallow copy  of the invoiceData order and adds the neworder to it
      if (newOrder.name != '' && newOrder.quantity != 0 && newOrder.price != 0) {
        const allOrders = [...invoiceData.order, newOrder];
        setItemsCount(allOrders.length)

          // here we now add the allOrders to the invoiceData  as an order
        setInvoiceData({ ...invoiceData, order: allOrders });
        // Here we set any new order we create
        setOrder({ name: '', quantity: 0, price: 0 })
        console.log('All orders', allOrders);
      } else {
        toast.error('Fill in item  information');
      }
     
    };
  
    const [createInvoice, { data: creatInvoiceData, isSuccess, isLoading }] = useCreateInvoiceMutation();
  
    const handleCreateInvoice = async () => {
      try {
        //Here we check that no value passed into the invoiceData object is undefined
        if (Object.values(invoiceData).every((value) => value !== undefined)) {
          if (invoiceData != undefined) {
            await createInvoice(invoiceData) 
          } else {
             toast.error('Fill in item information');
          }
        }
      } catch (err) {
        console.log(err);
      }

    };
  
    useEffect(() => {
      if (isSuccess && creatInvoiceData?.success) {
        dispatch(setSecondStep(false))
        onClose();
        console.log(creatInvoiceData);
      } else {
        toast.error(creatInvoiceData?.reason,{autoClose:1000})
        dispatch(setSecondStep(false))
        onClose()
      }
    }, [isSuccess, creatInvoiceData]);

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
            <div className='w-[22.5rem] md:w-[27rem]  lg:w-[33rem] h-[33.71rem] mt-32 mb-6 rounded-[0.63rem] bg-white'>
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
                            <h1 className='text-[#3063E9] text-sm font-WorkSans font-normal leading-4'>Step 2 of 2</h1>
                        </div>
                        <div>
                            <h1 className='text-base lg:text-lg text-[#262626] font-WorkSans font-medium leading-5'>Item information</h1>
                        </div>
                    </div>
                    <div className='flex flex-col gap-6 mt-6 '>
                        <Input 
                        width='w-[20.5rem] md:w-[25rem] lg:w-[30rem]'
                        name='name'
                        value={order.name}
                        onChange={(e) => setOrder({...order, name: e.target.value})} 
                        type='text' 
                        label='Item name' 
                        placeholder='Item name'/>
                        <Input 
                        width='w-[20.5rem] md:w-[25rem] lg:w-[30rem]' 
                        name='quantity'
                        value={order.quantity.toString()}
                        onChange={(e) => setOrder({...order, quantity: parseInt(e.target.value)})} 
                        type='number' 
                        label='Quantity' 
                        placeholder='1'/>
                        <Input 
                        width='w-[20.5rem] md:w-[25rem] lg:w-[30rem]' 
                        inputMode='numeric'
                        name='price'
                        value={order.price.toString()}
                        onChange={(e) => setOrder({...order, price: parseInt(e.target.value)})}
                        type='number'  
                        label='Unit price' 
                        placeholder='0.00'/>
                        <div className='flex justify-between items-center'>
                          <h1 className='text-sm text-[#1B1A1A] font-WorkSans font-normal leading-4'>{itemsCount} item(s)</h1>
                          <div onClick={() => addOrder(order)} className='flex justify-end items-center gap-2 cursor-pointer'>
                              <h1 className='text-sm text-[#1B1A1A] font-WorkSans font-normal leading-4'>Add item</h1>
                              <FontAwesomeIcon  icon={faPlus} className='text-primary'/>
                          </div>
                        </div>
                        <div className='flex items-center justify-end gap-4 mt-2'>
                            <button className='flex items-center justify-center w-[5.4rem] h-11 bg-[#F5F5F5] rounded-[0.313rem] text-base text-[#262626] font-WorkSans font-normal leading-5'>
                            Cancel
                            </button>
                            <div onClick={() => {
                                handleCreateInvoice()
                                }} className='w-[6.5rem] cursor-pointer h-11 flex justify-center items-center bg-[#3063E9] rounded-[0.313rem] text-base text-white font-WorkSans font-normal leading-5'>
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

export default CompleteInvoiceModal