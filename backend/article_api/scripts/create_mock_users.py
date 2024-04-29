import psycopg2
import os
from cryptography.fernet import Fernet

key = Fernet.generate_key()
os.environ["SECRET_KEY"] = key.decode()
encrypted_token_regular = Fernet(key).encrypt("unique_user_token".encode()).decode()
encrypted_pass_regular = Fernet(key).encrypt("regular_pass".encode()).decode()
encrypted_token_admin = Fernet(key).encrypt("unique_admin_token".encode()).decode()
encrypted_pass_admin = Fernet(key).encrypt("admin_pass".encode()).decode()

db_connection = psycopg2.connect(database=os.environ.get("SQL_DATABASE"),
                                 user=os.environ.get("SQL_USER", "user"),
                                 password=os.environ.get("SQL_PASSWORD", "pass"),
                                 host=os.environ.get("SQL_HOST", "localhost"))
cursor = db_connection.cursor()
query = "INSERT INTO users (username, role, token, password) "\
        "VALUES "\
        f"('regular_user', 'user', '{encrypted_token_regular}','{encrypted_pass_regular}'),"\
        f"('admin', 'admin', '{encrypted_token_admin}', '{encrypted_pass_admin}')"
cursor.execute(query)
db_connection.commit()
db_connection.close()