import Image from 'next/image'
import React from 'react'
import LoadSpinner from '../Assets/LoadSpinner.svg'


interface Props {
    width?:string
    height?:string
}


const Loader = ({width,height}:Props) => (
    <div className='animate-spin'>
        <Image  src={LoadSpinner} loading='eager' className={`${width} ${height} `}  alt='Loader'/>
    </div>
)

export default Loader