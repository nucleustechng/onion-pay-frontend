import { useRouter } from 'next/router'
import React from 'react'
import Settlements from '../../components/balances/settlements/Settlements'
import { useAppSelector } from '../../redux/redux-hooks/hooks'
import { RootState } from '../../redux/store'


const settlements = () => {
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
        <div>
            <div className='w-[30rem] sm:w-[40rem]  md:w-[47rem] lg:w-[50rem] xl:w-[71.5rem]'>
                <Settlements/>
            </div>
        </div>
    </div>
  )
}

export default settlements