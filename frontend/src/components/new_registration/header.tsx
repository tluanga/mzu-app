import React from 'react'
import Image from 'next/image'
import MzuLogo from '/assets/mzu-logo.jpg'
import useStore from '../../store/new_registration.store'

interface Props{
  application_id?:string|null
}

const Header = ({application_id=null}:Props) => {
  const { registration_data } = useStore()
  
  return (
    <div
        className='flex flex-col items-center justify-center'>
        <Image
          src={MzuLogo} width={70} height={50}
          alt="MZU Logo"
          className='bg-red-400'
        />
        
      <h1 className='text-2xl'>Mizoram University</h1> 
      <h1 className='text-2xl'>Registration Application</h1>
      {
        Object.keys(registration_data).length !== 0 &&
        <div className='flex flex-row space-x-2 pt-5 items-center'>
          <span className='text-lg font-bold'>Application No:</span>
            <div className="badge badge-primary badge-outline">
              {Object.keys(registration_data).length !== 0 ? registration_data.application_id : ''}
            </div>
        </div>
      } 
    
    </div>
  )
}

export default Header