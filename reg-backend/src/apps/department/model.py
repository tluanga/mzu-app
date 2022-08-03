from typing import Optional
import uuid
from bson import ObjectId
from pydantic import BaseModel, Field
from apps.school.model import School

from utils.py_object_id import PyObjectId


class Department(BaseModel):
    id: str = Field(default_factory=uuid.uuid4, alias="_id")
    name: str = Field()
    abbreviation: str = Field()
    school: School = Field(...)
    active: bool = Field(default=True)

    class Config:
        allow_population_by_field_name = True


class UpdateDepartment(BaseModel):
    name: Optional[str]
    abbreviation: str = Field()
    school: School = Field(...)
    active: Optional[bool]
