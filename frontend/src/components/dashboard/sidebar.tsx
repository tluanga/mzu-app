
import { Sidebar } from 'flowbite-react/lib/esm/components/Sidebar'
import Link from 'next/link'

import React from 'react'
import {
    HiViewBoards,
    HiChartPie,
    HiInbox,
    HiUser,
    HiShoppingBag,
    HiArrowSmRight,
    HiTable
} from 'react-icons/hi'

const SideBar= () => {
    return (
      <div className='flex flex-col w-52 px-2'>
        {/* Flex Item */}
            <Link href={"/"}  >
                <a className='flex flex-row space-x-2 items-center hover:bg-gray-200'>
                    <span>Dashboard</span>
                    <HiInbox/>
                </a>
            </Link>
            <Link href={"/registration"}  >
                <a className=' py-2 flex flex-row space-x-2 items-center hover:bg-gray-200 hover:text-lg'>
                    <span>Registration</span>
                   
                </a>
            </Link>
            <Link href={"/academic_session"}  >
                <a className=' py-2 flex flex-row space-x-2 items-center hover:text-lg hover:bg-gray-200'>
                    <span>Academic Session</span>
                </a>
            </Link>
            <Link href={"/admission_batch"}  >
                <a className=' py-2 flex flex-row space-x-2 items-center hover:text-lg hover:bg-gray-200'>
                    <span>Admission Batch</span>
                </a>
            </Link>
      </div>
    
  )
}

export default SideBar