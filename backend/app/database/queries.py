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
    USERS_GET_DATA_BY_USERNAME = "SELECT user_name, user_lastname, email, username, user_sub FROM users WHERE username = %s"
    USERS_INSERT = "INSERT INTO users (user_name, user_lastname, username, email, user_password) VALUES (%s, %s, %s, %s, %s)"
    USERS_UPDATE_BY_USERNAME = "UPDATE users SET user_name = %s, user_lastname = %s, email = %s  WHERE username = %s"
    USERS_CHANGEPASSWORD = "UPDATE users SET user_password = %s WHERE email = %s"
    USERS_DELETE = "DELETE FROM users WHERE username = %s"

    # Auth
    AUTH_GET_TOKENS = (
        "SELECT token, expires_at FROM TOKENS WHERE username = %s AND token = %s"
    )
    AUTH_INSERT_TOKEN = "INSERT INTO tokens (username, token, device, expires_at) VALUES (%s, %s, %s, %s)"
    AUTH_DELETE_TOKEN = "DELETE FROM tokens WHERE token = %s"

    # Documents
    DOC_GETALL = "SELECT * FROM documents ORDER BY updated_at DESC LIMIT 10"
    DOC_GETALL_RANDOM = "SELECT * FROM documents ORDER BY RAND() LIMIT 10"
    DOC_GET_DOCUMENT = "SELECT url_document FROM documents WHERE document_id = %s"
    DOC_CREATE = "INSERT INTO documents (title, author, publication_year, document_type, num_pages, saga, prequel, sequel, synopsis, category_1, category_2, price, url_image, url_document, slug) VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)"
    DOC_GETALL_RANDOM_BY_USER_CATEGORIES = """
        SELECT DISTINCT d_rec.*
        FROM documents d_rec
        JOIN (
            SELECT DISTINCT d.category_1 AS category_name
            FROM documents d
            JOIN registers r ON d.document_id = r.document_id
            WHERE r.username = %s

            UNION

            SELECT DISTINCT d.category_2 AS category_name
            FROM documents d
            JOIN registers r ON d.document_id = r.document_id
            WHERE r.username = %s AND d.category_2 IS NOT NULL AND d.category_2 != ''

        ) AS user_categories ON d_rec.category_1 = user_categories.category_name
                            OR (d_rec.category_2 IS NOT NULL AND d_rec.category_2 != '' AND d_rec.category_2 = user_categories.category_name)

        WHERE d_rec.document_id NOT IN (SELECT document_id FROM registers WHERE username = %s)

        ORDER BY RAND()
        LIMIT 10;
        """


    # Cart
    CART_GETALL = "SELECT d.* FROM cart c JOIN documents d ON c.document_id = d.document_id WHERE c.username = %s"
    CART_CHECK_DOC = "SELECT 1 FROM cart WHERE username = %s AND document_id = %s"
    CART_ADD_DOC = "INSERT INTO cart (username, document_id) VALUES (%s, %s)"
    CART_DELETE_DOC = "DELETE FROM cart WHERE document_id = %s AND username = %s"
    CART_BUY_DOC = "DELETE FROM cart WHERE username = %s"

    # Registers
    REGISTER_GET_ALL = "SELECT documents.* FROM registers JOIN documents ON registers.document_id = documents.document_id WHERE username = %s"
    REG_INSERT_DOCS = "INSERT INTO registers (document_id, username) VALUES (%s, %s)"
    REG_IS_REGISTERED = "SELECT 1 FROM registers WHERE username = %s AND document_id = %s"
