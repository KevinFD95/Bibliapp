# app/controllers/cart_controller.py
from flask import jsonify, request
from flask_jwt_extended import get_jwt_identity
from app.models import Cart
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
            print(f"Error en CartController: {e}")
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
            print(f"Error en CartController.delete_doc_cart: {e}")
            return ApiResponse.error(message=str(e), status_code=500)
        
    def buy_doc_cart():
        try:
            username = get_jwt_identity()
            buy = Cart.buy_doc_cart(username)
            if buy:
                return ApiResponse.success(message="Compra realizada")
            else:
                return ApiResponse.error(message="No se pudo hacer la compra de tus libros", status_code=400)
        except Exception as e:
            return ApiResponse.error(message=str(e), status_code=500)