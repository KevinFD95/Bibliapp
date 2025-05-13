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
        except Exception as e:
            print(f"Error fetching all documents: {e}")
            return None
        
    @staticmethod
    def get_all_random():
        try:
            conn = Connection.get_db_connection()
            cursor = conn.cursor(dictionary=True)
            cursor.execute(Queries.DOC_GETALL_RANDOM)
            documents = cursor.fetchall()
            conn.close()
            return documents
        except Exception as e:
            print(f"Error fetching general random documents: {e}")
            return None

    @staticmethod
    def get_all_random_by_user_categories(user_identifier):
        try:
            conn = Connection.get_db_connection()
            cursor = conn.cursor(dictionary=True)
            cursor.execute(Queries.DOC_GETALL_RANDOM_BY_USER_CATEGORIES, (user_identifier, user_identifier, user_identifier))
            documents = cursor.fetchall()
            conn.close()
            return documents
        except Exception as e:
            print(f"FATAL ERROR Modelo: Excepción capturada en get_all_random_by_user_categories: {e}")
            return None

    @staticmethod
    def get_document(document_id):
        try:
            conn = Connection.get_db_connection()
            cursor = conn.cursor(dictionary=True)
            cursor.execute(Queries.DOC_GET_DOCUMENT, (document_id,))
            document = cursor.fetchone()
            conn.close()
            if document:
                 return document
            else:
                 return {"error": "Documento no encontrado"}
        except Exception as e:
            print(f"Error fetching document by ID {document_id}: {e}")
            return {"error": "Error al obtener los datos del documento"}
    
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
                        doc["saga"],
                        doc["prequel"],
                        doc["sequel"],
                        doc["synopsis"],
                        doc["category_1"],
                        doc["category_2"],
                        doc["price"],
                        doc["url_image"],
                        doc["url_document"],
                        generate_slug(doc["title"]),
                    )
                    for doc in docs
                ]
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
                        docs["saga"],
                        docs["prequel"],
                        docs["sequel"],
                        docs["synopsis"],
                        docs["category_1"],
                        docs["category_2"],
                        docs["price"],
                        docs["url_image"],
                        docs["url_document"],
                        generate_slug(docs["title"]),
                    ),
                )

            conn.commit()
            conn.close()

            return {"message": "Documento(s) insertado(s) correctamente"}
        except Exception as e:
            print(f"Error creating document(s): {e}") # Log del error
            return {"error": "No se ha podido insertar ningún documento"}
