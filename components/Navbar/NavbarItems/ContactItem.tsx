import React from 'react'
import NavCard from '../NavCard'
import Inquiry from '../../../Assets/icons/contact/Inquiry.svg'
import Account from '../../../Assets/icons/contact/Account.svg'
import Transactions from '../../../Assets/icons/contact/Transactions.svg'





const ContactItem = () => {
  return (
    <div>
        <div>
            <h1 className='text-primary text-sm font-WorkSans font-medium leading-4 uppercase'>Contact</h1>
            <div className='flex flex-col gap-[1.625rem] mt-[1.625rem]'>
                <NavCard header='General inquiries' mainText='Contact us about any issue you may have' icon={Inquiry} 
                alt='Inquiries Icon' backgroundColor='bg-[#FFF3C8]'/>
                <NavCard header='Account' mainText='Keep your account on track and safes' icon={Account} 
                alt='Invoice Icon' backgroundColor='bg-[#E7EDFF]'/>
                <NavCard header='Transactions' mainText='Having any issues with transactions?' icon={Transactions} 
                alt='Invoice Icon' backgroundColor='bg-[#F5F0F3]'/>
            </div>
        </div>
    </div>
  )
}

export default ContactItem