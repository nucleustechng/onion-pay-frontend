import { useRouter } from 'next/router'
import React from 'react'
import BalanceHistory from '../../components/balances/BalanceHistory'
import { useAppSelector } from '../../redux/redux-hooks/hooks'
import { RootState } from '../../redux/store'


const balancehistory = () => {
  const router = useRouter()

  const  isLoggedIn = useAppSelector((state:RootState) => state.login.isLoggedIn)

  if (typeof window !== "undefined") {
    // import and use next/router here
    if(!isLoggedIn){
      router.push('/auth/signin')
    }
  }
  return (
    <div>
        <div className='flex'>
            <div className=' xl:w-[71.5rem]'>
            <BalanceHistory/>
            </div>
        </div>
    </div>
  )
}

export default balancehistory