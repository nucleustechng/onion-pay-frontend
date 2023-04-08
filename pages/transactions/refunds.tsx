import { useRouter } from 'next/router'
import React from 'react'
import TransactionRefunds from '../../components/refunds/TransactionRefunds'
import { useAppSelector } from '../../redux/redux-hooks/hooks'
import { RootState } from '../../redux/store'


const Refunds = () => {
  const router  = useRouter();

  const isAuthenticated = useAppSelector((state:RootState) => state.login.isAuthenticated)

  if (typeof window !== "undefined") {
    // import and use next/router here
    if(!isAuthenticated){
      router.push('/auth/signin')
    }
  }

  return (
    <div>
        <div>
            <div className='w-[20rem] xl:w-[74.5rem]'>
                <TransactionRefunds/>
            </div>
        </div>
    </div>
  )
}

export default Refunds