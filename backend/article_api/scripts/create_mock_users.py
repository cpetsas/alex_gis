import psycopg2
import os
import time

db_connection = psycopg2.connect(database=os.environ.get("SQL_DATABASE"),
                                 user=os.environ.get("SQL_USER", "user"),
                                 password=os.environ.get("SQL_PASSWORD", "pass"),
                                 host=os.environ.get("SQL_HOST", "localhost"))
cursor = db_connection.cursor()
query = "INSERT INTO users (username, role, token, password) "\
        "VALUES "\
        f"('regular_user', 'user', 'regular_token','regular_pass'),"\
        f"('admin', 'admin', 'admin_token', 'admin_pass')"

maxRetries = 5
for i in range(maxRetries):
	try:
		cursor.execute(query)
		db_connection.commit()
		db_connection.close()
	except:
		time.sleep(2)