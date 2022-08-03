from urllib import request
from motor import motor_asyncio
from typing import List
from fastapi import APIRouter, Body, Request, HTTPException
from fastapi.encoders import jsonable_encoder
from .model import School, UpdateSchool
import re
router = APIRouter()

dbPath = 'school'

# -----------------ADD NEW-----------


@router.post("/",
             response_description="Add a new Student",
             response_model=School)
async def create(request: Request, school: School = Body(...)):

    json_school = jsonable_encoder(school)
    new_school = await request.app.mongodb[dbPath].insert_one(
        json_school)
    print(new_school)

    created_school = await request.app.mongodb[dbPath].find_one({
        "_id": new_school.inserted_id
    })

    return created_school


# -----------------GET ALL-----------


# @router.get('/',
#             response_description='List all admission batch',
#             response_model=List[School])
# async def getList(request: Request):

#     data = await request.app.mongodb[dbPath].find().to_list(length=10)

#     return data


# ----------GET ONE ITEM-----------
@router.get('/{id}', response_model=School)
async def get(request: Request, id: str):
    if(school := await request.app.mongodb[dbPath].find_one({"_id": id})) is not None:
        return school

    raise HTTPException(
        status_code=404, detail=f"School {id} not found")

# --------Search Item


@router.get('/', response_model=List[School])
async def search_admission_batch(request: Request, name: str = ''):

    if len(name) <= 0:
        school = await request.app.mongodb[dbPath].find().to_list(length=100)
        if(school is not None):
            return school

        raise HTTPException(
            status_code=404, detail=f"No data found"
        )

    # if the search string is not empty
    print(f'search name is {name}', name)
    regx = re.compile(f'{name}', re.IGNORECASE)
    print(f'regex is{regx}')
    mregx = {"$regex": f'/{name}/'}
    print('manual regex is ', mregx)
    response = await request.app.mongodb[dbPath].find({"name": regx}).to_list(length=100)
    if(response is not None):
        return response

    raise HTTPException(
        status_code=404, detail=f"No data found"
    )


# --------Update


@ router.put("/{id}", response_model=School)
async def update(
    request: Request,
    id: str,
        school: UpdateSchool = Body(...)):
    # Check and remove empty key value
    _school = {k: v for k,
               v in school.dict().items() if v is not None}

    print('_____________UPDATE DATA______________________')
    print('payload is', _school)
    print('checking for empty field')
    print(_school)

    # if there is data to be updated
    if len(_school) >= 1:
        update_result = await request.app.mongodb[dbPath].update_one(
            {"_id": id}, {"$set": _school}
        )

        # return updated result
        if update_result.modified_count == 1:
            if(
                updated_result := await request.app.mongodb[dbPath].find_one(
                    {"_id": id}
                )

            ) is not None:
                return updated_result

    # If there is nothing to be update return the latest data
    if(existing_data := await request.app.mongodb[dbPath]).find_one(
        {
            "_id": id
        }
    ) is not None:
        return existing_data

    # if the item is not available in the database server
    raise HTTPException(
        status_code=404, detail=f"School of id:{id} not found")


# --------------DELETE------------
@router.delete('/{id}', response_description='delete')
async def delete(request: Request, id: str):
    # check the existence of the item
    delete_result = await request.app.mongodb[dbPath].delete_one({"_id": id})

    if(delete_result.deleted_count == 1):
        return{
            'message': 'item deleted'
        }

    raise HTTPException(
        status_code=404, detail=f"School of {id} not found")
