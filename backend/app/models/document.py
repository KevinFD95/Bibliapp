# app/models/document.py
from app.database import Connection, Queries
from app.helpers import generate_slug


class Document:
    @staticmethod
    def get_all():
        try:
            conn = Connection.get_db_connection()
            cursor = conn.cursor(dictionary=True)
            cursor.execute(Queries.DOC_GETALL)
            documents = cursor.fetchall()
            conn.close()
            return documents
        except Exception:
            return {
                "error": "No se han obtenido las previsualizaciones de los documentos"
            }

    @staticmethod
    def get_document(document_id):
        try:
            conn = Connection.get_db_connection()
            cursor = conn.cursor(dictionary=True)
            cursor.execute(Queries.DOC_GET_DOCUMENT, (document_id,))
            document = cursor.fetchone()
            conn.close()
            return document
        except Exception:
            return {"error": "No se han obtenido los datos del documento"}

    @staticmethod
    def create(docs):
        try:
            conn = Connection.get_db_connection()
            cursor = conn.cursor()

            if isinstance(docs, list):
                values = [
                    (
                        doc["title"],
                        doc["author"],
                        doc["publication_year"],
                        doc["document_type"],
                        doc["num_pages"],
                        doc["prequel"],
                        doc["sequel"],
                        doc["synopsis"],
                        doc["price"],
                        doc["url_image"],
                        doc["url_document"],
                        generate_slug(doc["title"]),
                    )
                    for doc in docs
                ]
                # Generar slug a partir del titulo del libro
                cursor.executemany(Queries.DOC_CREATE, values)
            else:
                cursor.execute(
                    Queries.DOC_CREATE,
                    (
                        docs["title"],
                        docs["author"],
                        docs["publication_year"],
                        docs["document_type"],
                        docs["num_pages"],
                        docs["prequel"],
                        docs["sequel"],
                        docs["synopsis"],
                        docs["price"],
                        docs["url_image"],
                        docs["url_document"],
                        generate_slug(docs["title"]),
                    ),
                )

            conn.commit()
            conn.close()

            return {"message": "Documento(s) insertado(s) correctamente"}
        except Exception:
            return {"error": "No se ha podido insertar ningún documento"}
