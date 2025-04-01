# app/database/queries.py

class Queries:
    # Users
    USERS_GETALL = "SELECT * FROM users"
    USERS_CHECKLOGIN = "SELECT (username, email, password) FROM users"
    USERS_INSERT = "INSERT INTO users (user_name, user_lastname, username, email, user_password) VALUES (%s, %s, %s, %s, %s)"
    USERS_DELETE = "DELETE FROM users WHERE username = %s"

    # Documents