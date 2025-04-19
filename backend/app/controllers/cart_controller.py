# app/controllers/cart_controller.py
from flask import jsonify, request
from app.models import Cart

class CartController:
    def get_cart(username):
        try:
            cart = Cart.get_cart(username)
            if not cart:
                return jsonify({"error": "Carrito vacío"}), 404
            return jsonify(cart)
        except Exception as e:
            return jsonify({"error": str(e)}), 500
    
    def get_cart_doc(username, document_id):
        try:
            exists = Cart.check_doc_cart(username, document_id)
            if exists:
                return jsonify({"exists": True}), 200
            else:
                return jsonify({"exists": False}), 404
        except Exception as e:
            return jsonify({"error": str(e)}), 500
        
    def set_doc_cart(username):
        print(f"CartController.set_doc_cart llamado para el usuario: {username}")
        try:
            data = request.get_json()
            received_document_id = data.get('document_id')
            if not received_document_id:
                return jsonify({"error": "document_id no proporcionado en el cuerpo de la petición"}), 400
            cart = Cart.set_doc_cart(username, received_document_id)
            if not cart:
                return jsonify({"error": "No se ha podido agregar a tu carrito"}), 404
            return jsonify({"message": "Libro añadido al carrito"})
        except Exception as e:
            return jsonify({"error": str(e)}), 500
        
    def delete_doc_cart(username, document_id):
        try:
            deleted = Cart.delete_doc_cart(username, document_id)
            if deleted:
                return jsonify({"message": f"Libro {document_id} eliminado del carrito"})
            else:
                return jsonify({"error": "No se pudo eliminar el libro del carrito"}), 404
        except Exception as e:
            print(f"Error en CartController.delete_doc_cart: {e}")
            return jsonify({"error": str(e)}), 500
        
    def buy_doc_cart(username):
        try:
            buy = Cart.buy_doc_cart(username)
            if buy:
                return jsonify({"message": f"Compra realizada"})
            else:
                return jsonify({"error": "No se pudo hacer la compra de tus libros"}), 404
        except Exception as e:
            print(f"Error en CartController.delete__all_doc_cart: {e}")
            return jsonify({"error": str(e)}), 500