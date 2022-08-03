import { ISchool } from "./ISchool"

export interface IDepartment{
    _id: string,
    name: string,
    abbreviation: string,
    school: ISchool,
    active:boolean,
}


