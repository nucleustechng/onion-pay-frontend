import { useRouter } from 'next/router'
import React from 'react'
import Overview from '../../components/subaccounts/Overview'
import { useAppSelector } from '../../redux/redux-hooks/hooks'
import { RootState } from '../../redux/store'



const overview = () => {
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
                <Overview/>
            </div>
        </div>
    </div>
  )
}

export default overview