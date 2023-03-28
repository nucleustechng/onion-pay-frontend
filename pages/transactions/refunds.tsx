import { useRouter } from 'next/router'
import React from 'react'
import TransactionRefunds from '../../components/refunds/TransactionRefunds'
import { useAppSelector } from '../../redux/redux-hooks/hooks'
import { RootState } from '../../redux/store'


const Refunds = () => {
  const router = useRouter ()

  const  isLoggedIn = useAppSelector((state:RootState) => state.login.isLoggedIn)

  if (typeof window !== "undefined") {
    // import and use next/router here
    if(!isLoggedIn){
      router.push('/auth/signin')
    }
  }
  return (
    <div>
        <div>
            <div className='w-[20rem] xl:w-[71.5rem]'>
                <TransactionRefunds/>
            </div>
        </div>
    </div>
  )
}

export default Refunds