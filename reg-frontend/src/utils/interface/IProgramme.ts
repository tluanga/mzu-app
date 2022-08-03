import { IDepartment } from "./IDepartment"
import { IProgrammeCategory } from "./IProgrammeCategory"
import { IProgrammeMode } from "./IProgrammeMode"






export interface IProgramme{
    _id: string,
    name: string,
    abbreviation: string,
    programme_category: IProgrammeCategory,
    programme_department: IDepartment
    Progamme_mode: IProgrammeMode,
    active:boolean,
}







