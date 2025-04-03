# app/database/queries.py

# Users
QUERY_USERS_GETALL = "SELECT * FROM users"
QUERY_USERS_CHECKLOGING = "SELECT (username, email, password) FROM users"
QUERY_USERS_INSERT = "INSERT INTO users (user_name, user_lastname, username, email, user_password) VALUES (%s, %s, %s, %s, %s)"
QUERY_USERS_DELETE = "DELETE FROM users WHERE Id = '%s'"