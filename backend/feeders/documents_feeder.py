# feeders/documents_feeder.py
import sys, os
import datetime

sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), "..")))

from resources import load_documents
from app.database import Queries, Connection
from app.helpers import generate_slug


class DocumentsFeeder:
    def insert_documents():
        try:
            conn = Connection.get_db_connection()
            cursor = conn.cursor()

            documents = load_documents()
            i = 0

            for doc in documents:
                i += 1
                try:
                    now = datetime.datetime.now()
                    cursor.execute(
                        Queries.DOC_CREATE, (
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
                            now,
                            now,
                        )
                    )
                    conn.commit()
                    print(f"Documento {i} insertado: {doc["title"]}")
                except Exception as e:
                    print(f"Error al insertar documento {i}: {e}")

            print("Documentos insertados correctamente")
        except Exception as e:
            print(f"Error al insertar documentos: {e}")
        finally:
            cursor.close()
            conn.close()


if __name__ == "__main__":
    DocumentsFeeder.insert_documents()
