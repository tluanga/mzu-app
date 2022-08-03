import React from 'react'
import { FormStep } from '../../../lib/enum/new_application_form_step-enum'
import useStore from '../../../store/new_registration.store'
import Head from 'next/head'

const FormStepper = () => {
    
    const { currentFormStep, setFormStep } = useStore()
    
    const styles = {
        'currentStep': `bg-blue-500 text-white text-sm rounded-lg`,
        'otherStep': `bg-gray-500 text-white text-sm rounded-lg`,
    }
  return (
      <div className='flex flex-row w-full h-1/12 justify-between px-20 py-1'>
          <Head>
              <title>Registration Application</title>
              <link rel="icon" href="/assets/mzu-logo.jpg" />
            
        </Head>
        <a className={currentFormStep==FormStep.personal_info?styles.currentStep:styles.otherStep}>
            <button onClick={() => {
                  setFormStep(FormStep.personal_info)
            }}>
                Personal Information     
            </button>
        </a>
        <a className={currentFormStep==FormStep.academic_info?styles.currentStep:styles.otherStep}>
            <button onClick={() => {
                  setFormStep(FormStep.academic_info)
            }}>
                Academic Information     
            </button>
        </a>
          
        <a className={currentFormStep==FormStep.upload?styles.currentStep:styles.otherStep}>
            <button onClick={() => {
                  setFormStep(FormStep.upload)
            }}>
                Upload Document   
            </button>
        </a>
        
         <a className={currentFormStep==FormStep.payment?styles.currentStep:styles.otherStep}>
            <button onClick={() => {
                  setFormStep(FormStep.payment)
            }}>
                Payment     
            </button>
          </a>
    </div>
  )
}

export default FormStepper