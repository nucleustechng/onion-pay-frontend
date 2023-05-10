import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import CloseIcon from '../../Assets/icon/CloseIcon.svg'
import Input from '../input fields/Input'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Loader from '../Loader'
import { useLoadBanksQuery, useUpdateBankAccountDetailsMutation } from '../../modules/BankAccountApi/bankaccountApi';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';

interface Props {
    isVisible:boolean,
    onClose:()=>{},
}

interface IBankDetails {
    bank:string,
    account_number:string,
    settle_to_bank:boolean
}

const EditBankAccountDetails = ({isVisible,onClose}: Props) => {
    const [banksArray,setBanksArray] = useState<any>()

    const [bankDetails,setBankDetails] = useState<IBankDetails>({
        bank:'',
        account_number:'',
        settle_to_bank:true
    })

    const {data:banksData,isSuccess} = useLoadBanksQuery();
    const [updateBankDetails,{isSuccess:updateBankSuccess,isLoading:updateBankLoading}] = useUpdateBankAccountDetailsMutation()

    const handleUpdate = async () => {
        const {bank,account_number,settle_to_bank} = bankDetails;
        try {
            if (bank && account_number && settle_to_bank) {
                await updateBankDetails({bank,account_number,settle_to_bank})
            } else {
                toast.error("All fields are required!")
            }
        } catch (error) {
            console.log(error)
        }
    
    }

    useEffect(() => {
        if (isSuccess){
            setBanksArray(banksData['banks'])
        }
    },[isSuccess])

    useEffect(() => {
        setBankDetails({...bankDetails,settle_to_bank:true})
        console.log(bankDetails)
        if (updateBankSuccess) {
            toast.success("Your bank account details have been updated succesfully!")
            setTimeout(() => {
                onClose()
            },1000)
        }
    },[updateBankSuccess])

  
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
            <div className='w-[29rem] md:w-[33rem] h-[19rem] mt-36 mb-6 rounded-[0.63rem] bg-white'>
                <div className='flex flex-col mx-6 mt-6 '>
                    <div className='flex items-center justify-between'>
                       <h1 className='text-lg text-[#1B1A1A] font-WorkSans font-semibold leading-5'>Edit bank account details</h1>
                       <div className='cursor-pointer'  onClick={()=>{
                        onClose()
                        }}>
                            <Image src={CloseIcon} alt='Close Icon'/> 
                       </div>
                    </div>
                    <div className='flex flex-col gap-4 mt-6'>
                        <div className='relative'>
                            <select className='w-[26rem] md:w-[30rem] h-[3.313rem]  focus:caret-primary outline-none 
                            rounded-[0.313rem] border-[0.0625rem] border-[#CACACA] pl-4 
                            text-sm text-[#898989] font-WorkSans font-normal leading-4'
                            onChange={(e) => setBankDetails({...bankDetails,bank: e.target.value})}
                            >
                                <option value="">Select a bank</option>
                                {banksArray?.map((bank:any) => (<option key={bank?.bankName}  value={bank?.bankName} 
                                >{bank?.bankName}</option>))}
                            </select>
                            <FontAwesomeIcon icon={faChevronDown} className='absolute top-[1rem] right-[1.1rem]'/>
                        </div>
                        <Input 
                        name='account_number'
                        value={bankDetails?.account_number}
                        onChange={(e) => setBankDetails({...bankDetails, account_number: e.target.value})}
                        placeholder='Account number'
                        label='Account number' 
                        type='number'
                        maxLength={10}
                        width='w-[26rem] md:w-[30rem]'
                        height='h-[3.13rem]'/>
              
                    </div>
                    <div className='flex items-center justify-end gap-4 mt-6'>
                        {/* <button onClick={()=>{
                        onClose()
                        }} className='flex items-center cursor-pointer justify-center w-[5.4rem] h-11 bg-[#F5F5F5] rounded-[0.313rem] text-base text-[#262626] font-WorkSans font-normal leading-5'>
                        Cancel
                        </button> */}
                        <button onClick={handleUpdate} className='w-[6.21rem] h-11 bg-[#3063E9] rounded-[0.313rem] text-base text-white font-WorkSans font-normal leading-5'>
                        <div className='flex justify-center items-center'>{updateBankLoading ? <Loader isWhite={true}/> : 'Save'}</div>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default EditBankAccountDetails