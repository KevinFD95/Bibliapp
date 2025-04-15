# app/controllers/cart_controller.py
from flask import jsonify
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