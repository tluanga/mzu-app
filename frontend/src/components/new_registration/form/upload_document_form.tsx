
import Upload from 'rc-upload'
import React from 'react'
import { useForm } from 'react-hook-form'
import { FormStep } from '../../../lib/enum/new_application_form_step-enum'
import useStore from '../../../store/new_registration.store'
import DocumentUpload from '../elements/document-upload'


interface IPersonalInfo{
  fullName: string,
  fathersName: string,
  mothersName: string,
}

const fileError = {
  'incorrect_file_size':'Fie e is bigger than 50kb'
}
  

export enum UploadStatus{
  NotUpload,
  Uploading,
  Uploaded,
}

 

const UploadDocumentForm = () => {
  const {registration_data,setFormStep,setRegistrationData} =useStore()
  const styles = {
    longInputText: `bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg 
          focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400
          dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`
  }
  
  // const [signatureDoc, setSignatureDoc] = React.useState<any>()
  // const [signatureDocError, setSignatureDocError] = React.useState<string[]>([])
  const [signatureUploaded, setSignatureUploaded] =
    React.useState<UploadStatus>(registration_data.signature_url.length === 0 ? UploadStatus.NotUpload : UploadStatus.Uploaded)
  const [classxCertificateUploaded, setClassxCertificateUploaded] =
    React.useState<UploadStatus>(registration_data.class_x_certificate_url.length ===0? UploadStatus.NotUpload :UploadStatus.Uploaded )
  const [lastExamMarksheetUploaded, setLastExamMarksheetUploaded] =
    React.useState<UploadStatus>(registration_data.latest_exam_marksheet_url.length ===0? UploadStatus.NotUpload :UploadStatus.Uploaded )
  

  function checkStatusOfFileUpload(){
    if (Object.keys(registration_data).length === 0) {
      if (registration_data.signature_url.length != 0) {
        setSignatureUploaded(UploadStatus.Uploaded)
      }
      if (registration_data.class_x_certificate_url.length != 0) {
        console.log('inside checking class x marksheet ur checking', registration_data)
        setClassxCertificateUploaded(UploadStatus.Uploaded)
      }
      if (registration_data.latest_exam_marksheet_url.length != 0) {
        setLastExamMarksheetUploaded(UploadStatus.Uploaded)
      }

    }
  }
  
  
  React.useEffect(() => {
    checkStatusOfFileUpload()
  },[])
  
  
  // Upload Scanned Signature
  async function onUploadScannedSignature(file: any) {
    console.log('uploading signature')
    console.log(file)
    const body = new FormData
      body.append("application_id",registration_data._id!)
    body.append("file", file)
    console.log('file selected',file)

    const response=await  fetch("http://localhost:8000/registration_application/upload_signature", {
        body,
        
        method: "POST"
    })
    if (response.status === 200) {
      setSignatureUploaded(UploadStatus.Uploaded)
      setRegistrationData(await response.json())
      checkStatusOfFileUpload()
    }
  
  }


  // Upload Class X Certificate
  async function onUploadClassXCertificate(file: any) {
    console.log('uploading Class X Certificates')
    console.log(file)
    const body = new FormData
      body.append("application_id",registration_data._id!)
    body.append("file", file)
    console.log('file selected',file)

    const response=await  fetch("http://localhost:8000/registration_application/upload_class_x_certificate", {
        body,
        
        method: "POST"
    })
    if (response.status === 200) {
      setClassxCertificateUploaded(UploadStatus.Uploaded)
      setRegistrationData(await response.json())
      checkStatusOfFileUpload()
    }
    
  }


 
  // --Upload Last Exam Marksheet
  async function onUploadLastExamMarksheet(file: any) {
    console.log('uploading Last Exam Markshhet')
    console.log(file)
    const body = new FormData
      body.append("application_id",registration_data._id!)
    body.append("file", file)
    console.log('file selected',file)

    const response=await  fetch("http://localhost:8000/registration_application/upload_last_exam_marksheet", {
        body,
        
        method: "POST"
    })
    
    if (response.status === 200) {
      setLastExamMarksheetUploaded(UploadStatus.Uploaded)
      setRegistrationData(await response.json())
      checkStatusOfFileUpload()
    }
    
  
  }





  return (
    <div className='pt-5 flex flex-col items-center justify-center'>
      <span className='font-bold text-xxl'>Please Upload Documents</span>
      

      <div className='flex flex-row   space-x-16 items-center justify-center'>
        <DocumentUpload
          title='Scanned Copy of Signature'
          description='Please Select Scanned Signature Copy'
          fileTypeInfo='SVG, PNG, JPG or GIF (MAX. 50KB)'
          uploadStatus={signatureUploaded }
          onUpload={(file)=>onUploadScannedSignature(file)}
        /> 
        <DocumentUpload
          title='Class X Certificate'
          description='Please Select Scanned Signature Copy'
          fileTypeInfo='SVG, PNG, JPG or GIF, PDF (MAX. 50KB )'
          uploadStatus={classxCertificateUploaded }
          onUpload={(file)=>onUploadClassXCertificate(file)}
        /> 
        <DocumentUpload
          title='Latest Exam Marksheet'
          description='Please Select Last Examination Marksheet'
          fileTypeInfo='SVG, PNG, JPG or GIF, PDF (MAX 50kb )'
          uploadStatus={lastExamMarksheetUploaded }
          onUpload={(file)=>onUploadLastExamMarksheet(file)}
        /> 
        
         
      </div>
      {
        signatureUploaded & classxCertificateUploaded & lastExamMarksheetUploaded ? 
          <button className="btn btn-accent m-5" onClick={() => { setFormStep(FormStep.payment) }}>
            <span className='text-white'>Proceed to Payment</span>
          </button>
          
          :<></>
      }
      
    </div>
    
  )
}

export default UploadDocumentForm