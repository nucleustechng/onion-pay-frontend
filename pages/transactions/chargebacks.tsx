import React from 'react'
import ChargeBacks from '../../components/chargebacks/ChargeBacks'
import useAuth from '../../useAuth'


const Chargebacks = () => {
  useAuth()

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