from datetime import datetime
from pydantic import parse_obj_as
from http.client import HTTPResponse
from urllib import request
from motor import motor_asyncio
from typing import List
from fastapi import APIRouter, Body, Request, HTTPException, File, Form, UploadFile
from fastapi.encoders import jsonable_encoder
import razorpay
from apps.razorpay.razorpay import init
from utils.generate_application_id import generate_application_Id
from razorpay import Client as RazorPayClient
from apps.core.razorpay_key import razorpay_secret, razorpay_key_id

from utils.send_email import Email, sendNotificationEmail
from .model import AcademicInfo, PersonalInfo, RegistrationApplication, Status,  UpdateRegistrationApplication, RegistrationApplicationStatus
import re
import shutil
from pathlib import Path

import hmac
import hashlib
import base64

router = APIRouter()

dbPath = 'registration_application'


# -----------------ADD NEW-----------
@router.post("/personal_info",
             response_description="Add a new Personal Information",
             response_model=RegistrationApplication)
async def create(request: Request, personal_info: PersonalInfo = Body(...)):

    _application_id = generate_application_Id()
    _status_log: List[Status] = []
    _status = Status(
        application_status='Incomplete',
        date_time=datetime.now()
    )

    _status_log.append(_status)
    print(personal_info)
    data = RegistrationApplication(
        # application_id=_application_id,
        # personal_info=personal_info,
        signature_url='',
        class_x_certificate_url='',
        latest_exam_marksheet_url='',
        active=True,
        status_log=_status_log

    )
    data.application_id = _application_id

    data.personal_info = personal_info
    data.academic_info = {}

    json_data = jsonable_encoder(data)

    print('registration_data', json_data)
    print(json_data)
    response = await request.app.mongodb[dbPath].insert_one(
        json_data)
    print(response)

    created_data = await request.app.mongodb[dbPath].find_one({
        "_id": response.inserted_id
    })

    return created_data


# -----------------ADD NEW Academic information- ----------
@router.post("/academic_info",
             response_description="Add a new Personal Information",
             response_model=RegistrationApplication,)
async def create(request: Request, payload: RegistrationApplication = Body(...)):
    objectId = payload._id

    return payload


# ------Upload signature-----------
@router.post('/upload_signature')
# def upload_signature(request: Request, application_id: str = Form(...)):
async def upload_signature(request: Request, application_id: str = Form(...), file: UploadFile = File(...)):
    # here application_id is the database id
    # ----------- saving file----------
    suffix = Path(file.filename).suffix

    path = 'media/'+application_id+'_'+'signature'+suffix

    print(path)
    # save
    with open(path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    # ------------Get existing data for log---

    response = await request.app.mongodb[dbPath].find_one({"application_id": application_id})
    object_returned = parse_obj_as(RegistrationApplication, response)
    existing_status_log = object_returned.get('status_log')
    print('existing data', object_returned.get('status_log'))

    # -------------------

    # ------Update the log

    # ---save to the database
    _data = UpdateRegistrationApplication(
        signature_url=path,

    )

    # Check and remove empty key value
    _payload = {k: v for k,
                v in _data.dict().items() if v is not None}

    print('_____________UPDATE DATA______________________')
    print('payload is', _payload)
    print('checking for empty field')
    print(_payload)

    # if there is data to be updated

    update_result = await request.app.mongodb[dbPath].update_one(
        {"_id": application_id}, {"$set": _payload}
    )
    print(update_result)

    created_data = await request.app.mongodb[dbPath].find_one({
        "_id": application_id
    })

    return created_data

# ------Upload Marticulation Certificate-----------


@router.post('/upload_class_x_certificate')
async def upload_matric(request: Request, application_id: str = Form(...), file: UploadFile = File(...)):

    # ----------- saving file----------
    suffix = Path(file.filename).suffix

    path = 'media/'+application_id+'_'+'matric_certificate'+suffix

    print(path)
    # save
    with open(path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    # ---save to the database
    _data = UpdateRegistrationApplication(
        class_x_certificate_url=path
    )

    # Check and remove empty key value
    _payload = {k: v for k,
                v in _data.dict().items() if v is not None}

    print('_____________UPDATE DATA______________________')
    print('payload is', _payload)
    print('checking for empty field')
    print(_payload)

    # if there is data to be updated

    update_result = await request.app.mongodb[dbPath].update_one(
        {"_id": application_id}, {"$set": _payload}
    )
    print(update_result)

    created_data = await request.app.mongodb[dbPath].find_one({
        "_id": application_id
    })

    return created_data


@router.post(
    '/upload_last_exam_marksheet',
    description='Upload last  exam marksheet')
async def upload_marksheet(request: Request, application_id: str = Form(...), file: UploadFile = File(...)):

    # ----------- saving file----------
    suffix = Path(file.filename).suffix

    path = 'media/'+application_id+'_'+'last_exam_marksheet'+suffix

    print(path)
    # save
    with open(path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

   # ---save to the database
    _data = UpdateRegistrationApplication(
        latest_exam_marksheet_url=path
    )

    # Check and remove empty key value
    _payload = {k: v for k,
                v in _data.dict().items() if v is not None}

    print('_____________UPDATE DATA______________________')
    print('payload is', _payload)
    print('checking for empty field')
    print(_payload)

    # if there is data to be updated

    update_result = await request.app.mongodb[dbPath].update_one(
        {"_id": application_id}, {"$set": _payload}
    )
    print(update_result)

    created_data = await request.app.mongodb[dbPath].find_one({
        "_id": application_id
    })

    return created_data


# ----------GET ONE ITEM-----------
@router.get('/{application_id}', response_model=RegistrationApplication)
async def get(request: Request, application_id: str):
    if(response := await request.app.mongodb[dbPath].find_one({"application_id": application_id})) is not None:
        return response

    raise HTTPException(
        status_code=404, detail=f"Registtion Application Status Mode {id} not found")

# --------Search Item


@router.get('/', response_model=List[RegistrationApplication])
async def search(request: Request, name: str = ''):

    if len(name) <= 0:
        response = await request.app.mongodb[dbPath].find().to_list(length=100)
        if(response is not None):
            return response

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


@ router.put("/{id}", response_model=RegistrationApplication)
async def update(
    request: Request,
    id: str,
        registration_application: UpdateRegistrationApplication = Body(...)):

    print(registration_application)
    # Check and remove empty key value
    _payload = {k: v for k,
                v in registration_application.dict().items() if v is not None}

    print('_____________UPDATE DATA______________________')
    print('payload is', _payload)
    print('checking for empty field')
    print(_payload)

    # if there is data to be updated
    if len(_payload) >= 1:
        update_result = await request.app.mongodb[dbPath].update_one(
            {"_id": id}, {"$set": _payload}
        )

        # return updated result
        if update_result.modified_count == 1:
            print('same data')
            if(

                updated_result := await request.app.mongodb[dbPath].find_one(
                    {"_id": id}
                )

            ) is not None:
                return updated_result

        data = await request.app.mongodb[dbPath].find_one(
            {
                "_id": id
            }
        )

        return data
        # # If there is nothing to be update return the latest data
        # if(existing_data := await request.app.mongodb[dbPath]).find_one(
        #     {
        #         "_id": id
        #     }
        # ) is not None:
        #     print('return the latest data')
        #     return existing_data

    # if the item is not available in the database server
    raise HTTPException(
        status_code=404, detail=f"Registration Application  of id:{id} not found")


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
        status_code=404, detail=f" Registration Application 1 of {id} not found")


# ---------------------Payment-----------------
# ---------For crate
@router.post('/create_order',)
async def payment(application_id: str = Form(...)):

    # Create razorpya client
    client = RazorPayClient(auth=(razorpay_key_id, razorpay_secret))

    data = {"amount": 500, "currency": "INR", "receipt": application_id}
    razorpay_order = client.order.create(data=data)

    print(razorpay_order)

    return razorpay_order


@router.post('/confirm-payment',)
async def confirm_payment(application_id: str = Form(...), order_id: str = Form(...), razorpay_payment_id: str = Form(...)):

    # ---generate key--
    generated_signature = hmac_sha256(
        order_id + "|" + razorpay_payment_id, secret)
    
    hmac.new(order_id, "|", razorpay_payment_id,
             digestmod=hashlib.sha256).digest()

    client = RazorPayClient(auth=(razorpay_key_id, razorpay_secret))


    client.utility.verify_payment_signature({
        'razorpay_order_id': order_id,
        'razorpay_payment_id': payment_id,
        'razorpay_signature': razorpay_signature
    })


    return payment_id
