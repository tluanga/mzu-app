import React, {Fragment, useState } from 'react'
import { Listbox, Transition } from '@headlessui/react'
import { CheckIcon, SelectorIcon } from '@heroicons/react/solid'
import useStore from '../../../store/new_registration.store'
import { IProgrammeCategory } from '../../../lib/interface/IProgrammeCategory'

const ProgrammeMode = {
  Online: 'Online',
  Regular: 'Regular',
}

interface props{

  defaultValue:IProgrammeCategory|null
}


const ProgrammeCategorySelect = ({  defaultValue=null }: props) => {
  const {programme_categories,setSelectectedProgrammeCattegory,selectedProgrammeCattegory,registration_data}=useStore()


  console.log('selected programme category',useStore.getState().selectedProgrammeCattegory)
  let defaultData = selectedProgrammeCattegory

  // if (Obregistration_data !== null) {
  //   if (registration_data.academic_info !== null) {
  //     if (registration_data.academic_info.programme !== null)
  //       defaultData=registration_data.academic_info.programme.programme_category
  //   }
  // }
  console.log('admission batch default data',defaultData)
  const template: IProgrammeCategory = { _id: '', name: 'Select Programme Category',mode:{'_id':'','name':''}, active: true }
  const [programmeCategory, setProgrammeCategory] = useState<IProgrammeCategory>(defaultData===null?template:defaultData)
  
  const settingAdmissionBatch = (value:IProgrammeCategory)=>{
    setProgrammeCategory(value)
    setSelectectedProgrammeCattegory(value)
  }
  return (
    <div className="h-10">
      {/* <div>{ JSON.stringify(useStore.getState().registration_data.academic_info.programme.programme_category)}</div> */}
         <label htmlFor="email"
                className="text-sm font-medium text-gray-900 
                dark:text-gray-300">Programme Category</label>
      <Listbox value={programmeCategory} onChange={(value)=>settingAdmissionBatch(value)}>
        <div className="relative">
          <Listbox.Button className="relative w-full cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
            <span className="block truncate">{programmeCategory.name}</span>
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
              {programme_categories.map((item:IProgrammeCategory, itemIdx) => (
                <Listbox.Option
                  key={itemIdx}
                  className={({ active }) =>
                    `relative cursor-default select-none py-2 pl-10 pr-4 ${
                      active ? 'bg-amber-100 text-amber-900' : 'text-gray-900'
                    }`
                  }
                  value={item}
                >
                  {({ selected }) => (
                    <>
                      <span
                        className={`block truncate ${
                          selected ? 'font-medium' : 'font-normal'
                        }`}
                      >
                        {item.name}
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

export default ProgrammeCategorySelect