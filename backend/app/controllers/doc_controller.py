# app/controllers/doc_controller.py
from flask import jsonify, request
from app.models import Document
from app.services import ApiResponse, EpubConverter, PDFConverter
from config import Config
import os


class DocController:
    def get_documents():
        documents = Document.get_all()
        if documents is None:
            return ApiResponse.error(message="No se han obtenido documentos")
        return ApiResponse.success(data={"documents": documents})

    def get_document(document_id):
        document = Document.get_document(document_id)

        url = document["url_document"]

        file_path = os.path.join(Config.CLOUD_PATH, url)

        if file_path.endswith(".pdf"):
            converter = PDFConverter(file_path)
            pdf_converted = converter.convert_pdf_to_html()
            if pdf_converted:
                return ApiResponse.success(data={"pages": pdf_converted})
            elif pdf_converted is None:
                return ApiResponse.error(message="No se ha podido convertir el documento")
        elif file_path.endswith(".epub"):
            converter = EpubConverter(file_path)
            epub_converted = converter.convert_to_html()
            if epub_converted:
                return ApiResponse.success(data={"pages": epub_converted})
            elif epub_converted is None:
                return ApiResponse.error(message="No se ha podido convertir el documento")
        else:
            return ApiResponse.error(message="Formato de documento no soportado")

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
