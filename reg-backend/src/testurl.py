
username = 'doadmin'
password = 'AVNS_b9Vg91NviGdusmKpr6w'
host = 'db-postgresql-blr1-37501-do-user-11666242-0.b.db.ondigitalocean.com'
port = 25060
database = 'defaultdb'
sslmode = 'require'
SQLALCHEMY_DATABASE_URL = f"postgressql://{username}:{password}@{host}:{port}/{database}"


print(SQLALCHEMY_DATABASE_URL)
