import React from 'react'
import { UploadStatus } from '../form/upload_document_form'

interface Props{
    title: string,
    description: string,
    fileTypeInfo: string,
    uploadStatus:UploadStatus,
    onUpload:(file:any)=>void
}

// bg-base-100
const DocumentUpload = ({ title, description, onUpload, fileTypeInfo, uploadStatus }: Props) => {
    const [reupload, setReupload] = React.useState<boolean>(false)
    

  return (
    <div>
        <div className="card w-96 h-80 pt-5 shadow-xl bg-red">
            <div className="card-body flex flex-col items-center justify-center">
                  <h2 className="card-title">{ title}</h2>
                  <p>{uploadStatus === UploadStatus.Uploaded && 'file already uploaded'}</p>
                  <p>{uploadStatus === UploadStatus.Uploading && 'file uploading'}</p>
                  <p>{uploadStatus===UploadStatus.Uploaded&&description}</p>
            </div>
              {reupload===false &&uploadStatus===UploadStatus.Uploaded ?
                  <div className='flex flex-col items-center justify-center h-2/3 '>
                      <button className="btn btn-info" onClick={() => setReupload(true)}>
                        <span className='text-white hover:text-2xl'>Re-Upload</span>  
                      </button>
                  </div> :
                  <div className='p-5'>
                  <input
                      className="block w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 cursor-pointer dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" aria-describedby="file_input_help" id="file_input" type="file"
                      onChange={(e) => {
                          
                          onUpload(e.target.files![0])
                    }}
                  />
                  <p className="mt-1 text-sm text-gray-500 dark:text-gray-300" id="file_input_help">
                    {fileTypeInfo}
                  </p>         
                  </div>
            
              }
              {
                  uploadStatus===UploadStatus.Uploading&&<div>Uploading.......</div>
             } 
            

            </div>
    </div>
  )
}

export default DocumentUpload