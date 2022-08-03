from typing import Optional
import uuid
from bson import ObjectId
from pydantic import BaseModel, Field
from apps.department.model import Department
from apps.programme_category.model import ProgrammeCategory
from apps.programme_mode.model import ProgrammeMode


from utils.py_object_id import PyObjectId


class _ProgrammeDepartment(BaseModel):
    id: str = Field(alias="_id")
    name: str = Field()

    class Config:
        allow_population_by_field_name = True


class _ProgrammeCategory(BaseModel):
    id: str = Field(alias="_id")
    name: str = Field()

    class Config:
        allow_population_by_field_name = True


class _ProgrammeMode(BaseModel):
    id: str = Field(alias="_id")
    name: str = Field()

    class Config:
        allow_population_by_field_name = True


class Programme(BaseModel):
    id: str = Field(default_factory=uuid.uuid4, alias="_id")
    name: str = Field()
    abbreviation: str = Field()
    programme_category: _ProgrammeCategory = Field(...)
    programme_mode: _ProgrammeMode = Field(...)
    department: _ProgrammeDepartment = Field(...)

    active: bool = Field(default=True)

    class Config:
        allow_population_by_field_name = True


class UpdateProgramme(BaseModel):
    name: Optional[str]
    abbreviation: Optional[str]
    programme_category: Optional[ProgrammeCategory]
    programme_mode: Optional[ProgrammeMode]
    department: Optional[Department]

    active: Optional[bool]
