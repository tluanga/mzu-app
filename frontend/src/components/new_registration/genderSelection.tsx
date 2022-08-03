import { useState } from 'react'
import {CheckCircleIcon} from '@heroicons/react/solid'
import { RadioGroup } from '@headlessui/react'

interface GenderSelectProps{
  onSelect:(value:any )=>any
}

export default function GenderSelection({ onSelect }:GenderSelectProps){
  let [gender, setGender] = useState('Male')

  

  return (
    <RadioGroup value={gender} onChange={
      (data) => {
        setGender(data)
        onSelect(data)
      }
    }>
      <RadioGroup.Label className='text-sm font-medium text-gray-900 
                dark:text-gray-300'>Gender</RadioGroup.Label>
      <div className='flex flex-row justify-between items-center'>

        <RadioGroup.Option value="Male">
          {({ checked }) => (
            <div className='flex flex-col items-center'>
              {checked?<CheckCircleIcon className='h-4 w-4' />:<></>}
               <span className={checked ? '':''}>Male</span>
            </div>
          
        )}
        </RadioGroup.Option>
        <RadioGroup.Option value="Female" >
          {({ checked }) => (
            <div className='flex flex-col items-center'>
              {checked?<CheckCircleIcon className='h-4 w-4' />:<></>}
               <span className={checked ? '':''}>Female</span>
            </div>
           
          )}
        </RadioGroup.Option>
        <RadioGroup.Option value="Others">
          {({ checked }) => (
            <div className='flex flex-col items-center'>
              {checked?<CheckCircleIcon className='h-4 w-4' />:<></>}
               <span className={checked ? '':''}>Others</span>
            </div>
            
          )}
        </RadioGroup.Option>
      </div>
      
    </RadioGroup>
  )
}
