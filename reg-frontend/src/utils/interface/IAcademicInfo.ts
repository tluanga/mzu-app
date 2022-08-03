import { IAdmissionBatch } from "./IAdmissionBatch";
import { IProgramme } from "./IProgramme";

export default interface IAcademicInfo{
    _id?:string,
    mzu_rollno: string,
    class_x_rollno_with_year: string,
    class_x_board: string,   
    year_of_last_exam_passed: number,
    rollno_of_last_exam_passed: string,
    board_university_of_last_exam_passed: string,
    admission_batch: IAdmissionBatch,
    programme: IProgramme,
}

