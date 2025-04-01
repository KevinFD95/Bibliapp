# app/database/queries.py

class Queries:
    # Users
    USERS_GETALL = "SELECT * FROM users"
    USERS_GET_BY_ID = "SELECT * FROM users WHERE user_id = %s"
    USERS_INSERT = "INSERT INTO users (user_name, user_lastname, username, email, user_password) VALUES (%s, %s, %s, %s, %s)"
    USERS_DELETE = "DELETE FROM users WHERE username = %s"

    # Documents
    DOC_GETALL = "SELECT * FROM documents"