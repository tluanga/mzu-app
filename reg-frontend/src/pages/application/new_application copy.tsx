import React from 'react'
import PersonalInfoForm from '../../components/new_registration/form/personal_info_form'
import Payment from '../../components/new_registration/form/payment'
import Upload from '../../components/new_registration/upload'
import CategorySelect from '../../components/ui_kit/category-select/component/category-select.component'
import { FormStep } from '../../utils/enum/new_application_form_step-enum'
import useStore from '../../store/new_registration.store'
import FormStepper from '../../components/new_registration/elements/form_stepper'
import AcademicInfoForm from '../../components/new_registration/form/academic_info_form'
import UploadDocumentForm from '../../components/new_registration/form/upload_document_form'
import Header from '../../components/new_registration/header'


const NewApplication = (props:any) => {
  const { registration_data, setRegistrationData, clearData, currentFormStep,setFormStep } = useStore()
 
  console.log(props)
  setRegistrationData(props.registration_data)
  return (
    <div>     
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


export async function getServerSideProps() { 

  const response = await fetch(`http://localhost:8000/registration_application/mzureg-32d2845c`).then((data)=>data.json())
  console.log('response from serverv',response)
  
  return {
    props: {
      programmes: [],
      categories: [],
      admissionBatch: [],
      registration_data:response
    },
  };
}

export default NewApplication