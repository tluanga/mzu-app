import { formatDateTimeRange } from '@formatjs/intl/src/dateTime';
import React from 'react'
import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css";

interface Props{
  onSelect: (date: Date) => void
  defaultDate:Date
}

const DateOfBirth = ({onSelect,defaultDate}:Props) => {
    const [dateOfBirth,setDateOfBirth]=React.useState<Date>(defaultDate);
    const styles = {
        label: `text-sm font-medium text-gray-900 dark:text-gray-300`,    
        label2:`block mb-2 text-sm font-medium 
              text-gray-900 dark:text-gray-300`,
    longInputText: `bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg 
          focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400
          dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`
    }
  return (
    <div className='flex flex-col flex-1 z-20 '>
            <label htmlFor="dateOfBirth" className="block mb-2 
                text-sm font-medium text-gray-900
               dark:text-gray-300">Date of Birth</label>
                
                <DatePicker
        
                    className={styles.longInputText}
                    selected={dateOfBirth}
                    onChange={(date: Date) => {
                      
                      setDateOfBirth(date)
                    
                    onSelect(date)
                    }}
                    dateFormat='dd-MM-y'
                />
             </div>
  )
}

export default DateOfBirth