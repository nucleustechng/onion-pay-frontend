import ContactCard from '../../components/Contact/ContactCard'
import React, { useState } from 'react'
import Inquiry from '../../Assets/img/contact/Inquiry.svg'
import Account from '../../Assets/img/contact/Account.svg'
import Transactions from '../../Assets/img/contact/Transactions.svg'
import ContactFormContainer from '../../components/Contact/ContactFormContainer'
import AccountSect from '../../components/Contact/Account/AccountSect'
import TransactionSect from '../../components/Contact/Transaction/TransactionSect'
import GeneralInquirySect from '../../components/Contact/GeneralInquiry/GeneralInquirySect'



const Contact = () => {
    const [tab,setTab] = useState<number>(1)

  return (
    <div>
        <div className='flex justify-center lg:flex lg:flex-row lg:justify-center  '>
            <div className='flex flex-col pt-32 pb-10 '>
                    <div className='w-[21.875rem] flex justify-center 
                    sm:w-[29rem] lg:w-[61.5rem] lg:flex lg:justify-center xl:w-[71.25rem]
                    '>
                        <h1 className='text-5xl text-center text-[#303778] font-SpaceGrotesk font-bold'>How may 
                        <span className='text-[#FF9635]'> we</span> be of 
                        <span className='text-[#FF9635]'> help?</span></h1>
                    </div>
                    <div className='flex flex-col gap-3 w-[21.875rem] mt-11 lg:mb-[32rem] relative  
                    lg:flex lg:flex-row lg:w-[60rem]
                    xl:flex xl:flex-row xl:w-[71.25rem]
                    '>
                       <div className=' '>
                        <div onClick={() => setTab(1)}>
                            <ContactCard
                            backgroundColor='bg-[#FF9635]'
                            top={`${tab === 1 ? 'top-[2.3rem]  lg:top-[3.5rem]' : 'top-[2.3rem] sm:top-[2rem] lg:top-[2.5rem] xl:top-[2.65rem]'}`}
                            left='left-[16rem] sm:left-[21.4rem] lg:left-[14rem] xl:left-[17rem]'
                            header='General inquiries'
                            mainText='Contact us about any issue you may have' 
                            height={`${tab === 1 ? 'h-[8.75rem] lg:h-[10rem]' : 'h-[8.75rem] xl:h-[9.5rem]'}`} 
                            borderRadius={`${tab === 1 ? 'rounded-[0.625rem] lg:rounded-t-[0.625rem] lg:rounded-b-[0px]' : 'rounded-[0.625rem]'}`}
                            img={Inquiry}
                            />
                        </div>
                        {tab === 1 && (
                        <div className='inline-flex lg:absolute lg:mt-0 mt-3 w-auto h-auto p-4 border-[0.0625rem] border-[#FF9635] rounded-[0.625rem] lg:rounded-tl-[0px] lg:rounded-tr-[0.625rem] lg:rounded-b-[0.625rem]'>
                        <ContactFormContainer>
                            <GeneralInquirySect />
                        </ContactFormContainer>
                        </div>
                        )}

                        </div> 
                        
                        <div className=''>
                            <div onClick={() => {
                                setTab(2)
                            }}>
                                <ContactCard
                                    backgroundColor='bg-primary'
                                    top={`${tab === 2 ? 'top-[2.2rem] sm:top-[2.1rem] xl:top-[3.4rem] lg:top-[3.5rem]' : 'lg:top-[2.2rem] xl:top-[2.6rem]'} `}
                                    left='left-[16rem] sm:left-[22rem] lg:left-[14rem] xl:left-[17rem]'
                                    header='Account'
                                    mainText='Keep your account on track and safe'
                                    height={`${tab === 2 ? 'h-[8.75rem] lg:h-[10rem]' : 'h-[8.75rem] xl:h-[9.5rem]'}`}
                                    borderRadius={`${tab === 2 ? 'rounded-[0.625rem] lg:rounded-t-[0.625rem] lg:rounded-b-[0px]' : 'rounded-[0.625rem]'}`}
                                    img={Account}
                                />
                            </div>

                            {tab === 2 && (
                                <div
                                    className={`lg:absolute lg:right-0 lg:left-0 lg:mt-0 mt-3 w-[21.945rem] sm:w-[28rem] lg:w-[61.5rem] xl:w-[71.25rem] h-auto p-4 border-[0.0625rem] border-primary rounded-[0.625rem]`}
                                >
                                    <ContactFormContainer>
                                        <AccountSect />
                                    </ContactFormContainer>
                                </div>
                            )}
                        </div>

                        <div>
                            <div onClick={() => setTab(3)}>
                                <ContactCard
                                backgroundColor="bg-[#303778]"
                                top={`top-[2.8rem] ${tab === 3 ? 'lg:top-[4rem]' : 'xl:top-[3.3rem]'}`}
                                left={`left-[14rem] sm:left-[20rem] lg:left-[12rem] xl:left-[15rem]`}
                                header="Transactions"
                                mainText="Having any issues with transactions?"
                                height={`h-[8.75rem] ${tab === 3 ? 'lg:h-[10rem]' : 'xl:h-[9.5rem]'}`}
                                borderRadius={`rounded-[0.625rem] ${
                                    tab === 3 ? 'lg:rounded-tl-[0.625rem] lg:rounded-tr-[0.625rem] lg:rounded-b-[0px]' : ''
                                }`}
                                img={Transactions}
                                />
                            </div>

                            {tab === 3 && (
                                <div
                                className={`lg:absolute lg:right-0 lg:left-0 lg:mt-0 mt-3 w-[21.945rem] h-auto p-4 border-[0.0625rem] border-[#303778] sm:w-[28rem] lg:w-[61.5rem] xl:w-[71.25rem] rounded-[0.625rem] lg:rounded-tl-[0.625rem] lg:rounded-tr-[0px] lg:rounded-b-[0.625rem]`}
                                >
                                <ContactFormContainer>
                                    <TransactionSect />
                                </ContactFormContainer>
                                </div>
                            )}
                            </div>
                    </div>
            </div>
          
        </div>
    </div>
  )
}

export default Contact