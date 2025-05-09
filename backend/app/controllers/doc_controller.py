# app/controllers/doc_controller.py
from flask import jsonify, request
from app.models import Document
from app.services import ApiResponse
from flask_jwt_extended import jwt_required, get_jwt_identity
import logging


class DocController:
    def get_documents():
        documents = Document.get_all()
        if documents is None:
            return ApiResponse.error(message="No se han obtenido documentos")
        return ApiResponse.success(data={"documents": documents})
    
    def get_documents_random():
        documents = Document.get_all_random()
        if documents is None:
             return ApiResponse.error(message="Error al obtener documentos aleatorios generales (BD)")
        return ApiResponse.success(data={"documents": documents})
    
    @jwt_required()
    def get_documents_random_by_user_categories():
                
        username = get_jwt_identity()
        
        print(f"DEBUG Control: Solicitud para recomendaciones para usuario: {username}") #################### Log

        print(f"DEBUG Control: Username obtenido de JWT: {username}")

        try:
            documents = Document.get_all_random_by_user_categories(username)

            if documents is None:
                print("ERROR Control: Modelo retornó None, enviando ApiResponse.error") # Log
                return ApiResponse.error(message="Error al obtener recomendaciones por categorías (Error BD/Modelo)"), 500
            return ApiResponse.success(data={"documents": documents})

        except Exception as e:
            print(f"FATAL ERROR Control: Excepción INESPERADA en el controlador: {e}") # LOG CLAVE si el error no viene del modelo
            return ApiResponse.error(message=f"Error inesperado en el servidor: {e}"), 500 # Retornar 500 y logear la excepción

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
