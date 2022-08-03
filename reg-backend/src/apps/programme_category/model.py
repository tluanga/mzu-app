from typing import Optional
import uuid
from bson import ObjectId
from pydantic import BaseModel, Field
from apps.programme_mode.model import ProgrammeMode
from apps.school.model import School

from utils.py_object_id import PyObjectId


class _ProgrammeMode(BaseModel):
    id: str = Field(alias="_id")
    name: str = Field()


class ProgrammeCategory(BaseModel):
    id: str = Field(default_factory=uuid.uuid4, alias="_id")
    name: str = Field()
    mode: _ProgrammeMode = Field()
    active: bool = Field(default=True)

    class Config:
        allow_population_by_field_name = True


class UpdateProgrammeCategory(BaseModel):
    name: Optional[str]
    mode: str = Field()
    active: Optional[bool]
