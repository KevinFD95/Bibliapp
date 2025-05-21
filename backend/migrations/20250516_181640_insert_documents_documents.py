# migrations/20250520_181640_insert_documents_documents.py
import os
import datetime
import json
from app.database import Queries
from app.helpers import generate_slug

# Migración: insert_documents_documents
# Fecha de creación: 20250516_181640


def upgrade(cursor):
    # Aquí va el código para aplicar la migración
    path = os.path.join(os.path.dirname(__file__), "..",
                        "resources", "documents.json")
    with open(path, encoding="utf-8") as f:
        documents = json.load(f)

    for i, doc in enumerate(documents, start=1):
        try:
            cursor.execute(Queries.DOC_CREATE, (
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
            )
        except Exception as e:
            print(f"Error al insertar documento {i}: {e}")
    pass


def downgrade(cursor):
    # Aquí va el código para revertir la migración
    cursor.execute()
    pass
