import React from 'react'
import PersonalInfoForm from '../../components/new_registration/form/personal_info_form'
import Payment from '../../components/new_registration/form/payment'
import Upload from '../../components/new_registration/upload'
import CategorySelect from '../../components/ui_kit/category-select/component/category-select.component'
import { FormStep } from '../../lib/enum/new_application_form_step-enum'
import useStore from '../../store/new_registration.store'
import FormStepper from '../../components/new_registration/elements/form_stepper'
import AcademicInfoForm from '../../components/new_registration/form/academic_info_form'
import UploadDocumentForm from '../../components/new_registration/form/upload_document_form'
import Header from '../../components/new_registration/header'
import Head from 'next/head'


const NewApplication = (props:any) => { 
  return (
    <div>    
      <Head>
        <title>New Registration Application</title>
      </Head>
      <Header application_id={null}/>
      <div className='pt-10'>
         
        <PersonalInfoForm/>
            
      </div>
     

    
    </div>
  
  )
}


export async function getServerSideProps() { 

 
  
  return {
    props: {
      programmes: [],
      categories: [],
      admissionBatch: [],
      registration_data:[]
    },
  };
}

export default NewApplication