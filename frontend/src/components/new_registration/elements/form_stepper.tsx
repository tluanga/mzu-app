import React from 'react'
import { FormStep } from '../../../lib/enum/new_application_form_step-enum'
import useStore from '../../../store/new_registration.store'
import Head from 'next/head'

const FormStepper = () => {
    
    const { currentFormStep, setFormStep } = useStore()
    
    const styles = {
        'currentStep': `underline text-black text-lg text-decoration-color: #536fe6; `,
        'otherStep': `text-black text-sm rounded-lg`,
    }
  return (
      <div className='flex flex-row w-full h-1/12 justify-between px-20 py-1'>
          <Head>
              <title>Registration Application</title>
              <link rel="icon" href="/assets/mzu-logo.jpg" />
            
            </Head>
            <div className="text-lg breadcrumbs">
                <ul>
                    <li>
                      <a onClick={() => { setFormStep(FormStep.personal_info) }}>
                           <span className={currentFormStep == FormStep.personal_info ? styles.currentStep : styles.otherStep}>
                              Personal Information
                          </span> 
                      </a>
                    </li> 
                    <li>
                      <a onClick={() => { setFormStep(FormStep.academic_info) }}>
                          <span className={currentFormStep == FormStep.academic_info ? styles.currentStep : styles.otherStep}>
                              Academic Information
                          </span> 
                          </a>
                    </li>
                    <li>
                      <a onClick={() => { setFormStep(FormStep.upload) }}>
                          <span className={currentFormStep == FormStep.upload ? styles.currentStep : styles.otherStep}>
                              Upload Document
                          </span>  
                      </a>
                    </li> 
                    <li>
                      <a onClick={() => { setFormStep(FormStep.payment) }}>
                           <span className={currentFormStep == FormStep.payment ? styles.currentStep : styles.otherStep}>
                              Payment
                          </span> 
                      </a>
                    </li>
                </ul>
            </div>
    </div>
  )
}

export default FormStepper