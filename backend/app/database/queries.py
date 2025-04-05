# app/database/queries.py


class Queries:
    # Users
    USERS_GETALL = "SELECT * FROM users"
    USERS_GET_BY_ID = (
        "SELECT user_name, user_lastname, username, email FROM users WHERE user_id = %s"
    )
    USERS_GET_BY_USERNAME = "SELECT username, email, user_password, user_role FROM users WHERE username = %s"
    USERS_GET_BY_EMAIL = (
        "SELECT username, email, user_password, user_role FROM users WHERE email = %s"
    )
    USERS_INSERT = "INSERT INTO users (user_name, user_lastname, username, email, user_password) VALUES (%s, %s, %s, %s, %s)"
    USERS_DELETE = "DELETE FROM users WHERE username = %s"

    # Auth
    AUTH_GET_TOKENS = (
        "SELECT token, expires_at FROM TOKENS WHERE username = %s AND token = %s"
    )
    AUTH_INSERT_TOKEN = "INSERT INTO tokens (username, token, device, expires_at) VALUES (%s, %s, %s, %s)"

    # Documents
    DOC_GETALL = "SELECT * FROM documents"
    DOC_GET_DOCUMENT = "SELECT * FROM documents WHERE document_id = %s"
    DOC_CREATE = "INSERT INTO documents (title, author, publication_year, document_type, num_pages, prequel, sequel, synopsis, price, url_image, url_document, slug) VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)"
