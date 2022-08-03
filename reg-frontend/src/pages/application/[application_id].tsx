import { NextPageContext } from 'next'
import Head from 'next/head'
import React from 'react'
import IRegistrationApplication from '../../utils/interface/IRegistrationApplication'
import useStore from '../../store/new_registration.store'
import Header from '../../components/new_registration/header'
import PersonalInfoForm from '../../components/new_registration/form/personal_info_form'

import FormStepper from '../../components/new_registration/elements/form_stepper'
import AcademicInfoForm from '../../components/new_registration/form/academic_info_form'
import UploadDocumentForm from '../../components/new_registration/form/upload_document_form'
import Payment from '../../components/new_registration/form/payment'

import store from '../../store/new_registration_application.store'

import { FormStep } from '../../utils/enum/new_application_form_step-enum'

import {backendServerUrl} from '../../utils/backend-server.config'

export const getStaticPaths = async () => {
    const response = await fetch(backendServerUrl+'/registration_application/')
    const data = await response.json()
    const paths = data.map((application:IRegistrationApplication) => {
        return {
            params: {
              application_id:application.application_id
          }
      }  
    })
    return {
        paths: paths,
        fallback:false
    }
}

export const getStaticProps = async (context: any) => {
  

  const application_id = context.params.application_id
  const url='http://localhost:8000/registration_application/'+ application_id
  const response = await fetch(url)
  const data = await response.json()

  let selectedProgrammeCategory=null
  let selectedProgramme=null
  
  
 
  

    //------fetch admission batchs
  const admission_batch_url = 'http://localhost:8000/admission_batch/'
  const admission_batch_response = await fetch(admission_batch_url)
  const admission_batch_data = await admission_batch_response.json()
    // -----fetch list of programme categories
  const programme_category_url = 'http://localhost:8000/programme_category/'
  const programme_category_response = await fetch(programme_category_url)
  const programme_category_data = await programme_category_response.json()

  

  // -----Fetch programme category--------
  const programme_url = 'http://localhost:8000/programme/'
  const programme_response = await fetch(programme_url)
  const programme_data = await programme_response.json()
  

  
  

    return {
        props: {
        data: data,
        admission_batch_data: admission_batch_data,
        programme_category_data: programme_category_data,
        programme_data: programme_data,
        selectedProgrammeCategory,
        selectedProgramme,
        }
    }
}



const Application = (props:any) => {
  const {
    registration_data, setRegistrationData,
     currentFormStep, setAdmissionBatch,
    setProgrammeCategory,
    setProgrammes,

  }
    = useStore()
 

  setRegistrationData(props.data)
  setAdmissionBatch(props.admission_batch_data)
  setProgrammeCategory(props.programme_category_data)
  setProgrammes(props.programme_data)
 
 
 
  
    
  return (
    <div>   
      <Head>
        <title>New Registration Application</title>
      </Head>
      <Header application_id={Object.keys(registration_data).length!==0?registration_data.application_id:''}/>
      <div className='pt-10'>
         <FormStepper/>
            {
              currentFormStep === FormStep.personal_info &&
              <div>
                  <PersonalInfoForm/>
              </div>
            }
            {
              currentFormStep === FormStep.academic_info &&
              <div>
                  <AcademicInfoForm/>
              </div>
            }
            {
              currentFormStep === FormStep.upload &&
              <div>
                  <UploadDocumentForm/>
              </div>
            }
            {
              currentFormStep === FormStep.payment &&
              <div>
                  <Payment/>
              </div>
            }
      </div>
     

    
    </div>
  )
}

export default Application