import React from 'react'
import ChargeBacks from '../../components/chargebacks/ChargeBacks'
import SideBar from '../../components/SideBar'

type Props = {}

const chargebacks = (props: Props) => {
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

export default chargebacks