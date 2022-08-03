import React from 'react'


interface props{
    label: string,
    name: string,
    placeholder?: string | null,
     defaultValue?: string | null,
    register:any,
    onChange ?: (event: React.ChangeEvent<HTMLInputElement>) => void,
}

const TextInput = ({label,name,placeholder='',onChange, register, defaultValue=null}:props) => {
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
            <input
              type="text"
              id={name}
              className={styles.longInputText}
                placeholder={placeholder == null ? '' : placeholder}
            
                required
                onChange={onChange}
                {...register}
                defaultValue={defaultValue==null?'':defaultValue}
                
              
            />
         </div> 
    )
}

export default TextInput