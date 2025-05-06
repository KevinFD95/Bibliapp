# app/controllers/doc_controller.py
from flask import jsonify, request
from app.models import Document
from app.services import ApiResponse


class DocController:
    def get_documents():
        documents = Document.get_all()
        if documents is None:
            return ApiResponse.error(message="No se han obtenido documentos")
        return ApiResponse.success(data={"documents": documents})
    
    def get_documents_random():
        documents = Document.get_all_random()
        if documents is None:
            return ApiResponse.error(message="No se han obtenido documentos")
        return ApiResponse.success(data={"documents": documents})

    def get_document(document_id):
        document = Document.get_document(document_id)
        return jsonify(document)

    # Funciona PERO: revisar codigo
    def create_document():
        data = request.get_json()

        if not data:
            return jsonify({"error": "No se enviaron datos"}), 400

        documents = data if isinstance(data, list) else [data]
        required_fields = {
            "title",
            "author",
            "publication_year",
            "document_type",
            "num_pages",
            "price",
            "synopsis",
            "url_image",
            "url_document",
        }

        for doc in documents:
            missing_fields = required_fields - doc.keys()
            if missing_fields:
                return (
                    jsonify(
                        {
                            "error": f"Faltan los siguientes campos: {', '.join(missing_fields)}"
                        }
                    ),
                    400,
                )

        result = Document.create(documents)
        return jsonify(result), (201 if "message" in result else 500)
