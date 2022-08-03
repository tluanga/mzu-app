from passlib.context import CryptContext

SECRET_KEY = '58d12effbb41dd811e8fe48293542256135bc81975a6ba6d0b7a546de0fd519d'
ALGORITHM = 'HS256'
ACCESS_TOKEN_EXPIRE_MINUTES = 30

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")


def verify_password(plain_password, hashed_password):
    return pwd_context.verify(plain_password, hashed_password)


def get_password_hash(password):
    return pwd_context.hash(password)
