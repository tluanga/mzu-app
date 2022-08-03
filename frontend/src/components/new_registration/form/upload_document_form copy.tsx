
// import Upload from 'rc-upload'
// import React from 'react'
// import { useForm } from 'react-hook-form'
// import useStore from '../../../store/new_registration.store'


// interface IPersonalInfo{
//   fullName: string,
//   fathersName: string,
//   mothersName: string,
// }

// const fileError = {
//   'incorrect_file_size':'Fie e is bigger than 50kb'
// }
  

 

// const UploadDocumentForm = () => {
//   const {registration_data} =useStore()
//   const styles = {
//     longInputText: `bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg 
//           focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400
//           dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`
//   }
  
//   const [signatureDoc, setSignatureDoc] = React.useState<any>()
//   const [signatureDocError, setSignatureDocError] = React.useState<string[]>([])
  
  
//   async function onUploadScannedSignature() {
//     const body = new FormData
//       body.append("application_id",registration_data._id!)
//     body.append("file", signatureDoc)
//     console.log('file selected',signatureDoc)

//     const response=await  fetch("http://localhost:8000/registration_application/upload_signature", {
//         body,
        
//         method: "POST"
//       })
    
//      console.log(await response.json())
//   }


//   return (
//     <div className='pt-5'>
//       <div className='flex flex-row space-x-16'>
//         {/* Second Column */}
//         <div className="card w-96 bg-base-100 shadow-xl">
//           <div className="card-body">
//             <h2 className="card-title">Shoes!</h2>
//             <p>If a dog chews shoes whose shoes does he choose?</p>
//           </div>
//           <figure><img src="https://placeimg.com/400/225/arch" alt="Shoes" /></figure>
//         </div>

//         <div className='flex flex-col  space-y-8 w-1/2 pr-20'>
//             {/* Upload Scanned Signature */}
            
//             <form id='scanned-signature-upload' className='flex flex-col w-1/2'>
//                <div className="flex flex-row justify-center items-center">
//                 <label htmlFor="signature" className="form-label 
//                   inline-block mb-2 text-gray-700 w-2/4">Scanned Signature</label>
//                 <input
//                   accept="image/x-png,image/gif,image/jpeg"
//                   className="form-control
//                   block
//                   w-full
//                   py-1.5
//                   text-base
//                   font-normal
//                   text-gray-700
//                   bg-white bg-clip-padding
//                   border border-solid border-gray-300
//                   rounded
//                   transition
//                   ease-in-out
//                   m-0
//                 focus:text-gray-700 focus:bg-white
//                 focus:border-blue-600 focus:outline-none" type="file" id="signature"
//                   onChange={(event) => {
                    
//                     setSignatureDoc(event.target.files![0])
//                     console.log('upload scanned signature')
//                     onUploadScannedSignature()

//                   }}
                
//                 />
                
//               </div>
//               <button
                
//               onClick={(e) => {
//                 e.preventDefault()
//                   onUploadScannedSignature()
//                  } }
//               >Upload Scanned Signature</button>
//             </form>
           
            
//           </div>
         
//         </div>
//       </div>
    
//   )
// }

// export default UploadDocumentForm