import React, {Fragment, useState } from 'react'
import { Listbox, Transition } from '@headlessui/react'
import { CheckIcon, SelectorIcon } from '@heroicons/react/solid'
import {CATEGORIES} from '../constants/category.constant'
import { PersonCategoryType } from '../type/personCategory.type'
import useStore from '../../../../store/new_registration.store'

interface props{
  onSelect: ((value: string) => void)
  defaultValue:string
}


const PersonCategorySelect = ({ onSelect, defaultValue = '' }: props) => {
  console.log('default value',defaultValue)
  const defaultData:PersonCategoryType=CATEGORIES.find((value)=>value.value===defaultValue)
  const template:PersonCategoryType={abbreviation:'', name:'Select Category', value:'category'}
  const [category, setCategory] = useState<PersonCategoryType>(defaultValue.length===0?template:defaultData)
 
  const settingCategory = (value:PersonCategoryType)=>{
    setCategory(value)
    onSelect(value.value)
  }
  return (
    <div className="h-10">
         <label htmlFor="email"
                className="text-sm font-medium text-gray-900 
                dark:text-gray-300">Category</label>
      <Listbox value={category} onChange={(value)=>settingCategory(value)}>
        <div className="relative">
          <Listbox.Button className="relative w-full cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
            <span className="block truncate">{category.name}</span>
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
              {CATEGORIES.map((category, categorIdx) => (
                <Listbox.Option
                  key={categorIdx}
                  className={({ active }) =>
                    `relative cursor-default select-none py-2 pl-10 pr-4 ${
                      active ? 'bg-amber-100 text-amber-900' : 'text-gray-900'
                    }`
                  }
                  value={category}
                >
                  {({ selected }) => (
                    <>
                      <span
                        className={`block truncate ${
                          selected ? 'font-medium' : 'font-normal'
                        }`}
                      >
                        {category.name}
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

export default PersonCategorySelect