
from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles
import uvicorn
from fastapi.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient


# ---setttings---
from config import settings
from apps.admission_batch.router import router as admission_batch_router
from apps.school.router import router as school_router
from apps.department.router import router as department_router
from apps.person_category.router import router as person_category_router
from apps.programme_category.router import router as programme_category_router
from apps.programme_mode.router import router as programme_mode_router
from apps.programme.router import router as programme_router
from apps.registration.registration_application_status.router import router as registration_application_status_router
from apps.registration.registration_application.router import router as registration_application

# ---core app---
from apps.core.user.router import router as user_router

app = FastAPI()

app.include_router(admission_batch_router, prefix='/admission_batch')
app.include_router(school_router, prefix='/school')
app.include_router(department_router, prefix='/department')
app.include_router(person_category_router, prefix='/person_category')
app.include_router(programme_category_router, prefix='/programme_category')
app.include_router(programme_mode_router, prefix='/programme_mode')
app.include_router(programme_router, prefix='/programme')
app.include_router(registration_application_status_router,
                   prefix='/registration_application_status')
app.include_router(registration_application,
                   prefix='/registration_application')
app.include_router(user_router, prefix='/user')


origins = ["*"]


app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# --------------This is very important to allow publ ic
# to acces the meaia folder that is stati
app.mount("/media", StaticFiles(directory="media"), name="media")
# -----Start event


@app.get('/')
async def get():
    return {
        'message': 'the root'
    }


@app.on_event("startup")
async def startup_db_client():
    print('-------------starting db service--------')

    app.mongodb_client = AsyncIOMotorClient(
        settings.DB_URL, tls=True, tlsAllowInvalidCertificates=True)
    app.mongodb = app.mongodb_client[settings.DB_Name]
    print(app.mongodb)
    print('--------end of startup-----------------')


# # ----On shutdown event
@app.on_event("shutdown")
async def shutdown_db_client():
    app.mongodb_client.close()


if __name__ == "__main__":
    uvicorn.run(
        "main:app",
        host=settings.HOST,
        reload=settings.DEBUG_MODE,
        port=settings.PORT
    )
