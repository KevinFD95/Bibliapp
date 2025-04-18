# app/routes/cart_routes.py
from flask import Blueprint
from app.controllers import CartController

cart_bp = Blueprint("cart_bp", __name__)

cart_bp.route("/cart/<string:username>", methods=["GET"])(CartController.get_cart)
cart_bp.route("/cart/<string:username>/<int:document_id>", methods=["GET"])(CartController.get_cart_doc)
cart_bp.route("/cart/<string:username>", methods=["POST"])(CartController.set_doc_cart)
cart_bp.route("/cart/<string:username>/<int:document_id>", methods=["DELETE"])(CartController.delete_doc_cart)
cart_bp.route("/cart/<string:username>", methods=["DELETE"])(CartController.buy_doc_cart)