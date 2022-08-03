import React, {useState} from 'react';
import { SelectMenuOption } from './types/types';
import {CountrySelector} from './components/selector';
import {COUNTRIES} from './constants/countries';
type props = {
    label:string,
  onChange: (value: string) => any
    defaultValue:string
}


export default function CountrySelectorComponent({ onChange, label, defaultValue = '' }: props) {
  const defaultData=COUNTRIES.find((value)=>value.title===defaultValue)

  const myRef = React.createRef<HTMLDivElement>();

  const [isOpen, setIsOpen] = useState(false);
  // Default this to a country's code to preselect it
  const [country, setCountry] = useState(defaultValue.length===0?'IN':defaultData?.value);

  const setCountryFunc = (value:SelectMenuOption)=>{
    setCountry(value.value)
    onChange(value.title)
  }

  return (
    
      <div className='h-20'>
        <label className="block text-sm font-medium text-gray-700">
          {label}
        </label>
        <CountrySelector
          id={'countries'}
          ref={myRef}
          open={isOpen}
          onToggle={() => setIsOpen(!isOpen)}
          onChange={val => {
            // console.log('changing the country')
            setCountry(val.value)
            onChange(val.title)
           
        
         
         
          }}
        selectedValue={COUNTRIES.find(option => 
          option.value===country
          
          ) as SelectMenuOption} 
        />
      </div>
    
  );
}


