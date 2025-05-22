# app/controllers/doc_controller.py
from flask import jsonify, request
from flask_jwt_extended import jwt_required, get_jwt_identity
from app.models import Document
from app.services import ApiResponse, EpubConverter, PDFConverter
from app.helpers import download_file_from_url
from config import Config
import os, uuid


class DocController:
    def get_documents():
        documents = Document.get_all()
        if documents is None:
            return ApiResponse.error(message="No se han obtenido documentos")
        return ApiResponse.success(data={"documents": documents})
    
    def get_documents_news():
        documents = Document.get_all_news()
        if documents is None:
            return ApiResponse.error(message="No se han encontrado documentos")
        return ApiResponse.success(data={"documents": documents})
    
    def get_documents_random():
        documents = Document.get_all_random()
        if documents is None:
             return ApiResponse.error(message="Error al obtener documentos aleatorios generales (BD)")
        return ApiResponse.success(data={"documents": documents})
    
    def get_documents_random_by_user_categories():
        try:
            username = get_jwt_identity()

            if not username:
                 return ApiResponse.error(message="Identidad de usuario no válida"), 401

            documents = Document.get_all_random_by_user_categories(username)

            if documents is None:
                return ApiResponse.error(message="Error al obtener recomendaciones por categorías (Error BD/Modelo)"), 500

            
            return ApiResponse.success(data={"documents": documents})

        except Exception as e:
            return ApiResponse.error(message=f"Error inesperado del servidor: {e}"), 500

    def get_document(document_id):
        document = Document.get_document(document_id)
        url = document["url_document"]

        TEMP_DIR = os.path.join(os.path.dirname(__file__), "../temp")

        temp_path = None

        try:
            if url.startswith("http"):
                os.makedirs(TEMP_DIR, exist_ok=True)

                ext = ".pdf" if url.endswith(".pdf") else ".epub"
                file_name = f"{uuid.uuid4().hex}"
                temp_path = os.path.join(TEMP_DIR, file_name)
                
                download_file_from_url(url, temp_path)
            
                mime_type = None
                if not mime_type:
                    with open(temp_path, 'rb') as f:
                        header = f.read(4)
                        if header.startswith(b'%PDF'):
                            mime_type = 'application/pdf'
                        elif header[:4] == b'PK\x03\x04':
                            mime_type = 'application/epub+zip'

                if mime_type == 'application/pdf':
                    temp_path_with_ext = temp_path + ".pdf"
                    os.rename(temp_path, temp_path_with_ext)
                    temp_path = temp_path_with_ext
                elif mime_type == 'application/epub+zip':
                    temp_path_with_ext = temp_path + ".epub"
                    os.rename(temp_path, temp_path_with_ext)
                    temp_path = temp_path_with_ext
                else:
                    return ApiResponse.error(message="Formato de documento no soportado1")
                
            else:
                temp_path = os.path.join(Config.CLOUD_PATH, url)

            if temp_path.endswith(".pdf"):
                converter = PDFConverter(temp_path)
                result = converter.convert_pdf_to_html()
            elif temp_path.endswith(".epub"):
                converter = EpubConverter(temp_path)
                result = converter.convert_to_html()
            else:
                return ApiResponse.error(message="Formato de documento no soportado2")
            
            if result:
                return ApiResponse.success(data={"pages": result})
            else:
                return ApiResponse.error(message="No se ha podido convertir el documento")
            
        except Exception as e:
            return ApiResponse.error(message=str(e))
        finally:
            if url.startswith("http") and temp_path and os.path.exists(temp_path):
                os.remove(temp_path)

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
        if "message" in result:
             return jsonify(result), 201
        else:
             return jsonify(result), 500
