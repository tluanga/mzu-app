
import React, { useEffect } from 'react'
import { useRouter } from 'next/router'
import { useForm } from 'react-hook-form'
import CountrySelectorComponent from '../../country-selector/country-selector'
import CategorySelect from '../../ui_kit/category-select/component/category-select.component'
import GenderSelect from '../../ui_kit/gender-select/component/gender-select.component'
import DateOfBirth from '../elements/date_of_birth'
import MultilineTextInput from '../elements/multiline_input'
import TextInput from '../elements/text_input'
import IPersonalInfo from '../../../utils/interface/IPersonalInfo'

import formatDate from 'intl-dateformat'

import ClipLoader from "react-spinners/ClipLoader";
import {backendServerUrl} from '../../../utils/backend-server.config'

// -------React Toastify---------
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import MobileNoInput from '../elements/mobile_no_input'

// -----------Zustand store---
import useStore from '../../../store/new_registration.store'
import { FormStep } from '../../../utils/enum/new_application_form_step-enum'

// ---------React - spinner


import Loader from 'react-spinners/GridLoader';
const override: React.CSSProperties = {
  display: "block",
  margin: "0 auto",
  borderColor: "red",
};


const PersonalDataForm = () => {
  const { currentFormStep, setFormStep, registration_data,setRegistrationData } = useStore()
  const { register, handleSubmit } = useForm<IPersonalInfo>()
  const [gender, setGender] = React.useState<string>(Object.keys(registration_data).length!==0?registration_data.personal_info.gender:'')
  const [personCategory, setPersonCategory] = React.useState<string>((Object.keys(registration_data).length!==0?registration_data.personal_info.person_category:''))
  const [nationality, setNationality] = React.useState<string>((Object.keys(registration_data).length!==0?registration_data.personal_info.nationality:''))
  const [dateOfBirth, setDateOfBirth] = React.useState<string>((Object.keys(registration_data).length!==0?registration_data.personal_info.date_of_birth:''))
  const [errors, setErrors] = React.useState<string[]>([])
  let [loading, setLoading] = React.useState(false);
  
  const router=useRouter()
  // --------React Spinner setup
  const override: React.CSSProperties = {
  display: "block",
  margin: "0 auto",
  borderColor: "red",
  };





  const notify = () => {
    
   console.log('error',errors)
    if (gender == '') {
      errors.push('Gender Required')
    } 
    if (personCategory == '') {
      errors.push('Category Required')
    }
    if (nationality == '') {
      errors.push('Nationality Required')
    }
    if (dateOfBirth == '') {
      errors.push('Date Of Birth Required')
    }
    setErrors(errors)
    
    console.log('list of errors',errors)
    
    errors.map((error) => {
      toast.error(error, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    })
  }
  
  async function onsubmit(data: any) {
    setErrors([])
    notify()
    if (errors.length != 0) {
      setErrors([])
      return
     }  
    
    var payload: IPersonalInfo = {
      ...data,
      gender,
      person_category: personCategory,
      nationality: nationality!,
      date_of_birth:dateOfBirth,

    }
    
    
    setLoading(true)
    
    const url = backendServerUrl + '/registration_application/personal_info'
    console.log('The backend server url is ',url)
    const response = await fetch(url, {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload),
    }
      
    )

    
    const _registration_data=await response.json()
    setRegistrationData(_registration_data)
    console.log('registration data',_registration_data)
    
    if (response.status == 200) {
      setFormStep(FormStep.academic_info)
      router.push('/application/'+_registration_data.application_id)
    } 
    
  }

 

  return (
    <div className='stack w-full'>
       <Loader color={'#887ee0'} loading={loading} cssOverride={override} size={30} />
     
       <div className='pt-5'>
      <form onSubmit={handleSubmit(onsubmit)}>
         <div className='flex flex-row space-x-16'>
            <div className='flex flex-col space-y-5 w-1/2 pl-20'>
            {/* fullname */}
                <div className=''>
                  <TextInput
                    label='Full Name'
                    name='fullName'
                defaultValue={Object.keys(registration_data).length!==0?registration_data.personal_info.full_name:''}
                    register={{ ...register("full_name", { required: true }) }}
                  />
                </div>
                
                <div className=''>
                  <TextInput
                    label='Fathers Name'
                    name='fathersName'
                    defaultValue={Object.keys(registration_data).length!==0?registration_data.personal_info.fathers_name:''}
                    register={{ ...register("fathers_name", { required: true }) }}
                  />
                </div>
                <div className=''>
                  <TextInput
                    label='Mothers Name'
                    name='mothersName'
                    defaultValue={Object.keys(registration_data).length!==0?registration_data.personal_info.mothers_name:''}
                    register={{ ...register("mothers_name", { required: true }) }}
                  />
              </div>
              <div className='flex flex-row justify-between space-x-5'>
                <div className='w-2/4'>
                    <TextInput
                      label='Email'
                      name='email'
                      defaultValue={Object.keys(registration_data).length!==0?registration_data.personal_info.email:''}
                      register={{ ...register("email", { required: true }) }}
                    />
                </div>
                <div className='w-1/4'>
                    <TextInput
                      label='Adhaar'
                      name='Adhaar'
                      defaultValue={Object.keys(registration_data).length!==0?registration_data.personal_info.adhaar:''}
                      register={{ ...register("adhaar", { required: true }) }}
                    />
                </div>
                <div className='w-1/4'>
                    <MobileNoInput
                      label='Mobile No'
                      name='mobile'
                      defaultValue={Object.keys(registration_data).length!==0?registration_data.personal_info.mobile:null}
                      register={{ ...register("mobile", { required: true }) }}
                    />
                </div> 
              </div>
              <div className='h-2/6'>
                <MultilineTextInput
                  name='Permanent Address'
                label='Permanent Address'
                defaultValue={Object.keys(registration_data).length!==0?registration_data.personal_info.permanent_address:''}
                  register={{ ...register("permanent_address", { required: true }) }}

                />
              </div>       
            </div>
            {/* Second Column */}
            <div className='flex flex-col  space-y-10 w-1/2 pr-20 '>
              <div className='flex flex-row justify-between space-x-5 z-20 '>
                <div className='w-4/12 '>
                <GenderSelect onSelect={(value) =>
                  setGender(value.value)
                  
                }
                  defaultValue={gender}
                />
                </div>
                <div className='w-2/12 '>
                  <DateOfBirth onSelect={(date) => {
                    setDateOfBirth(formatDate(date,'YYYY-MM-DD'))
                   }}
                   defaultDate={Object.keys(registration_data).length!==0? new Date(registration_data.personal_info.date_of_birth):new Date()}
                />
                </div>
                <div className='w-6/12 '>
                <CategorySelect
                  onSelect={(value) => setPersonCategory(value)}
                  defaultValue={Object.keys(registration_data).length!==0? registration_data.personal_info.person_category:''}
                />
                </div>
              </div>
              <div className='flex flex-row space-x-5'>
                <div className='w-2/4'>
                    <TextInput
                      label='Religion'
                      name='religion'
                       defaultValue={Object.keys(registration_data).length!==0?registration_data.personal_info.religion:''}
                      register={{ ...register("religion", { required: true }) }}
                    />
                  </div>
                <div className='w-2/4'>
                    <CountrySelectorComponent
                          onChange={(value) => { setNationality(value) }} label='Nationality'
                          defaultValue={Object.keys(registration_data).length!==0? registration_data.personal_info.nationality:''}
                    />
                  </div>
                
              </div>
              {/* BUTTON */}
            <div className='flex flex-row space-x-10'>
              <button className="btn btn-active btn-primary" onClick={() => {
               
                }}>Submit</button>
                <button className="btn btn-active btn-secondary">Clear</button>

              </div>
              
            </div>
          </div>
      
      </form>
      <ToastContainer />
      
    </div>
    </div>
   
  )
}

export default PersonalDataForm