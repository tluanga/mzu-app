import React from 'react'
import SideBar from '../components/dashboard/sidebar'
import {FiFileText} from 'react-icons/fi'

const Registration = () => {

  return (
      <div className='flex flex-row pt-5'>
          <SideBar />
          <div className='flex flex-col'>
              <span className='text-2xl pb-5'>University Registration Management Dashboard</span>
              <div className='flex flex-row space-x-3'>
                  <button
                      type="button"
                      className="flex flex-row space-x-3  px-6 py-2 border-2 border-blue-600 text-blue-600 font-medium text-xs leading-tight uppercase rounded hover:bg-black hover:bg-opacity-5 focus:outline-none focus:ring-0 transition duration-150 ease-in-out">
                      <span>Applications</span> 
                      <FiFileText className='text-lg'/>
                  </button>
                
                <button
                      type="button"
                      className="flex flex-row space-x-3  px-6 py-2 border-2 border-purple-600 text-purple-600 font-medium text-xs leading-tight uppercase rounded hover:bg-black hover:bg-opacity-5 focus:outline-none focus:ring-0 transition duration-150 ease-in-out">
                      <span>Registered</span> 
                      <FiFileText className='text-lg'/>
                  </button>
              </div>
              
          </div>
    </div>
  )
}

export default Registration