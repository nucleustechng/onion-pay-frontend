import Image from 'next/image'
import React from 'react'
import LoadSpinner from '../Assets/LoadSpinner.svg'




const Loader = () => (
    <div className='animate-spin'>
        <Image  src={LoadSpinner} loading='eager' alt='Loader'/>
    </div>
)

export default Loader