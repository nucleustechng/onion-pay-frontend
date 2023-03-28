import { useRouter } from 'next/router'
import React from 'react'
import BusinessSect from '../../components/subaccounts/BusinessSect'
import { useAppSelector } from '../../redux/redux-hooks/hooks'
import { RootState } from '../../redux/store'


const Businness = () => {
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
            <div>
                <BusinessSect/>
            </div>
        </div>
    </div>
  )
}

export default Businness