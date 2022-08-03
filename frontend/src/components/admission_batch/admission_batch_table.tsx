import React,{useState} from 'react'
import { IAdmissionBatch } from '../../types/admission_batch'
import DeleteAdmissionBatch from './delete_admission_batch'
import EditAdmissionBatch from './edit_admission_batch'



interface Props { 
    data:IAdmissionBatch[]
}


const AdmissionBatchTable = ({ data }: Props) => {
    const [selected,setSelected]=useState('')
    
    return (
    <div>
        <div className="container mx-auto px-4 sm:px-8">
            <div className="py-8">
                <div>
                <h2 className="text-2xl font-semibold leading-tight"></h2>
                </div>
                <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
                <div
                    className="inline-block min-w-full shadow-md rounded-lg overflow-hidden"
                >
                    <table className="min-w-full leading-normal">
                    <thead>
                        <tr>
                            <th
                                className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider"
                            >
                                Name
                            </th>
                            <th
                                className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider"
                            >
                                Status
                            </th>
                            <th
                                className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider"
                            >
                                Actions
                            </th>
                        
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((item: IAdmissionBatch, key: number) => {
                            return (
                                <tr
                                    key={key}
                                    className="">
                         
                                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                        <span> {item.name}</span> 
                                    </td>
                                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                        {item.active ?
                                            <div>
                                                <span
                                                    className="relative inline-block px-3 py-1 font-semibold text-green-900 leading-tight"
                                                >
                                                <span
                                                    aria-hidden
                                                    className="absolute inset-0 bg-green-200 opacity-50 rounded-full"
                                                ></span>
                                                <span className="relative">Active</span>
                                                </span>
                                            </div>:
                                            <div>
                                                <span
                                                    className="relative inline-block px-3 py-1 font-semibold text-red-900 leading-tight"
                                                >
                                                <span
                                                    aria-hidden
                                                    className="absolute inset-0 bg-red-200 opacity-50 rounded-full"
                                                ></span>
                                                <span className="relative">In Active</span>
                                                </span>
                                            </div>
                                            
                                        }
                                    </td>
                            
                                    <td className="px-5 py-5 flex flex-row space-x-5 border-b border-gray-200 bg-white text-sm">
                                        <EditAdmissionBatch  data={item } />
                         
                                        <DeleteAdmissionBatch  data={item } />
                                    </td>
                                </tr>
                            )
                       
                         
                  }
                      
                      
                      )}
                
                        </tbody>
                    </table> 
                    
                </div>
                </div>
            </div>
        </div>
    </div> 
  )
  
}

export default AdmissionBatchTable

