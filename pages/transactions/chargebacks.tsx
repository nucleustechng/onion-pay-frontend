import { useRouter } from 'next/router'
import React from 'react'
import ChargeBacks from '../../components/chargebacks/ChargeBacks'
import { useAppSelector } from '../../redux/redux-hooks/hooks'
import { RootState } from '../../redux/store'

const Chargebacks = () => {
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
            <div className='w-[20rem] lg:w-[72rem]'>
                <ChargeBacks/>
            </div>
        </div>
    </div>
  )
}

export default Chargebacks