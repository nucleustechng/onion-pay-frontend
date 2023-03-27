import ButtonIcon from '../../components/Buttons/ButtonIcon'
import ButtonRegular from '../../components/Buttons/ButtonRegular'
import Input from '../../components/Input'
import CommerceItem from '../../components/Navbar/NavbarItems/CommerceItem'
import ContactItem from '../../components/Navbar/NavbarItems/ContactItem'
import DevelopersItem from '../../components/Navbar/NavbarItems/DeveloperItem'
import PaymentItem from '../../components/Navbar/NavbarItems/PaymentItem'
import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import BottomImage  from '../../Assets/img/signup/BottomImage.svg'
import LadyImage  from '../../Assets/img/signup/LadyImage.svg'
import FamilyImage  from '../../Assets/img/signup/FamilyImage.svg'
import CloseIcon from '../../Assets/icons/CloseIcon.svg'
import Logo from '../../Assets/logo/Logo.svg'
import Hamburger from '../../Assets/icons/Hamburger.svg'
import Footer from '../../components/Footer/Footer'
import { useSignupMutation } from '../../modules/auth/api/AuthApi'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from 'next/router'
import Loader from '../../components/Loader'



const SignUp = () => {
  
  const [toggleNav,setToggleNav] = useState<boolean>(false);
  const  router = useRouter();

  const [passwordError,setPasswordError] = useState<string>('');
  const [emailError,setEmailError] = useState<string>('')
  const [phoneError,setPhoneError] = useState<string>('');
  const [ninError,setNinError] = useState<string>('');


  const [f_name,setFirstName] = useState<string>('');
  const [l_name,setLastName] = useState<string>('');
  const [phone,setPhone] = useState<string>('');
  const [password,setPassword] = useState<string>('');
  const [email,setEmail] = useState<string>('');
  const [address,setAddress] = useState<string>(''); 
  const [nin,setNin] = useState<string>(''); //National Identification number
  


  const country = 'NG'
//   const o_name = ''
  const dob =  Date.now()
  

    const [signUp,{data:signupData,isSuccess,isLoading}] = useSignupMutation()
    const handleSubmit = async () => { 
        if (f_name && l_name && email && phone && country && password && address && dob && nin) {
        await signUp({ f_name, l_name, phone, password, email, country, address, dob, nin });
        } else {
        console.log(signupData?.reason || 'Missing required fields');
        }
    }

    useEffect(() => {
        if (isSuccess && signupData?.success  == true) {
            console.log(signupData)
        
            localStorage.setItem('email',email)
            toast.success('You have successfully signed up. Please check your email to verify your account.');
            setTimeout(() => {
                router.push('/auth/verifyemail');
              }, 3000);
        }else{
            switch (signupData?.reason) {
                case 'Your Password must be at least eight characters long and consist of letters and numbers':
                  setPasswordError('Your Password must be at least eight characters long and consist of letters and numbers');
                  break;
                case 'Another Merchant is currently using your email address. Please use another.':
                  setEmailError('Another Merchant is currently using your email address. Please use another.');
                  break;
                case 'Phone Number format invalid. Your Phone Number must be local to your country':
                  setPhoneError('Phone Number format invalid. Your Phone Number must be local to your country');
                  break;
                case 'Invalid National Identification Number':
                  setNinError('Invalid National Identification Number');
                  break;
                default:
                  setPasswordError('');
                  setEmailError('');
                  setPhoneError('');
                  setNinError('')
            }
        }
    },[isSuccess,signupData,email,router])


  return (
    <div>
         <ToastContainer />
        <div>
        <div>
            <div className=''>
              <div  className={`px-5 overflow-y-scroll w-screen   bg-[#F5F5F5] fixed inset-0 h-full z-50 transition-all duration-500
              ${toggleNav ? "right-20" : "left-[30.65rem] min-[492px]:left-[45rem] sm:left-[50rem] md:left-[65rem] lg:left-[85rem] xl:left-[95rem] min-[280px]:left-[25rem] min-[412px]:left-[30rem]"}`}>
                    <div className='flex justify-end mt-[1.875rem] cursor-pointer' onClick={() => setToggleNav(!toggleNav)}>
                        <Image src={CloseIcon} alt='Close Icon'/>
                    </div>
                    {/* CTA buttons */}
                    <div className='flex flex-col gap-6 mt-[1.875rem]'>
                        <Link href='/auth/signin' className='flex justify-center'>
                            <ButtonRegular 
                            width='w-40' 
                            height='h-11' 
                            textSize='text-base' 
                            backgroundColor='bg-white' 
                            borderColor='border-primary' 
                            borderWidth='border-[0.0625rem]' 
                            color='text-primaryText' 
                            mainText='Sign in'/>
                        </Link>
                        <Link href='/auth/signup' className='flex justify-center'>
                            <ButtonRegular 
                            width='w-40' height='h-11' 
                            textSize='text-base'
                            backgroundColor='bg-primary' 
                            color='text-white' 
                            mainText='Get started'/>
                        </Link>
                    </div>
                    <hr className='w-auto h-0 mt-6 border-[0.0625rem] border-[#CACACA]' />
                    <div className='flex flex-col mt-5 pb-11'>
                        <PaymentItem/>
                        <hr className='w-auto h-0 mt-6 mb-5 border-[0.0625rem] border-[#CACACA]' />
                        <CommerceItem/>
                        <hr className='w-auto h-0 mt-6 mb-5 border-[0.0625rem] border-[#CACACA]' />
                        <ContactItem/>
                        <hr className='w-auto h-0 mt-6 mb-5 border-[0.0625rem] border-[#CACACA]' />
                        <DevelopersItem/>
                    </div>
                </div>
            </div>
            {/* Closed state */}
            <div className='fixed left-0 right-0 top-0  z-30'>
                  <div className='flex justify-between px-5  items-center h-[4.375rem] pt-[1.875rem] pb-[0.625rem] 
                  bg-[#F5F5F5]
                  lg:px-28 xl:px-[9.375rem] xl:h-[5.75rem] 
                  '>
                    <Link href='/' className='cursor-pointer'>
                      <Image src={Logo} alt='Logo'/>
                    </Link>
                    
                    <div className='hidden lg:flex justify-between items-center w-[16rem]'>
                            <Link href='/auth/signin'>
                                <ButtonRegular 
                                width=' w-[5.875rem]' 
                                height='h-11' 
                                textSize='text-base' 
                                backgroundColor='bg-white cursor-pointer' 
                                borderColor='border-primary' 
                                borderWidth='border-[0.0625rem]' 
                                color='text-primaryText' 
                                mainText='Sign in'/>
                            </Link>
                            <Link  href='/auth/signup'>
                                <ButtonIcon width='w-[9.5rem]' height='h-11' 
                                backgroundColor='bg-primary cursor-pointer' color='text-white' mainText='Get started'/>
                            </Link>
                    </div>
                    <div className='flex items-center cursor-pointer lg:hidden' onClick={() => setToggleNav(!toggleNav)}>
                      <Image src={Hamburger} alt='Hamburger Icon'/>
                    </div>
                  </div>
            </div>
        </div>
        </div>
        <div className='flex  justify-center'>
        <div className= 'flex flex-col pt-24 pb-20 mt-8'>
                <div className='flex flex-col gap-10'>
                    <h1 className='w-[22.875rem] sm:w-[25rem] xl:w-[70rem]  text-center text-[#303778] text-5xl font-SpaceGrotesk font-bold leading-[3.375rem]
                    lg:w-[60rem] lg:text-[5.625rem] lg:leading-[5.625rem]
                    '>
                    {`Let’s get you`}<span className='text-[#FF9635]'> started</span><span className='text-primary'>!</span></h1>
                    <h2 className='text-lg text-center text-[#1B1A1A] font-WorkSans font-normal leading-5'>Fill in your information to create an account</h2>
                </div>
                <div className='flex justify-center mt-10 '>
                    <div className='flex flex-col gap-6'>
                        <Input width='w-[21.875rem] lg:w-[25rem] xl:w-[30rem]' height='h-[3.125rem]' 
                        label='First name' textSize='text-sm' placeholder='First name'
                        type='text'
                        name="f_name"
                        value={f_name}
                        onChange={(e) => setFirstName(e.target.value)}
                        />
                        <Input width='w-[21.875rem] lg:w-[25rem] xl:w-[30rem]' height='h-[3.125rem]' 
                        label='Last name' textSize='text-sm' placeholder='Last name'
                        type='text'
                        name="l_name"
                        value={l_name}
                        onChange={(e) => setLastName(e.target.value)}
                        />
                        <Input width='w-[21.875rem] lg:w-[25rem] xl:w-[30rem]' height='h-[3.125rem]' 
                        label='Email' textSize='text-sm' placeholder='example@email.com'
                        name="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        errorMessage={emailError}
                        type='email'
                        />
                        <Input width='w-[21.875rem] lg:w-[25rem] xl:w-[30rem]' height='h-[3.125rem]' 
                        label='Phone number' textSize='text-sm' placeholder='+234'
                        type='tel'
                        name="phone"
                        errorMessage={phoneError}
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        />
                         <Input width='w-[21.875rem] lg:w-[25rem] xl:w-[30rem]' height='h-[3.125rem]' 
                        label='Address' textSize='text-sm' placeholder='Address'
                        type='text'
                        name="address"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        />
                        <Input width='w-[21.875rem] lg:w-[25rem] xl:w-[30rem]' height='h-[3.125rem]' 
                        label='NIN' textSize='text-sm' placeholder='NIN'
                        type='text'
                        name="nin"
                        value={nin}
                        errorMessage={ninError}
                        onChange={(e) => setNin(e.target.value)}
                        />
                         <Input width='w-[21.875rem] lg:w-[25rem] xl:w-[30rem]' height='h-[3.125rem]' 
                        label='Password' textSize='text-sm' placeholder='Password'
                        type='password'
                        name="password"
                        errorMessage={passwordError}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        />
                        <div className='mt-4' >
                                <ButtonRegular width='w-[21.875rem] lg:w-[25rem] xl:w-[30rem]' height='h-11'
                                backgroundColor='bg-primary' borderWidth='0.313rem'
                                handlerFunc={() => handleSubmit()}
                                color='text-white' mainText={isLoading ? <Loader/> :  'Continue' }  textSize='text-base'
                                />
                            <div className='w-[21.875rem] lg:w-[25rem] xl:w-[30rem] mt-10'>
                                <p className='text-center text-[#202020] text-base font-WorkSans leading-5 '>{`By clicking continue, you agree to Exchange's`} 
                                <span className='text-[#3063E9]'> Terms of Service</span> and <span>Privacy Policy.</span></p>
                            </div>
                           
                        </div>
                    </div>
                    
                </div>
            </div>
            <div className='hidden lg:inline-flex lg:absolute lg:top-[18rem] lg:left-0 lg:bottom-0   '>
                <Image src={FamilyImage}  alt=''/>
            </div>
            <div className='hidden lg:inline-flex lg:absolute lg:top-[18rem] lg:right-0  lg:bottom-0  '>
                <Image src={LadyImage}   alt=''/>
            </div>
        </div>
        <div className='relative top-0 h-24 bottom-0 sm:h-36  lg:hidden'>
            <Image src={BottomImage} className='w-screen'  alt=''/>
        </div>
        <div className='relative z-20'>
            <Footer/>
        </div>
    </div>
  )
}

export default SignUp