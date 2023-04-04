import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import Input from '../../input fields/Input'
import CloseIcon from '../../../Assets/icon/CloseIcon.svg'
import { setSecondStep } from '../../../redux/invoiceSlice'
import { useAppDispatch, useAppSelector } from '../../../redux/redux-hooks/hooks'
import { toast } from 'react-toastify'
import { useCreateInvoiceMutation } from '../../../modules/Invoices/invoiceApi'
import { RootState } from '../../../redux/store'
import { Order } from '../../../redux/interfaces/OrderInterface'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'



interface Props {
    isVisible:boolean
    onClose:()=>{}
}

// interface OrderItem {
//     name: string;
//     quantity: number;
//     price: number;
//   }
  
//   interface Order {
//     ref: string;
//     full_name: string;
//     email: string;
//     phone: string;
//     address: string;
//     order: OrderItem[];
//   }

const CompleteInvoiceModal = ({isVisible,onClose}: Props) => {
    const dispatch = useAppDispatch()
    const  invoicePrevData = useAppSelector((state:RootState) => state.invoice.invoices)
    const ref = invoicePrevData.ref
    const full_name = invoicePrevData.full_name
    const email = invoicePrevData.email
    const phone = invoicePrevData.phone
    const address = invoicePrevData.address





    const [invoiceData, setInvoiceData] = useState<any>({
        ref: ref,
        full_name: full_name,
        email: email,
        phone: phone,
        address: address,
        order: [{name:'',quantity:0,price:0}]  

    });

    const [order, setOrder] = useState({
        name: '',
        quantity: 0,
        price: 0
      });
      
    const addOrder = () => {
        const newOrder = {name: 'Trouser', quantity: 2, price: 400};
        setInvoiceData({
          ...invoiceData,
          order: [...invoiceData.order, newOrder]
        });
      };
      

    const [createInvoice, { data: creatInvoiceData, isSuccess, isLoading }] =
    useCreateInvoiceMutation();
  
  const handleCreateInvoice = async () => {
    // try {
    //     if (Object.values(invoiceData).every((value) => value !== undefined)) {
    //         await createInvoice(invoiceData);
    //       }          
    // } catch (err) {
    //   console.log(err);
    // }
    console.log(invoiceData)
    // dispatch(setSecondStep(false))
    onClose()
  };

  
  useEffect(() => {
    if (isSuccess && creatInvoiceData?.success) {
        console.log(creatInvoiceData)
    } else {
        console.log('An error occurred')
    }
  },[]);

      const handleClose = (e:any) =>{
        if(e.target.id === 'wrapper'){
            onClose()                                                   
        }
      }
      if (!isVisible) return null;
  
  return (
    <div>
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
                        value={invoiceData.order[0]?.name}
                        onChange={(e) => setInvoiceData({
                            ...invoiceData,
                            order: [{...invoiceData.order[0],
                                    name: e.target.value
                                }
                            ]
                        })}
                        type='text' 
                        label='Item name' 
                        placeholder='Item name'/>
                        <Input 
                        width='w-[20.5rem] md:w-[25rem] lg:w-[30rem]' 
                        name='quantity'
                        value={invoiceData.order[0]?.quantity}
                        onChange={(e) => setInvoiceData({
                            ...invoiceData,
                            order: [{...invoiceData.order[0],
                                    quantity: e.target.value
                                }
                            ]
                        })}
                        type='number' 
                        label='Quantity' 
                        placeholder='1'/>
                        <Input 
                        width='w-[20.5rem] md:w-[25rem] lg:w-[30rem]' 
                        inputMode='numeric'
                        name='price'
                        value={invoiceData.order[0]?.price}
                        onChange={(e) => setInvoiceData({
                            ...invoiceData,
                            order: [{...invoiceData.order[0],
                                    price: e.target.value
                                }
                            ]
                        })}
                        type='number'  
                        label='Price' 
                        placeholder='0.00'/>
                        <div onClick={addOrder} className='flex justify-end items-center gap-2 cursor-pointer'>
                            <h1 className='text-sm text-[#1B1A1A] font-WorkSans font-normal leading-4'>Add item</h1>
                            <FontAwesomeIcon  icon={faPlus} className='text-primary'/>
                        </div>
                        <div className='flex items-center justify-end gap-4 mt-2'>
                            <button className='flex items-center justify-center w-[5.4rem] h-11 bg-[#F5F5F5] rounded-[0.313rem] text-base text-[#262626] font-WorkSans font-normal leading-5'>
                            Cancel
                            </button>
                            <button onClick={() => {
                                handleCreateInvoice()
                                }} className='w-[6.5rem] h-11 bg-[#3063E9] rounded-[0.313rem] text-base text-white font-WorkSans font-normal leading-5'>
                            Continue
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default CompleteInvoiceModal