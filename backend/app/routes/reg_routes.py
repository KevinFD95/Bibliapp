# app/routes/reg_routes.py
from flask import Blueprint
from app.controllers import RegController
from app.middlewares import token_in_db_required

reg_bp = Blueprint("reg_bp", __name__)

reg_bp.route("/cart/<int:document_id>", methods=["POST"])(
    token_in_db_required(RegController.set_doc_reg)
)