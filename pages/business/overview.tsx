import React from 'react'
import SideBar from '../../components/SideBar'
import Overview from '../../components/subaccounts/Overview'

type Props = {}

const overview = (props: Props) => {
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