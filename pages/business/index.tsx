import { useRouter } from 'next/router'
import React from 'react'
import BusinessSect from '../../components/subaccounts/BusinessSect'
import { useAppSelector } from '../../redux/redux-hooks/hooks'
import { RootState } from '../../redux/store'


const Businness = () => {
  const isAuthenticated = useAppSelector((state:RootState) => state.login.isAuthenticated)
  const router = useRouter()

  if (typeof window !== "undefined") {
      // import and use next/router here
      if(!isAuthenticated){
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