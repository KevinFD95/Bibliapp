# app/controllers/reg_controller.py
from flask_jwt_extended import get_jwt_identity
from app.models import Registers
from app.services import ApiResponse
from app.models import Registers


class RegisterController:
    def get_all():
        username = get_jwt_identity()

        try:
            documents = Registers.get_all_registers(username)
            return ApiResponse.success(data={"documents": documents})
        except Exception as e:
            return ApiResponse.error(message="Error inesperado", errors=str(e))


    def set_doc_reg(document_id):
        try:
            username = get_jwt_identity()
            if not document_id:
                return ApiResponse.error(
                    message="document_id no proporcionado en el cuerpo de la petición",
                    status_code=400,
                )
            register = Registers.set_doc_cart(document_id, username)
            if not register:
                return ApiResponse.error(
                    message="No se ha podido agregar a tu librería", status_code=404
                )
            return ApiResponse.success(
                message="Documentos de carrito añadido a librería"
            )
        except Exception as e:
            return ApiResponse.error(message=str(e), status_code=500)
