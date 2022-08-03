import React, {Fragment, useState } from 'react'
import { Listbox, Transition } from '@headlessui/react'
import { CheckIcon, SelectorIcon } from '@heroicons/react/solid'
import {GENDERS} from '../constants/gender.constant'
import { GenderType } from '../type/gender.type'
import GenderEnum from '../../../../utils/enum/gender-enum'


interface props{
  onSelect: ((value: GenderType) => void)
  defaultValue:string
}




const GenderSelect = ({ onSelect, defaultValue='' }: props) => {
 
  const label: GenderType = { abbreviation: '', name: 'Select Gender', value: 'Gender' }
  
  const defaultData = GENDERS.find((value) => {
    if (value.value === defaultValue) {
      return value;
    }
  })
  const [gender, setGender] = useState<GenderType>(defaultValue.length===0? label:defaultData!)
  console.log('default gender ', defaultValue)
  console.log('default data',defaultData)
  const settingGender = (value: GenderType) => {
    setGender(value)
    onSelect(value)
  }
  return (
    <div className="h-10">
         <label htmlFor="email"
                className="text-sm font-medium text-gray-900 
                dark:text-gray-300">Gender</label>
      <Listbox value={gender} onChange={(value)=>settingGender(value!)}>
        <div className="relative">
          <Listbox.Button className="relative w-full cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
            <span className="block truncate">{gender.name}</span>
            <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
              <SelectorIcon
                className="h-5 w-5 text-gray-400"
                aria-hidden="true"
              />
            </span>
          </Listbox.Button>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
              {GENDERS.map((gender, genderIdx) => (
                <Listbox.Option
                  key={genderIdx}
                  className={({ active }) =>
                    `relative cursor-default select-none py-2 pl-10 pr-4 ${
                      active ? 'bg-amber-100 text-amber-900' : 'text-gray-900'
                    }`
                  }
                  value={gender}
                >
                  {({ selected }) => (
                    <>
                      <span
                        className={`block truncate ${
                          selected ? 'font-medium' : 'font-normal'
                        }`}
                      >
                        {gender.name}
                      </span>
                      {selected ? (
                        <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600">
                          <CheckIcon className="h-5 w-5" aria-hidden="true" />
                        </span>
                      ) : null}
                    </>
                  )}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Transition>
        </div>
      </Listbox>
    </div>
  )
}

export default GenderSelect