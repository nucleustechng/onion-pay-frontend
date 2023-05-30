import Image from 'next/image'
import React from 'react'
import Ellipse from '../../Assets/icon/Ellipse.svg'

interface Props {
    text:string
}

const PricingSection = () => {
    const headingStyle = 'text-primary text-4xl font-WorkSans font-normal leading-10';
    const pricingTextStyle = 'text-[#1B1A1A] text-sm font-WorkSans font-normal leading-4 text-left md:text-right';
    const pricingSpanStyle = 'text-[1.75rem] leading-8 text-primary'
    const services = ['Wallet to float account','Wallet to bank account (pay out)','Float account to wallet',`Virtual account (inflow) – pay with transfer`,'Disbursement service (pay out)','Web payment gateway (card processing)']
    const ListComponent = ({text}:Props) => (
        <div className='flex items-center gap-3'>
            <div>
                <Image 
                src={Ellipse} 
                width={10}
                height={10}
                alt='Ellipse'/>
            </div>
            <h1 className='text-sm text-[#1B1A1A] font-WorkSans font-normal uppercase leading-4'>{text}</h1>
        </div>
    )
  return (
    <div className='flex justify-center mt-6'>
        <div className='w-[21.875rem] lg:w-[71.2rem] h-auto pb-6 lg:h-[28.5rem] bg-[#E7EDFF] rounded-[0.625rem]'>
            <div className='flex justify-between items-center  px-6 pt-6'>
                <h1 className={`${headingStyle}`}>Service</h1>
                <h2 className={`${headingStyle} hidden md:flex`}>Pricing (VAT)</h2>
            </div>
            <hr className='mx-6 mt-6 border-[0.0625rem] border-dashed border-[#CACACA]' />
            <div className='hidden lg:mx-6 lg:mt-8 lg:flex lg:justify-between '>
                <div>
                <div className='flex flex-col gap-10'>
                       {services.map((service:string) => (
                            <ListComponent key={service} text={service} />
                       ))}
                    </div>
                </div>
                <div className='flex flex-col gap-6'>
                    <h1 className={`${pricingTextStyle}`}><span className={`${pricingSpanStyle}`}>0.5%</span> capped at <span className={`${pricingSpanStyle}`}>N100.</span></h1>
                    <h1 className={`${pricingTextStyle}`}><span className={`${pricingSpanStyle}`}>N25</span> per transaction.</h1>
                    <h1 className={`${pricingTextStyle}`}><span className={`${pricingSpanStyle}`}>N25</span> per transaction.</h1>
                    <h1 className={`${pricingTextStyle}`}><span className={`${pricingSpanStyle}`}>1%</span> of transaction value, capped at <span className={`${pricingSpanStyle}`}>N500</span> per transaction.</h1>
                    <h1 className={`${pricingTextStyle}`}><span className={`${pricingSpanStyle}`}>N25</span> per transaction.</h1>
                    <h1 className={`${pricingTextStyle}`}><span className={`${pricingSpanStyle}`}>1.5%</span> of transaction value capped at <span className={`${pricingSpanStyle}`}>N3,000.</span></h1>
                </div>
            </div>
            <div className='flex flex-col mt-6  lg:hidden '>
                <div className='mx-6'>
                <div className='flex flex-col gap-10'>
                    <div className='flex flex-col gap-[0.375rem]'>
                        <ListComponent text='Wallet to float account' />
                        <h1 className={`${pricingTextStyle}`}><span className={`${pricingSpanStyle}`}>0.5%</span> capped at <span className={`${pricingSpanStyle}`}>N100.</span></h1>
                    </div>
                    <div className='flex flex-col gap-[0.375rem]'>
                        <ListComponent text='Wallet to bank account (pay out)' />
                        <h1 className={`${pricingTextStyle}`}><span className={`${pricingSpanStyle}`}>N25</span> per transaction.</h1>
                    </div>
                    <div className='flex flex-col gap-[0.375rem]'>
                        <ListComponent text='Float account to wallet' />
                        <h1 className={`${pricingTextStyle}`}><span className={`${pricingSpanStyle}`}>N25</span> per transaction.</h1>
                    </div>
                    <div className='flex flex-col gap-[0.375rem]'>
                        <ListComponent text={`Virtual account (inflow) – pay with transfer`} />
                        <h1 className={`${pricingTextStyle}`}><span className={`${pricingSpanStyle}`}>1%</span> of transaction value, capped at <span className={`${pricingSpanStyle}`}>N500</span> per transaction.</h1>
                    </div>
                    <div className='flex flex-col gap-[0.375rem]'>
                        <ListComponent text='Disbursement service (pay out)' />
                        <h1 className={`${pricingTextStyle}`}><span className={`${pricingSpanStyle}`}>N25</span> per transaction.</h1>
                    </div>
                    <div className='flex flex-col gap-[0.375rem]'>
                        <ListComponent text='Web payment gateway (card processing)' />
                        <h1 className={`${pricingTextStyle}`}><span className={`${pricingSpanStyle}`}>1.5%</span> of transaction value capped at <span className={`${pricingSpanStyle}`}>N3,000.</span></h1>
                    </div>
                    </div>
                </div>
                {/* <div className='flex flex-col gap-6'>
                </div> */}
            </div>
        </div>
    </div>
  )
}

export default PricingSection