from typing import Optional
import uuid
from bson import ObjectId
from pydantic import BaseModel, Field


class ProgrammeMode(BaseModel):
    id: str = Field(default_factory=uuid.uuid4, alias="_id")
    name: str = Field()
    abbreviation: str = Field()
    active: bool = Field(default=True)

    class Config:
        allow_population_by_field_name = True


class UpdateProgrammeMode(BaseModel):
    name: Optional[str]
    abbreviation: str = Field()
    active: Optional[bool]
