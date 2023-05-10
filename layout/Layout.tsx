import Head from 'next/head';
import { useRouter } from 'next/router';
import React from 'react'
import Footer from '../components/Footer/Footer';
import Navbar from '../components/Navbar/Navbar';
import SideBar from '../components/SideBar';
import SideBarMobile from '../components/SidebarMobile';



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
       <Head>
        <title>Onion Pay - Swift Payments for Every Business</title>
      </Head>
        {!showmerchantLayout && <div>
          <Navbar/>
          <div>{children}</div>
          <div className='relative z-20'>
              <Footer/>
          </div>
        </div>}
        {showmerchantLayout &&   
        <div className='hidden  md:flex'>
          <div className=''>
              <SideBar/>
          </div>
            <div className='h-screen overflow-y-auto scrollbar-hide'>{children}</div>
        </div>
        }
          {showmerchantLayout &&   
            <div className=' md:hidden'>
              <div className=' '>
                  <SideBarMobile/>
              </div>
                <div className='h-screen overflow-y-auto scrollbar-hide'>{children}</div>
            </div>
        }
        
    </div>
  )
}

export default Layout