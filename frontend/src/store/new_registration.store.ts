import { stat } from 'fs'
import produce from 'immer'
import create from 'zustand'
import GenderEnum from '../lib/enum/gender-enum'
import { FormStep } from '../lib/enum/new_application_form_step-enum'
import { IProgramme } from '../lib/interface/IProgramme'
import { IProgrammeCategory } from '../lib/interface/IProgrammeCategory'
import IRegistrationApplication from '../lib/interface/IRegistrationApplication'
import { IAdmissionBatch } from '../types/admission_batch'
import { devtools } from 'zustand/middleware'
import { objectTraps } from 'immer/dist/internal'

type NewRegistrationState = {
    application_id: '',
    setApplicationId:(application_id:string)=>void
    registration_data: IRegistrationApplication,
    currentFormStep: FormStep
    setFormStep:(step:FormStep)=>void,
    setRegistrationData: (payload:any) => void,
    clearData: () => void,
    admission_batches: [],
    setAdmissionBatch: (admissionBatch: IAdmissionBatch[]) => void,
    programme_categories: [],
    setProgrammeCategory:(payload:IProgrammeCategory[])=>void,
    selectedProgrammeCattegory: IProgrammeCategory|null,
    setSelectectedProgrammeCattegory: (payload: IProgrammeCategory) => void
    filteredProgrammeList:IProgramme[],
    programmes: [],
    setProgrammes: (payload: any) => void,
    setSelectedProgramme: (payload: any) => void,
    selectedProgramme: IProgramme | null,
    selectedAdmissionBatch: IAdmissionBatch | null,
    setSelectedAdmissionBatch:(payload:any)=>void
}

// here wer are useing immer to simplify the mutation of the state

const useNewRegistrationStore = create<NewRegistrationState>((set) => ({
    application_id: '',
    setApplicationId: (application_id:string) => set(produce((state) => {
        state.application_id=application_id
    })),
    admission_batches: [],
    setAdmissionBatch: (payload: IAdmissionBatch[]) => set(produce((state) => {
        state.admission_batches=payload
    })),

    registration_data: <IRegistrationApplication>{},
    setRegistrationData: (registration_data: IRegistrationApplication) => { 
        // ------------Setting Registration Data-----
        console.log('payload for setting registration data',registration_data)
        set(produce((state: NewRegistrationState) => {
            state.registration_data = registration_data
            
            if (Object.keys(registration_data.academic_info).length !== 0) {
                    const academic_info = registration_data.academic_info
                    state.selectedAdmissionBatch = academic_info.admission_batch,
                    state.selectedProgramme = academic_info.programme,
                    state.selectedProgrammeCattegory = academic_info.programme.programme_category
                // state.setSelectectedProgrammeCattegory(academic_info.programme.programme_category)
            }
          
           
        }))

      
        
    

    } ,
    clearData: () => set(produce(state => {
        state.data = null
    
    })),
    currentFormStep: FormStep.personal_info,
    setFormStep: (step: FormStep) => set(produce((state) => {
        state.currentFormStep=step
    })),
    programme_categories: [],
    setProgrammeCategory: (payload: IProgrammeCategory[]) => set(
        
        (produce((state) => {
            console.log('setting programme category store payload is', payload)
            state.programme_categories = payload
            
        }))
    ),
    selectedProgrammeCattegory: null,
    filteredProgrammeList: [],
    setSelectectedProgrammeCattegory: (payload) => {
       
        console.log('setting selected programme category payload',payload)
        set({ selectedProgrammeCattegory: payload })
        // ----fultere programme list depending on the selection
        set(
        (produce((state:NewRegistrationState) => {
            const filtered = state.programmes.filter((programme: IProgramme) => {
                
                return payload._id===programme.programme_category._id
            })
            state.filteredProgrammeList=filtered.length===0?[]:filtered
            console.log('filtered is', filtered)
            console.log('programmes',state.programmes)
        }
        
        )))
        

    },
    programmes: [],
    setProgrammes: (payload) => set(
        (produce((state) => {
            state.programmes = payload
            
        }))
    ),
   
    selectedProgramme: null,
    setSelectedProgramme(payload) {
        set({
            selectedProgramme:payload
        })
    },
    selectedAdmissionBatch: null,
    setSelectedAdmissionBatch (payload: any){
        set({
            selectedAdmissionBatch:payload
        })
    },
    setToInit: () => set(
        (produce((state:NewRegistrationState) => {
            state.programme_categories = [],
            state.application_id = '',
                state.admission_batches = [],
                state.registration_data = <IRegistrationApplication>{},
                state.currentFormStep = FormStep.personal_info,
                state.selectedProgrammeCattegory = null,
                state.filteredProgrammeList = [],
                state.programmes = [],
                state.selectedProgramme = null,
                state.selectedAdmissionBatch= null
        }))
    ),
    
    
}))

export default useNewRegistrationStore