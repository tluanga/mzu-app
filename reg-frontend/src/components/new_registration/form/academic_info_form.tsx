
import React,{CSSProperties} from 'react'
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/router'
import useStore from '../../../store/new_registration.store'

import TextInput from '../elements/text_input'
import IAcademicInfo from '../../../lib/interface/IAcademicInfo'
import NumberInput from '../elements/number_input'
import { IAdmissionBatch } from '../../../types/admission_batch'
import AdmissionBatchSelect from '../elements/admission-batch-select'
import ProgrammeCategorySelect from '../elements/programme-category-select'
import ProgrammeSelect from '../elements/programme-select'
import { FormStep } from '../../../utils/enum/new_application_form_step-enum'
import Loader from 'react-spinners/GridLoader';
const override: CSSProperties = {
  display: "block",
  margin: "0 auto",
  borderColor: "red",
};




const AcademicInfoForm = () => {

  const {registration_data,selectedProgramme,setFormStep,selectedAdmissionBatch,setRegistrationData,setSelectectedProgrammeCattegory}=useStore()
  const { register, handleSubmit } = useForm<IAcademicInfo>()
  const [admissionBatch, setAdmissionBatch] = React.useState<IAdmissionBatch>()
  let [loading, setLoading] = React.useState(false);
  
  
  
  
  function checkDataAvailable(){
    if (Object.keys(registration_data).length !== 0) {
      console.log('registration _data',registration_data)
      if ('academic_info' in registration_data) {
        return true;
      }
      
    } else {
      return false;
    }
  }
  const data_available=checkDataAvailable()
  
  const styles = {
    longInputText: `bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg 
          focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400
          dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`
  }
  
  async function onSubmit(data: any) {
    const id = registration_data._id
    const academic_info:IAcademicInfo = {
      ...data,
      admission_batch: selectedAdmissionBatch,
      programme:selectedProgramme,
    }
    const payload={
      academic_info:academic_info,
    }
    setLoading(true)
    const url = 'http://localhost:8000/registration_application/' + id
    console.log(url)
    console.log('payload for academic informartion is ', payload)
    
    

    const response = await fetch(url, {
      method: "PUT",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload),
    }
      
    )
    if (response.status === 200) {
      const responseData = await response.json()
      setRegistrationData(responseData)
      setFormStep(FormStep.upload)
     
    }
    setLoading(false)
 
    
  }

  React.useEffect(() => {
    if (Object.keys(registration_data.academic_info).length > 0) {
      setSelectectedProgrammeCattegory(registration_data.academic_info.programme.programme_category)
    }
  },[])





  return (
    <div className='stack w-full'>
      <Loader color={'#887ee0'} loading={loading} cssOverride={override} size={30} />
      <div className='pt-5'>
        <form onSubmit={handleSubmit(onSubmit)}>
          
            <div className='flex flex-row space-x-16'>
            <div className='flex flex-col space-y-5 w-1/2 pl-20'>
              
            {/* fullname */}
                
                <div className=''>
                  <TextInput
                    label='Class X Rollno with Examination Year'
                    name='classXRollno'
                    defaultValue={data_available?registration_data.academic_info.class_x_rollno_with_year:''}
                    register={{ ...register("class_x_rollno_with_year", { required: true }) }}
                  />
                </div>
                <div className=''>
                  <TextInput
                    label='Board/ University where Class X passed'
                    name='classXBoard'
                  defaultValue={Object.keys(registration_data.academic_info).length!==0?registration_data.academic_info.class_x_board:''}
                    register={{ ...register("class_x_board", { required: true }) }}
                  />
              </div>
              <div className=''>
                  <TextInput
                    label='Rollno of Last Examination Passed'
                    name='rollno_of_last_exam_passed'
                    defaultValue={Object.keys(registration_data.academic_info).length!==0?registration_data.academic_info.rollno_of_last_exam_passed:''}
                    register={{ ...register("rollno_of_last_exam_passed", { required: true }) }}
                  />
              </div> 
              <div className=''>
                  <NumberInput
                    label='Year of Last Examination Passed'
                    name='year_of_last_exam_passed'
                    defaultValue={Object.keys(registration_data.academic_info).length!==0?registration_data.academic_info.year_of_last_exam_passed:null}
                    register={{ ...register("year_of_last_exam_passed", { required: true }) }}
                  />
              </div>
              <div className=''>
                  <TextInput
                    label='School/ College / University where studied last'
                    name='lastInstitute'
                    defaultValue={Object.keys(registration_data.academic_info).length!==0?registration_data.academic_info.board_university_of_last_exam_passed:''}
                    register={{ ...register("board_university_of_last_exam_passed", { required: true }) }}
                  />
              </div>
              
            </div>
            {/* Second Column */}
            <div className='flex flex-col  space-y-8 w-1/2 pr-20'>
              <div className='flex flex-row justify-between '>
                <div className='w-1/2'>
                  <TextInput
                    label='Mizoram University Rollno'
                    name='mzuRollno'
                    defaultValue={Object.keys(registration_data).length!==0?registration_data.academic_info.mzu_rollno:''}
                    register={{ ...register("mzu_rollno", { required: true }) }}
                  
                  />
                </div>  
                
                  <div className='w-1/3'>
                    <AdmissionBatchSelect
                      defaultValue={data_available?registration_data.academic_info.admission_batch:null}
                    />
                  </div>
              </div>
              <div className='flex flex-row space-x-10 z-20'>
                
                <div className='flex-auto'>
                  <ProgrammeCategorySelect
                  
                    defaultValue={null}
                  />
                </div>
              </div>
              <div className='pt-8'>
                <ProgrammeSelect/>
              </div>
              
              {/* BUTTON */}
              <div className='flex flex-row space-x-10 pt-20'>
                <button className="btn btn-active btn-primary">Submit</button>
                <button className="btn btn-active btn-secondary">Clear</button>

              </div>
              
            </div>
          </div>
          </form>
        
        
        
      </div>
    </div>
    
  )
}

export default AcademicInfoForm