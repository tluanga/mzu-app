from distutils.debug import DEBUG
from pydantic import BaseSettings


class CommonSettings(BaseSettings):
    APP_NAME: str = 'Mizoram University Regisgration Backend'
    DEBUG_MODE: bool = False


class ServerSettings(BaseSettings):
    HOST: str = '0.0.0.0'
    PORT: int = '8000'


class DatabaseSettings(BaseSettings):
    DB_URL: str = 'mongodb+srv://tluanga:HUVgogALq13WDSXI@mzu.gc0hy.mongodb.net/?retryWrites=true&w=majority'
    DB_Name: str = 'mzu'


class Settings(CommonSettings, ServerSettings, DatabaseSettings):
    pass


settings = Settings()
