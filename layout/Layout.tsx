import { useRouter } from 'next/router';
import React from 'react'
import Footer from '../components/Footer/Footer';
import Navbar from '../components/Navbar/Navbar';
import SideBar from '../components/SideBar';

type Props = {}

const Layout = ({children}:any) => {
  const router = useRouter()

  if (router.pathname.includes('/auth/signup')) return children;
  if (router.pathname.includes('/auth/signin')) return children;
  if (router.pathname.includes('/auth/verifyemail')) return children;

  const showmerchantLayout =  router.pathname.includes('/balances') || router.pathname.includes('/business') ||
  router.pathname.includes('/payments') || router.pathname.includes('/transactions') || router.pathname.includes('/customers') ||
  router.pathname.includes('/settings') || router.pathname.includes('/dashboard');



  return (
    <div>
        {!showmerchantLayout && <div>
          <Navbar/>
          <div>{children}</div>
          <div className='relative z-20'>
              <Footer/>
          </div>
        </div>}
        {showmerchantLayout &&   
        <div className='flex'>
          <div className=''>
              <SideBar/>
          </div>
            <div className=''>{children}</div>
        </div>
        }
    </div>
  )
}

export default Layout