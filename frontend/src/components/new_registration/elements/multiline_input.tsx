import React from 'react'

interface props{
    label: string,
    name: string,
    placeholder?: string|null,
    register: any,
    defaultValue:string|null,
     
}

const MultilineTextInput = ({label,name,placeholder='',register, defaultValue=''}:props) => {
    const styles = {
        label: `text-sm font-medium text-gray-900 dark:text-gray-300`,    
        label2:`block mb-2 text-sm font-medium 
              text-gray-900 dark:text-gray-300`,
    longInputText: `bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg 
          focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400
          dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`
    }
    return (
        <div className="mb-6">
            <label htmlFor={name}
                className={styles.label}>
              {label}
          </label>
            <textarea
                id={name}
                className={styles.longInputText}
                placeholder={placeholder == null ? '' : placeholder}
                rows={3}
                required
            defaultValue={defaultValue == null ? '' : defaultValue}
               {...register}
            />
         </div> 
    )
}

export default MultilineTextInput