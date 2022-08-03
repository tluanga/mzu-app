import axios from 'axios';
import httpCommon from '../http-common';
import http from '../http-common'
import IStudentRegistration from '../interface/IRegistrationApplication'
const uid = require('uid2');
import { nanoid } from 'nanoid'

const path = '/student-online-registrations';

class StudentRegistrationService{
    // Get all students registration
    getAll() {
        return http.get<Array<IStudentRegistration>>(path)
    }

    get(id: string) {
        return http.get<IStudentRegistration>(path+'/'+id)
    }

    async create(payLoad: IStudentRegistration) {
        // console.log(payLoad)
        
        // return http.post<IStudentRegistration>(path, { data: payLoad })
        
        try {
            // console.log(payLoad.mzuAdmissionBatch.id)
            
            // Generate application id
            let currentYear= new Date().getFullYear(); 
            let applicationId ='regn'+currentYear+nanoid(5)
            
           

            let data = {
                fullName: payLoad.fullName,
                
                fathersName: payLoad.fathersName,
                mothersName:payLoad.mothersName,
                dateOfBirth: payLoad.dateOfBirth,
                gender: payLoad.gender,
                religion: payLoad.religion,
                country: payLoad.country,
                mobileNumber: payLoad.mobileNumber,
                email: payLoad.email,
                category: payLoad.category,
                adhaarNo: payLoad.adhaar,
                permanentAddress: payLoad.permanentAddress,
                programme:payLoad.programme.id,
                admission_batch: payLoad.mzuAdmissionBatch.id,
                mzuRollno: payLoad.mzurollno,
                matricRollno: payLoad.matricRollno,
                matricExamYear: payLoad.matricExamYear,
                matricBoard: payLoad.matricBoard,
                lastExamRollno: payLoad.lastExamRollno,
                lastExamYear: payLoad.lastExamYear,
                lastExamBoardUniversity: payLoad.lastExamBoardUniversity,
                applicationId:applicationId
            };
           

            const formData = new FormData();
            
            //--Signature is an image file
            const signature = payLoad.signature[0]
            formData.append('files.signature',signature)
            const matriculationCertificate = payLoad.matriculationCertificate[0]
            formData.append('files.matriculationCertificate',matriculationCertificate)
            const lastExaminationMarksheet = payLoad.lastExaminationMarksheet[0]
            formData.append('files.lastExaminationMarksheet',lastExaminationMarksheet)
      
            
       
            formData.append('data', JSON.stringify(data));
        
            //  http.post<IStudentRegistration>(path, formData)

            fetch('/api/new_registration')
            return http.post<IStudentRegistration>(path, formData)
        }
        catch(error) {
            console.log(error)
        }



    }

    update(data: IStudentRegistration,id:any) {
        return http.put<any>(path+'/'+id,data)
    }

    delete(id: any) {
        return http.delete<any>(path+'/'+id)
    }

    deleteAll() {
        return http.delete<any>(path)
    }

    findByTittle(title: string) {
        return http.get<Array<IStudentRegistration>>(path+'?'+'title='+title)
    }


    async getRegisrationApplicationData(applicationId: string) {

        const qs = require('qs');
        const query = qs.stringify({
            populate: 'payment', 
            filters: {
                applicationId: {
                $eq: applicationId,
                },
            },
                
            }, {
            encodeValuesOnly: true,
            });

       
     
        const ipath = `http://localhost:1337/api/student-online-registrations?${query}`
    
        const result = await http.get(ipath)
        if (result.data.data.length === 0) {
           return null
        } else {
            
            const data = result.data.data.length>0?result.data.data[0]:null
        
            let payload: IStudentRegistration = data.attributes
            payload.id=data.id
        
            return payload
       }

       
    }
}
export default new StudentRegistrationService