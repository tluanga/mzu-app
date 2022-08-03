import { Router, useRouter } from 'next/router';
import { useState, useContext,CSSProperties } from 'react'
import Image from 'next/image';
import UniversityStudent from '../../assets/university-student.jpg';
import  useStore  from '../../store/new_registration.store';
import {backendServerUrl} from '../../utils/backend-server.config'
// import {useRegistrationContext} from '../../context/registration.context'
// import IStudentRegistration from '../../lib/interface/IStudentRegistration';
// import studentRegistrationService from '../../lib/services/student-registration.service';

import Head from './header'
import Loader from 'react-spinners/GridLoader';
const override: CSSProperties = {
  display: "block",
  margin: "0 auto",
  borderColor: "red",
};



const styles = {
  longInputText:`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg 
          focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400
          dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500
           m-auto
          `
}




const Landing: React.FC = () => { 
  const router = useRouter()
  let [loading, setLoading] = useState(false);
  const { setRegistrationData } = useStore()
  const [applicationNotFound,setApplicationNotFound]=useState<boolean>(false)
    // const {saveRegistrationData,registrationData} =useRegistrationContext()
  const currentYear = new Date().getFullYear();
  const labelForText:string=`example: mzureg-31d2845c`
    // --------------get application status---
  const [applicationId,setApplicationId]=useState<string>('')
    // --validate the entry-
    // --if
  async function inputChangeHandler(event:React.ChangeEvent<HTMLInputElement>) {
         const enteredData = event.target.value
      setApplicationId(enteredData)
  }
  
 
  function onNewRegistrationHandler() {
    
    router.push('/application/new_application')
    }
    
    //---Submission Handler   
  async function submitHander() {
    setLoading(true)
    console.log('submithandler')

      const application_data_url =backendServerUrl+'/registration_application/'+applicationId
      const application_data_response = await fetch(application_data_url)
      const application_data = await application_data_response.json()
    console.log('application_data ', application_data_response)
    

        if (application_data_response.status === 404) {
          setApplicationNotFound(true)
          setLoading(false)
        } else if (application_data_response.status === 200) {
          setApplicationNotFound(false)
          useStore.getState().setRegistrationData(application_data)
          router.push('/application/'+applicationId)
        }
        
    
    }
  return (
    <div className='stack'>
      <Loader color={'#887ee0'} loading={loading} cssOverride={override} size={30} />

      <div className='flex flex-row px-20 justify-between'>
        <div className='h-1/3 bg-red-200'>
          <Image src={UniversityStudent} alt='student' layout='fixed' width={400} height={500 } />
        </div>
        
        <div className="card w-1/4 bg-base-100 shadow-xl">
          <div className="card-body items-center text-center">
            <h2 className="card-title">New Application</h2>
            <div className='m-auto flex flex-col space-y-5 pt-5'>
              <p className=' font-semibold'>
                For New Registration the following documents are required
              </p>
              <p> Class X Certificate</p>
              <p> Latest Academic Degree Marksheet</p>
              <p> Scanned copy of Signature</p>
            </div>
            <div className="card-actions">
                  <button className="btn btn-primary" onClick={onNewRegistrationHandler}>Apply</button>
            </div>
          </div>
        </div>
       
       
        <div className=" w-1/4 card bg-base-100 shadow-xl">
          <div className="card-body items-center text-center">
            <h2 className="card-title">Existing Application</h2>
            <p>note: Incomplete application will be removed after 15 days</p>
            
            <div className='m-auto flex flex-col  space-y-14 pt-20 '>
              <h1 className='m-auto font-semibold'>Please Enter Your
                Registration Application Id</h1>
              {applicationNotFound&&<h1>Application Data not found</h1>}
              <input
                type="text"
                id="regnno"
                className={styles.longInputText}
                placeholder={labelForText}
                required
                onChange={inputChangeHandler}
                    
              />
            </div>
            <div className="card-actions">
              <button className="btn btn-primary" onClick={() => {
                submitHander()
               } }>Submit</button>
            </div>
          </div>
        </div>
      </div>
     
      </div>
    )
}

export default Landing