

import React from "react"
import GeneratePdf from './pdf-generation'




const RegistrationDashboard: React.FC = () => {
    const {registrationData}=useRegistrationContext()
    return (
        <div>
            <div>
                <h1>Application For Mizoram University Registraton Completed</h1> 
                <h1>You can download the pdf files from here</h1>    
            </div>
            <GeneratePdf data={registrationData!} />
          
        </div>
    )
}

export default RegistrationDashboard