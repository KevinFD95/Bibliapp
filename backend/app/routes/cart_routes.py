# app/routes/cart_routes.py
from flask import Blueprint
from app.controllers import CartController
from app.middlewares import token_in_db_required

cart_bp = Blueprint("cart_bp", __name__)

cart_bp.route("/cart/", methods=["GET"])(
    token_in_db_required(CartController.get_cart)
)
cart_bp.route("/cart/<int:document_id>", methods=["GET"])(
    token_in_db_required(CartController.get_cart_doc)
)
cart_bp.route("/cart/<int:document_id>", methods=["POST"])(
    token_in_db_required(CartController.set_doc_cart)
)
cart_bp.route("/cart/<int:document_id>", methods=["DELETE"])(
    token_in_db_required(CartController.delete_doc_cart)
)
cart_bp.route("/cart/", methods=["DELETE"])(
    token_in_db_required(CartController.buy_doc_cart)
)