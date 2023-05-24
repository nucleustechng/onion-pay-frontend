import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import FooterItem from './FooterItem'
import LogoWhite from '../../Assets/logo/LogoWhite.svg'


const Footer = () => {
  const productsArray = [
    {mainText:'Collect payment',route:'/collect-payment'},
    {mainText:'Send money',route:'/sendmoney'},
    {mainText:'Payment links',route:'/acceptpaymentlinks'},
    {mainText:'Invoices',route:'/detail-invoices'},
  ]

  const resourcesArray = [
    {mainText:'Pricing',route:'/'},
    {mainText:'Support',route:'/contact'},
    {mainText:'Integrations',route:'/'},
    {mainText:'Why you got charged',route:'/'},
  ]

  const developersArray = [
    {mainText:'API documentation',route:'https://ultra-organization.gitbook.io/onion-pay'},
    {mainText:'API reference',route:'https://ultra-organization.gitbook.io/onion-pay'},
    {mainText:'API status',route:'https://ultra-organization.gitbook.io/onion-pay'},
  ]

  const onionPayArray = [
    {mainText:'Customers',route:'/'},
    {mainText:'Careers',route:'/'},
    {mainText:'Kit',route:'/'},
  ]
  const contactArray = [
    {mainText:'info@onionpay.io'},
    {mainText:'+234 8179442770'},
    {mainText:'Twitter support'},
    {mainText:`Call lines are open
    08:00 to 17:00 WAT,
    Mondays - Fridays`}
  ]


  return (
    <div>
        <div className='w-full h-auto bg-[#303778]'>
          <div className='flex flex-col gap-11 ml-5 pt-[3.125rem] 
            md:flex md:flex-row md:flex-wrap md:px-[2rem] md:gap-[4.675rem]
            lg:flex lg:flex-row lg:flex-wrap lg:ml-[5.375rem] '>
            <FooterItem header='Products' linkArray={productsArray}/>
            <FooterItem header='Resources' linkArray={resourcesArray}/>
            <FooterItem header='Developers' linkArray={developersArray}/>
            <FooterItem header='Onion Pay' linkArray={onionPayArray}/>
            <FooterItem header='Contact' linkArray={contactArray}/>
          </div>
          <div className='flex ml-5 mt-[2.125rem] sm:ml-5 md:ml-12 lg:ml-[7.375rem] lg:mt-[7.175rem]'>
                <ul className={`flex flex-col gap-4 w-[71.275rem] 
                xl:flex xl:flex-row xl:justify-between xl:w-[76rem]`}>
                    <Link href='/'><li className='text-white text-base font-WorkSans font-normal'>Privacy policy</li></Link> 
                    <Link href='/'><li className='text-white text-base font-WorkSans font-normal'>Terms of use</li></Link> 
                    <Link href='/'><li className='text-white text-base font-WorkSans font-normal'>Cookie policy</li></Link> 
                    <Link href='/'><li className='text-white text-base font-WorkSans font-normal'>Merchant service agreement</li></Link> 
                    <Link href='/'><li className='text-white text-base font-WorkSans font-normal'>Payment protection promise</li></Link> 
                </ul>
          </div>
          <div className='pb-10 ml-5 mt-8
          md:ml-12 lg:ml-[7.275rem] xl:flex xl:ml-[7.275rem] xl:pb-11 xl:mt-[3.125rem]'>
            <Image src={LogoWhite} alt='Onion Pay Logo'/>
          </div>
        </div>
    </div>
  )
}

export default Footer