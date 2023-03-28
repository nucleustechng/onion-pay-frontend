import { useRouter } from 'next/router'
import React from 'react'
import MyOverview from '../../components/subaccounts/Overview'
import { useAppSelector } from '../../redux/redux-hooks/hooks'
import { RootState } from '../../redux/store'



const Overview = () => {
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
            <div className='w-[30rem] xl:w-[71.5rem]'>
                <MyOverview/>
            </div>
        </div>
    </div>
  )
}

export default Overview