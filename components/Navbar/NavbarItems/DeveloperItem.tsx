import React from 'react'
import NavCard from '../NavCard'
import DevelopersIcon from '../../../assets/icons/developers/DevelopersIcon.svg'



type Props = {}

const DevelopersItem = (props: Props) => {
  return (
    <div>
        <div>
            <div className='flex flex-col gap-[1.625rem]'>
                <NavCard header='Developers' mainText='Read the API docs' icon={DevelopersIcon} 
                alt='Inquiries Icon' backgroundColor='bg-[#FFF3C8]'/>
            </div>
        </div>
    </div>
  )
}

export default DevelopersItem