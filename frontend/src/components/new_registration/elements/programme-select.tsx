import React, {Fragment, useState } from 'react'
import { Listbox, Transition } from '@headlessui/react'
import { CheckIcon, SelectorIcon } from '@heroicons/react/solid'
import useStore from '../../../store/new_registration.store'
import { IProgramme } from '../../../lib/interface/IProgramme'


const ProgrammeMode = {
  Online: 'Online',
  Regular: 'Regular',
}


interface Item{
  id: string,
  title: string,
  value:any
}



const ProgrammeSelect = () => {
  const {programmes,setSelectedProgramme,selectedProgramme, filteredProgrammeList,registration_data}=useStore()
  let defaultData: Item | null =null
  if (selectedProgramme !== null) {
     defaultData = {
            id: selectedProgramme._id,
            title: selectedProgramme.name,
            value:selectedProgramme
          
    }
    
  } else {
    defaultData = {
            id: '',
            title: 'Please Select Programme',
            value:{}
          
    }
  }
  
  

 


  const placeholder: Item = {
    id: '',
    title: 'Select Programme',
    value:{}
  }

  const [selectedItem,setSelectedItem] = useState<Item>(defaultData)
 
  const setSelected = (item:Item)=>{
    setSelectedItem(item)
    setSelectedProgramme(item.value)
    
  }

  // const items: Item[] = []
  const [items,setItems]=React.useState<Item[]>([])
  
  // -----------generating the item--
  React.useEffect(() => {
 
    const _tempItems:Item[]=[]
    filteredProgrammeList.map((programme:IProgramme) => {
      const item:Item = {
        id: programme._id,
        title: programme.name,
        value:programme
      }
      _tempItems.push(item)
    })
    setItems(_tempItems)
   
  },[filteredProgrammeList])
  

  console.log('filtered programme list is ', filteredProgrammeList)  
  console.log('default data is ',defaultData)
  return filteredProgrammeList.length===0? (<>
  </>) :
    (
    <div className="h-10">
      {/* <div>{ JSON.stringify(useStore.getState().selectedProgramme)}</div> */}
      <label htmlFor="email"
                className="text-sm font-medium text-gray-900 
                dark:text-gray-300">Programme Select</label>
      <Listbox value={selectedItem} onChange={(value)=>setSelected(value)}>
        <div className="relative">
          <Listbox.Button className="relative w-full cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
            <span className="block truncate">{selectedItem?.title}</span>
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
              {items.map((item:Item, itemIdx) => (
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
                        {item.title}
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

export default ProgrammeSelect