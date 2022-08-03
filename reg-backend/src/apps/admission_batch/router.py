from urllib import request
from motor import motor_asyncio
from typing import List
from fastapi import APIRouter, Body, Request, HTTPException
from fastapi.encoders import jsonable_encoder
from .model import AdmissionBatch, UpdateAdmissionBatch
import re
router = APIRouter()

dbPath = 'admission_batch'

# -----------------ADD NEW-----------


@router.post("/",
             response_description="Add a new Student",
             response_model=AdmissionBatch)
async def create(request: Request, admission_batch: AdmissionBatch = Body(...)):

    json_admission_batch = jsonable_encoder(admission_batch)
    new_admission_batch = await request.app.mongodb[dbPath].insert_one(
        json_admission_batch)
    print(new_admission_batch)

    created_admission_batch = await request.app.mongodb[dbPath].find_one({
        "_id": new_admission_batch.inserted_id
    })

    return created_admission_batch


# -----------------GET ALL-----------


# @router.get('/',
#             response_description='List all admission batch',
#             response_model=List[AdmissionBatch])
# async def getList(request: Request):

#     data = await request.app.mongodb[dbPath].find().to_list(length=10)

#     return data


# ----------GET ONE ITEM-----------
@router.get('/{id}', response_model=AdmissionBatch)
async def get(request: Request, id: str):
    if(admission_batch := await request.app.mongodb[dbPath].find_one({"_id": id})) is not None:
        return admission_batch

    raise HTTPException(
        status_code=404, detail=f"admission_batch {id} not found")

# --------Search Item


@router.get('/', response_model=List[AdmissionBatch])
async def search_admission_batch(request: Request, name: str = ''):

    if len(name) <= 0:
        admission_batches = await request.app.mongodb[dbPath].find().to_list(length=100)
        if(admission_batches is not None):
            return admission_batches

        raise HTTPException(
            status_code=404, detail=f"No data found"
        )

    # if the search string is not empty
    print(f'search name is {name}', name)
    regx = re.compile(f'{name}', re.IGNORECASE)
    print(f'regex is{regx}')
    mregx = {"$regex": f'/{name}/'}
    print('manual regex is ', mregx)
    admission_batches = await request.app.mongodb[dbPath].find({"name": regx}).to_list(length=100)
    if(admission_batches is not None):
        return admission_batches

    raise HTTPException(
        status_code=404, detail=f"No data found"
    )


# --------Update


@ router.put("/{id}", response_model=AdmissionBatch)
async def update_admission_batch(
    request: Request,
    id: str,
        admission_batch: UpdateAdmissionBatch = Body(...)):
    # Check and remove empty key value
    _admission_batch = {k: v for k,
                        v in admission_batch.dict().items() if v is not None}

    print('_____________UPDATE DATA______________________')
    print('payload is', admission_batch)
    print('checking for empty field')
    print(_admission_batch)

    # if there is data to be updated
    if len(_admission_batch) >= 1:
        update_result = await request.app.mongodb["admission_batch"].update_one(
            {"_id": id}, {"$set": _admission_batch}
        )

        # return updated result
        if update_result.modified_count == 1:
            if(
                updated_result := await request.app.mongodb["admission_batch"].find_one(
                    {"_id": id}
                )

            ) is not None:
                return updated_result

    # If there is nothing to be update return the latest data
    if(existing_data := await request.app.mongodb["admission_batch"]).find_one(
        {
            "_id": id
        }
    ) is not None:
        return existing_data

    # if the item is not available in the database server
    raise HTTPException(
        status_code=404, detail=f"Admission Batch of id:{id} not found")


# --------------DELETE------------
@router.delete('/{id}', response_description='delete')
async def delete(request: Request, id: str):
    # check the existence of the item
    delete_result = await request.app.mongodb["admission_batch"].delete_one({"_id": id})

    if(delete_result.deleted_count == 1):
        return{
            'message': 'item deleted'
        }

    raise HTTPException(
        status_code=404, detail=f"Admission Batch of {id} not found")
