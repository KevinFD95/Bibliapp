# app/routes/purchase_routes.py
from flask import Blueprint
from app.controllers import PurchaseController
from app.middlewares import token_in_db_required

purchase_bp = Blueprint("purchase_bp", __name__)

purchase_bp.route("/purchase", methods=["POST"])(
    token_in_db_required(PurchaseController.finalize_purchase)
)