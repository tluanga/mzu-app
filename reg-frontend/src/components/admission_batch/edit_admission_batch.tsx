import { Dialog, Transition,Switch } from '@headlessui/react'
import { Fragment, useState } from 'react'
import { FaBorderNone } from 'react-icons/fa'
import { IAdmissionBatch } from '../../types/admission_batch'
import { editAdmissionBatch, useAdmissionBatch } from '../../utils/admission_batch'

interface Props{
  data:IAdmissionBatch,
}


const EditAdmissionBatch = ({data}:Props) => {
  const [isOpen, setOpen] = useState(false)
  const [name, setName] = useState(' ')
  const [active, setActive] = useState(data.active)
  const queryClient=useAdmissionBatch()
  function closeModal() {
    setOpen(false)
  }

  function openModal() {
    setOpen(true)
  }
  async function  onSubmit() {
    // ----Check name for existence
    // ----no duplcate names
    const payload: IAdmissionBatch = {
      _id:data._id,
      name: name,
      active:active
    }
    await editAdmissionBatch(payload)

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
        <span>Edit</span> 
       
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
                    Edit
                  </Dialog.Title>
                 
                  <div className='flex flex-col my-7'>
                    <label htmlFor='name'>Name</label>
                    <input
                      title='name'
                      aria-label='Enter Name'
                      type="text"
                      className='w-full'
                      onChange={(e) => { setName(e.target.value) }}
                      defaultValue={data.name}
                    />
                  </div>
                  <div className='flex flex-row  space-x-5'>
                    <label htmlFor='active'>Active</label>
                    <Switch
                      checked={active}
                      onChange={setActive}
                      className={`${active ? 'bg-green-500' : 'bg-red-500'}
                      relative inline-flex h-[28px] w-[63px] shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2  focus-visible:ring-white focus-visible:ring-opacity-75`}
                  >
                      <span className="sr-only">Use setting</span>
                      <span
                          aria-hidden="true"
                          className={`${active ? 'translate-x-9' : 'translate-x-0'}
                          pointer-events-none inline-block h-[24px] w-[24px] transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out`}
                        />
                  </Switch>
                  </div>
                  


                  <div className="mt-10">
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

export default EditAdmissionBatch