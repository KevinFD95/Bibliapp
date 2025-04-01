# app/models/document.py
from app.database import Connection, Queries

class Document:
    @staticmethod
    def get_all():
        conn = Connection.get_db_connection()
        cursor = conn.cursor(dictionary=True)
        cursor.execute(Queries.DOC_GETALL)
        documents = cursor.fetchall()
        conn.close()
        return documents