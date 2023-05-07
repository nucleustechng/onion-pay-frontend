import React from 'react'
import BusinessSect from '../../components/subaccounts/BusinessSect'
import useAuth from '../../useAuth'



const Businness = () => {
  useAuth()
  return (
    <div>
        <BusinessSect/>
    </div>
  )
}

export default Businness