import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import Input from '../../input fields/Input'
import CloseIcon from '../../../Assets/icon/CloseIcon.svg'
import { setSecondStep } from '../../../redux/invoiceSlice'
import { useAppDispatch } from '../../../redux/redux-hooks/hooks'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import { useCreateInvoiceMutation } from '../../../modules/Invoices/invoiceApi'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronDown, faPlus } from '@fortawesome/free-solid-svg-icons'
import Loader from '../../Loader'



interface Props {
    isVisible:boolean
    onClose:()=>{},
    data:any
}



const CompleteInvoiceModal = ({isVisible,onClose,data}: Props) => {
  const dispatch = useAppDispatch();
  const [itemsCount, setItemsCount] = useState<number>(0);
  const retrievedData:any = data;
  const [open, setOpen] = useState<any>([]);

  const toggleOpen = (index:any) => {
    const updatedOpen = [...open];
    updatedOpen[index] = !updatedOpen[index];
    setOpen(updatedOpen);
  };
  

  const [invoiceData, setInvoiceData] = useState<any>({
    ref: '',
    full_name: '' ,
    email: '',
    phone: '',
    address: '',
    order: [],
  });
  
  const [order, setOrder] = useState({
    name: '',
    quantity: 0,
    price: 0,
  });
  
  const addOrder = (newOrder: any) => {
    if (newOrder.name !== '' && newOrder.quantity !== 0 && newOrder.price !== 0) {
      const allOrders = [...invoiceData.order, newOrder];
      setItemsCount(invoiceData.order.length + 1);
      setInvoiceData({ ...invoiceData, order: allOrders });
      setOrder({ name: '', quantity: 0, price: 0 });
      toast.success('You have successfully added an item')
    } else {
      toast.error('Fill in item information');
    }
    console.log('Items',invoiceData);
  };
  
  const [createInvoice, { data: createInvoiceData, isSuccess, isLoading }] = useCreateInvoiceMutation();
  
  const handleCreateInvoice = async () => {
    console.log(invoiceData?.full_name)
    try {
      let dataToSend = { ...invoiceData };
      if (invoiceData.order.length === 0) {
        // If there is no order in the invoiceData, add the order in the state to the order array
        dataToSend.order.push(order);
      }
      if (dataToSend.order.length > 0 && Object.values(dataToSend).every((value) => value !== undefined)) {
        await createInvoice(dataToSend);
      } else {
        toast.error('Please add at least one item to the order and fill in all invoice information');
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    setInvoiceData({
      ref: retrievedData?.ref,
      full_name: retrievedData?.full_name,
      email: retrievedData?.email,
      phone: retrievedData?.phone,
      address: retrievedData?.address,
      order: invoiceData.order // preserve the previous order property
    });
  }, [data,itemsCount,retrievedData]);
  
  useEffect(() => {
    console.log('Length',invoiceData?.order.length)
    if (isSuccess && createInvoiceData?.success) {
      toast.success('Your invoice has been sent successfully. You will receive an email shortly',{autoClose:2000});

      setTimeout(() => {
      dispatch(setSecondStep(false));
      onClose()
      setInvoiceData({
        ref: '',
        full_name: '',
        email: '',
        phone: '',
        address: '',
        order: []
      });
      setItemsCount(0); 
      },2500)

    } else {
      toast.error(createInvoiceData?.reason, { autoClose: 1000 });
    }
  }, [isSuccess, createInvoiceData, dispatch,itemsCount]);
  

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
            <div className={`w-[22.5rem] md:w-[27rem]  lg:w-[33rem] ${invoiceData?.order.length > 0 ? 'h-[45rem]' : 'h-[39.71rem]'} mt-32 mb-6 rounded-[0.63rem] bg-white`}>
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
                    <div className={`${invoiceData?.order.length > 0 ? 'h-[29rem]' : 'h-[26rem]'} scrollbar-hide overflow-y-scroll`}>
                    <div className={`flex flex-col px-4 py-3 gap-6 mt-6 w-auto h-[22rem]  border-[0.0625rem] border-primary rounded-md`}>
                    <div className="flex items-center justify-between ">
                      <div>Item 1</div>
                      {/* <FontAwesomeIcon 
                        icon={faChevronDown}
                        className="h-5 w-5 cursor-pointer"
                        onClick={toggleOpen}
                        aria-hidden="true"
                      /> */}
                    </div>
                       <div className='flex flex-col gap-6 '>
                        <Input 
                        width='w-[20.5rem] md:w-[25rem] lg:w-[28rem]'
                        name='name'
                        value={order.name}
                        onChange={(e) => setOrder({...order, name: e.target.value})} 
                        type='text' 
                        label='Item name' 
                        placeholder='Item name'/>
                        <Input 
                        width='w-[20.5rem] md:w-[25rem] lg:w-[28rem]' 
                        name='quantity'
                        value={order.quantity.toString()}
                        onChange={(e) => setOrder({...order, quantity: parseInt(e.target.value)})} 
                        type='number' 
                        label='Quantity' 
                        placeholder='1'/>
                        <Input 
                        width='w-[20.5rem] md:w-[25rem] lg:w-[28rem]' 
                        name='price'
                        value={order.price.toString()}
                        onChange={(e) => setOrder({...order, price: parseInt(e.target.value)})}
                        type='number'  
                        label='Unit price' 
                        placeholder='0.00'/>
                        </div>
                    </div>

                    {invoiceData.order.map((item:any,index:any) => (<div key={index} className={`flex flex-col px-4 py-3 gap-6 mt-6 w-auto ${
                      open[index] ? 'h-[22rem] transition-all duration-500 ease-in' : 'h-[3.25rem] transition-all ease-out duration-500'
                      }  border-[0.0625rem] border-primary rounded-md`}>
                    <div className="flex items-center justify-between ">
                      <div>Item {index + 2}</div>
                      <FontAwesomeIcon 
                        icon={faChevronDown}
                        className="h-5 w-5 cursor-pointer"
                        onClick={() => toggleOpen(index)}
                        aria-hidden="true"
                      />
                    </div>
                      {open[index] && <div className='flex flex-col gap-6 '>
                        <Input 
                        width='w-[20.5rem] md:w-[25rem] lg:w-[28rem]'
                        name='name'
                        value={item.name}
                        onChange={(e) => {
                          const updatedItems = [...invoiceData.order];
                          updatedItems[index].name = e.target.value;
                          setInvoiceData({ ...invoiceData, order: updatedItems });
                        }}
              
                        type='text' 
                        label='Item name' 
                        placeholder='Item name'/>
                        <Input 
                        width='w-[20.5rem] md:w-[25rem] lg:w-[28rem]' 
                        name='quantity'
                        value={item.quantity.toString()}
                        onChange={(e) => {
                          const updatedItems = [...invoiceData.order];
                          updatedItems[index].quantity = parseInt(e.target.value);
                          setInvoiceData({ ...invoiceData, order: updatedItems });
                        }}
                        type='number' 
                        label='Quantity' 
                        placeholder='1'/>
                        <Input 
                        width='w-[20.5rem] md:w-[25rem] lg:w-[28rem]' 
                        name='price'
                        value={item.price.toString()}
                        onChange={(e) => {
                          const updatedItems = [...invoiceData.order];
                          updatedItems[index].price = parseInt(e.target.value);
                          setInvoiceData({ ...invoiceData, order: updatedItems });
                        }}
                        type='number'  
                        label='Unit price' 
                        placeholder='0.00'/>
                        </div>}
                    </div>))}
                    </div>
                    {/* <div className="flex items-center justify-between ">
                      <div>Collapsed Content</div>
                      <FontAwesomeIcon 
                        icon={faChevronDown}
                        className="h-5 w-5 cursor-pointer"
                        // onClick={toggleOpen}
                        aria-hidden="true"
                      />
                    </div> */}
                    <div className={`flex justify-between items-center ${invoiceData?.order.length > 0 ? 'mt-6' : 'mt-2'}`}>
                          <h1 className='text-sm text-[#1B1A1A] font-WorkSans font-normal leading-4'>{itemsCount} item(s)</h1>
                          <div onClick={() => addOrder(order)} className='flex justify-end items-center gap-2 cursor-pointer'>
                              <h1 className='text-sm text-[#1B1A1A] font-WorkSans font-normal leading-4'>Add item</h1>
                              <FontAwesomeIcon  icon={faPlus} className='text-primary'/>
                          </div>
                        </div>
                        <div className='flex items-center justify-end gap-4 mt-6'>
                            <button className='flex items-center justify-center w-[5.4rem] h-11 bg-[#F5F5F5] rounded-[0.313rem] text-base text-[#262626] font-WorkSans font-normal leading-5'>
                            Cancel
                            </button>
                            <div onClick={() => {
                                handleCreateInvoice()
                                }} className='w-[6.5rem] cursor-pointer h-11 flex justify-center items-center bg-[#3063E9] rounded-[0.313rem] text-base text-white font-WorkSans font-normal leading-5'>
                                    {isLoading ? <Loader isWhite={true}/> : 'Continue'}
                            </div>
                        </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default CompleteInvoiceModal