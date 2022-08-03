from datetime import date, datetime
from sqlite3 import register_adapter
from typing import Optional, List, Dict
import uuid
from xml.dom import registerDOMImplementation
from bson import ObjectId
from pydantic import BaseModel, Field
import json

# --Custom class
from apps.admission_batch.model import AdmissionBatch
from apps.programme.model import Programme
from apps.registration.registration_application_status.model import RegistrationApplicationStatus


class PersonalInfo(BaseModel):
    # id: Optional[str] = Field(alias="_id")
    full_name: str = Field()
    fathers_name: str = Field()
    mothers_name: str = Field()

    adhaar: str = Field()
    mobile: int = Field()
    email: str = Field()
    gender: str = Field()
    person_category: str = Field()
    date_of_birth: str = Field()
    nationality: str = Field()
    religion: str = Field()
    permanent_address: str = Field()

    class Config:
        allow_population_by_field_name = True


class AcademicInfo(BaseModel):

    # Academic Details
    mzu_rollno: str = Field()
    admission_batch: AdmissionBatch = Field()
    programme: Programme = Field()

    # # matriculation
    class_x_rollno_with_year: str = Field()
    class_x_board: str = Field()

    # # Last degree examination
    board_university_of_last_exam_passed: str = Field()
    rollno_of_last_exam_passed: str = Field()
    year_of_last_exam_passed: int = Field()

    class Config:
        allow_population_by_field_name = True


class Status(BaseModel):
    application_status: str = Field()
    date_time: datetime = Field()


class RegistrationApplication(BaseModel):

    id: str = Field(default_factory=uuid.uuid4, alias="_id")
    application_id: Optional[str] = Field()
    personal_info: Optional[PersonalInfo] = Field()
    academic_info: Optional[AcademicInfo] = Field()

    # Uploaded docs url
    signature_url: str = Field()
    class_x_certificate_url: str = Field()
    latest_exam_marksheet_url: str = Field()

    status_log: List[Status] = Field()

    active: bool = Field(default=True)

    @classmethod
    def __get_validators__(cls):
        yield cls.validate_to_json

    @classmethod
    def validate_to_json(cls, value):
        if isinstance(value, str):
            return cls(**json.loads(value))
        return value

    class Config:
        allow_population_by_field_name = True


class UpdateRegistrationApplication(BaseModel):
    application_id: Optional[str] = Field()
    personal_info: Optional[PersonalInfo] = Field()
    academic_info: Optional[AcademicInfo] = Field()
    signature_url: Optional[str] = Field()
    class_x_certificate_url: Optional[str] = Field()
    latest_exam_marksheet_url: Optional[str] = Field()
    status_log: Optional[List[Status]] = Field()


RegistrationApplicationStatus: Dict[str, str] = {
    'incomplete': 'Incomplete',
    'complete': 'Complete',
    'inprocess': 'InProcess',
    'rejected': 'Rejected',
    'approved': 'Approved',
    'issued': 'Issued'
}


# RegistrationApplicationStatus = {
#     'incomplete': 'Incomplete',
#     'complete': 'Complete',
#     'inprocess': 'InProcess',
#     'rejected': 'Rejected',
#     'approved': 'Approved',
#     'issued': 'Issued'
# }
