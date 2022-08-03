import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useState } from 'react'
import { FaBorderNone } from 'react-icons/fa'
import { IAdmissionBatch } from '../../types/admission_batch'
import { createNewAdmissionBatch, useAdmissionBatch } from '../../utils/admission_batch'


const NewAdmissionBatch = () => {
  const [isOpen, setOpen] = useState(false)
  const [name, setName] = useState(' ')
  const queryClient=useAdmissionBatch()
  function closeModal() {
    setOpen(false)
  }

  function openModal() {
    setOpen(true)
  }
  async function onSubmit() {
    // ----Check name for existence
    // ----no duplcate names
    const payload: IAdmissionBatch = {
    
      name: name,
      active:true
    }
   
    await createNewAdmissionBatch(payload)
    queryClient.refetch()

    setOpen(false)
  }
  

  return (
    <>
      {/* Button part */}
      <button
        type="button"
      className="flex flex-row space-x-3  px-6 py-2 border-2 border-blue-600 text-blue-600 font-medium text-xs leading-tight uppercase rounded hover:bg-black hover:bg-opacity-5 focus:outline-none focus:ring-0 transition duration-150 ease-in-out"
      onClick={openModal}
    >
        <span>New</span> 
        <FaBorderNone className='text-lg'/>
      </button>

      {/* Modal Part */}
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full h-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900 flex flex-auto"
                  >
                    New Admission Batch
                  </Dialog.Title>
                 
                  <div className='flex flex-col my-7'>
                    <label htmlFor='name'>Please enter name</label>
                     <input title='name' aria-label='Enter Name' type="text" className='w-full' onChange={(e)=>{setName(e.target.value)}}/>
                  </div>
                  

                  <div className="mt-4">
                    <button 
                      type="button"
                      className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      onClick={() => { 
                        onSubmit()
                      }}
                    >
                      Submit
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
     
    
  )
}

export default NewAdmissionBatch