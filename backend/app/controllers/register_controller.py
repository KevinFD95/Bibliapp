# app/controllers/reg_controller.py
from flask import jsonify
from flask_jwt_extended import get_jwt_identity
from app.models import Registers
from app.services import ApiResponse

class RegisterController:
    def get_all():
        username = get_jwt_identity()

        try:
            documents = Registers.get_all_registers(username)
            if documents is None:
                return ApiResponse.error(message="Error al obtener la librería (BBDD)")
            return ApiResponse.success(data={"documents": documents})
        except Exception as e:
            return ApiResponse.error(message="Error inesperado al obtener la librería", errors=str(e)), 500


    def set_doc_reg(document_id):
        try:
            username = get_jwt_identity()
            if not document_id:
                return ApiResponse.error(
                    message="document_id no proporcionado en el cuerpo de la petición",
                    status_code=400,
                )
            register = Registers.set_doc_reg_from_cart(document_id, username)
            if not register:
                return ApiResponse.error(
                    message="No se ha podido agregar a tu librería", status_code=404
                )
            return ApiResponse.success(
                message="Documentos de carrito añadido a librería"
            )
        except Exception as e:
            return ApiResponse.error(message=str(e), status_code=500)

    def check_document(document_id):
        try:
            current_user_username = get_jwt_identity()

            if not current_user_username:
                 return ApiResponse.error(message="Usuario no identificado"), 401

            is_registered = Registers.is_registered(current_user_username, document_id)

            if is_registered is None:
                return ApiResponse.error(message="Error al verificar registro del documento (BD)"), 500

            return ApiResponse.success(data={"isRegistered": is_registered})

        except Exception as e:
            return ApiResponse.error(message=f"Error inesperado del servidor: {e}"), 500