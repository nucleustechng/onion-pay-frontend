import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import Logo from '../../Assets/logo/OnionPayLogo.svg'
import { NavigationMenuComponent } from './NavigationMenu'

type Props = {}

export default function Navbar({}: Props) {
  return (
    <div className='w-screen h-[92px] flex items-center justify-between px-[20px] lg:px-[75px] xl:px-[150px] bg-primary'>
   <Link href="/" className="cursor-pointer h-[30px]" >
              <Image src={Logo} width={123} height={30} alt="Logo" className="w-[12rem] h-[30px] p-0" />
            </Link>
            <NavigationMenuComponent/>
    </div>
  )
}