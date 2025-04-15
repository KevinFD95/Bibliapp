# app/routes/cart_routes.py
from flask import Blueprint
from app.controllers import CartController

cart_bp = Blueprint("cart_bp", __name__)

cart_bp.route("/cart", methods=["GET"])(CartController.get_cart)
cart_bp.route("/cart/<string:username>", methods=["GET"])(
    CartController.get_cart
)