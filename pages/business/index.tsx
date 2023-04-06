import { useRouter } from 'next/router'
import React from 'react'
import BusinessSect from '../../components/subaccounts/BusinessSect'
import { useAppSelector } from '../../redux/redux-hooks/hooks'
import { RootState } from '../../redux/store'


const Businness = () => {

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