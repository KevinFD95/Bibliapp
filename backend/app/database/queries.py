# app/database/queries.py

class Queries:
    # Users
    USERS_GETALL = "SELECT * FROM users"
    USERS_GET_BY_ID = "SELECT user_name, user_lastname, username, email FROM users WHERE user_id = %s"
    USERS_GET_BY_USERNAME = "SELECT user_id, username, email, user_password FROM users WHERE username = %s"
    USERS_GET_BY_EMAIL = "SELECT user_id, username, email, user_password FROM users WHERE email = %s"
    USERS_INSERT = "INSERT INTO users (user_name, user_lastname, username, email, user_password) VALUES (%s, %s, %s, %s, %s)"
    USERS_DELETE = "DELETE FROM users WHERE username = %s"

    # Documents
    DOC_GETALL_PREVIEW = "SELECT document_id, title, url_image FROM documents"
    DOC_GET_DETAILS = "SELECT author, publication_year, document_type, num_pages, synopsis, price FROM documents WHERE document_id = %s"
    DOC_GET_CONTENT = "SELECT url_document FROM documents WHERE id = %s"
    DOC_CREATE = "INSERT INTO documents (title, author, publication_year, document_type, num_pages, prequel, sequel, synopsis, price, url_image, url_document) VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)"