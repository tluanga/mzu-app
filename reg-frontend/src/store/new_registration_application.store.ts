import { stat } from 'fs'
import produce from 'immer'
import create from 'zustand'
import GenderEnum from '../utils/enum/gender-enum'
import { FormStep } from '../utils/enum/new_application_form_step-enum'
import { IProgramme } from '../lib/interface/IProgramme'
import { IProgrammeCategory } from '../lib/interface/IProgrammeCategory'
import IRegistrationApplication from '../lib/interface/IRegistrationApplication'
import { IAdmissionBatch } from '../types/admission_batch'
import { devtools } from 'zustand/middleware'

type NewRegistrationApplicationState = {
    application_id: '',
    setApplicationId:(application_id:string)=>void
    // registration_data: IRegistrationApplication,
    // currentFormStep: FormStep
    // setFormStep:(step:FormStep)=>void,
    // setRegistrationData: (payload:any) => void,
    // clearData: () => void,
    // admission_batches: [],
    // setAdmissionBatch: (admissionBatch: IAdmissionBatch[]) => void,
    // programme_categories: [],
    // setProgrammeCategory:(payload:IProgrammeCategory[])=>void,
    // selectedProgrammeCattegory: IProgrammeCategory|null,
    // setSelectectedProgrammeCattegory: (payload: IProgrammeCategory) => void
    // filteredProgrammeList:IProgramme[],
    // programmes: [],
    // setProgrammes: (payload: any) => void,
    // setSelectedProgramme: (payload: any) => void,
    // selectedProgramme:IProgramme|null,
}

// here wer are useing immer to simplify the mutation of the state

const useNewRegistrationStore = create<NewRegistrationApplicationState>((set) => ({
    application_id:'',
    setApplicationId: (application_id: string) => {
        application_id:application_id
    }
    
    
    
}))

export default useNewRegistrationStore