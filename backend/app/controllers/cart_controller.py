# app/controllers/cart_controller.py
from flask_jwt_extended import get_jwt_identity
from app.models import Cart, Registers
from app.services import ApiResponse


class CartController:
    def get_cart():
        try:
            username = get_jwt_identity()
            cart = Cart.get_cart(username)
            if not cart:
                return ApiResponse.error(message="Carrito vacío", status_code=404)
            return ApiResponse.success(data={"cart": cart})
        except Exception as e:
            return ApiResponse.error(message="Error en conexión", status_code=500)
    
    def get_cart_doc(document_id):
        try:
            username = get_jwt_identity()
            exists = Cart.check_doc_cart(username, document_id)
            if exists:
                return ApiResponse.success(message="Existe documento en el carrito")
            else:
                return ApiResponse.error(message="No existe el documento en el carrito", status_code= 404)
        except Exception as e:
            return ApiResponse.error(message=str(e), status_code=500)
        
    def set_doc_cart(document_id):
        try:
            username = get_jwt_identity()
            if not document_id:
                return ApiResponse.error(message="document_id no proporcionado en el cuerpo de la petición", status_code=400)
            cart = Cart.set_doc_cart(username, document_id)
            if not cart:
                return ApiResponse.error(message="No se ha podido agregar a tu carrito", status_code=404)
            return ApiResponse.success(message="Libro añadido al carrito")
        except Exception as e:
            return ApiResponse.error(message=str(e), status_code=500)
        
    def delete_doc_cart(document_id):
        try:
            username = get_jwt_identity()
            deleted = Cart.delete_doc_cart(username, document_id)
            if deleted:
                return ApiResponse.success(message=f"Libro {document_id} eliminado del carrito")
            else:
                return ApiResponse.error(message="No se pudo eliminar el libro del carrito", status_code=400)
        except Exception as e:
            return ApiResponse.error(message=str(e), status_code=500)
    
    def buy_doc_cart():
        try:
            username = get_jwt_identity()
            if not username:
                return ApiResponse.error(message="Usuario no autenticado", status_code=401)
            cart_items = Cart.get_cart(username)

            if not cart_items:
                return ApiResponse.error(message="El carrito está vacío. No hay documentos para comprar.", status_code=400)
            
            registered_count = Registers.add_cart_items_to_registers(username, cart_items)
            
            if registered_count is None:
                 return ApiResponse.error(message="Error al registrar los documentos comprados.", status_code=500)
            
            Cart.buy_doc_cart(username)

            return ApiResponse.success(message="Compra finalizada: Documentos registrados y carrito vaciado.")

        except Exception as e:
            return ApiResponse.error(message=f"Error interno al procesar la compra: {str(e)}", status_code=500)