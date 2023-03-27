import React from 'react'
import TransactionRefunds from '../../components/refunds/TransactionRefunds'
import SideBar from '../../components/SideBar'

type Props = {}

const refunds = (props: Props) => {
  return (
    <div>
        <div>
            <div className='w-[20rem] xl:w-[71.5rem]'>
                <TransactionRefunds/>
            </div>
        </div>
    </div>
  )
}

export default refunds