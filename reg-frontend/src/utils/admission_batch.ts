import { useQuery } from "react-query";
import { IAdmissionBatch } from "../types/admission_batch";

export async function createNewAdmissionBatch(payload:IAdmissionBatch) {
    const response = await fetch(
        'http://localhost:8000/admission_batch', {
            method: "POST",
            headers: {
                'Content-Type':'application/json'
            },
            body:JSON.stringify(payload)
        }

    )
    console.log(response)
    return response.json()
}

export async function editAdmissionBatch(payload:IAdmissionBatch) {
    const response = await fetch(
        `http://localhost:8000/admission_batch/${payload._id}`, {
            method: "PUT",
            headers: {
                'Content-Type':'application/json'
            },
            body:JSON.stringify(payload)
        }

    )
    console.log(response)
    return response.json()
}

// -----------------Delete Admission Batch
export function deleteAdmissionBatch(id:string) {
    const response =  fetch(
        `http://localhost:8000/admission_batch/${id}`, {
            method: "DELETE",
        }
    ).then(resp=>resp.json())
    
    return response
}

// --------get admission batch
export const getAdmissionBatch = (): Promise<IAdmissionBatch[]> => {
    
    const resp= fetch(
        'http://localhost:8000/admission_batch/'
    ).then(resp => resp.json())
    
    return resp
   
}

export const useAdmissionBatch = ()=>{
    
    return useQuery('admission_batch', async () => {
        return getAdmissionBatch()
    })
}

