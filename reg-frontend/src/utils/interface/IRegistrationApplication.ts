import { Url } from "url";
import { IAdmissionBatch } from "../../components/ui_kit/admission_batch/type/admission_batch.type";

import GenderEnum from "../enum/gender-enum";
import IAcademicInfo from "./IAcademicInfo";
import IPayment from "./IPayment";
import PersonalInfo from "./IPersonalInfo";

interface IRegistrationApplication {
  _id?: string | null,
  application_id: string,
  personal_info: PersonalInfo,
  academic_info:IAcademicInfo,
  programme:'',
  mzuAdmissionBatch: IAdmissionBatch,
  mzurollno: string,
  matricRollno: string,
  matricExamYear: number,
  matricBoard: string,
  lastExamRollno: string,
  lastExamYear: number,
  lastExamBoardUniversity: string,
  signature: any
  class_x_certificate_url: string
  applicationId: any,
  payment: IPayment | null,
  signature_url: string,
  latest_exam_marksheet_url: string,
  
  
}

export default IRegistrationApplication

