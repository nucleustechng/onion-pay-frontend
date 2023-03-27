import Image from 'next/image'
import React from 'react'
import LoadSpinner from '../assets/LoadSpinner.svg'


type Props = {}

const Loader = () => (
    <div className='animate-spin'>
        <Image  src={LoadSpinner} alt='Loader'/>
    </div>
)

export default Loader