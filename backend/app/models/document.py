from database import get_db_connection

class Document:
    @staticmethod
    def get_all():
        conn = get_db_connection()
        cursor = conn.cursor(dictionary=True)
        cursor.execute("SELECT * FROM documents")
        documents = cursor.fetchall()
        conn.close()
        return documents