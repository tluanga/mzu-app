from typing import Optional
import uuid
from bson import ObjectId
from pydantic import BaseModel, Field
from apps.core.user.enum import UserType

from utils.py_object_id import PyObjectId


class User(BaseModel):
    id: str = Field(default_factory=uuid.uuid4, alias="_id")
    name: str = Field()
    username: str = Field()
    email: str = Field()
    password: str = Field()
    # user_type: UserType = Field(...)
    active: bool = Field(default=True)

    class Config:
        allow_population_by_field_name = True


class UpdateUser(BaseModel):
    name: Optional[str]
    username: Optional[str]
    email: Optional[str]
    password: Optional[str]
    active: Optional[bool]
