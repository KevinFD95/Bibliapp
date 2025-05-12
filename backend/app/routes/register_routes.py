# app/routes/reg_routes.py
from flask import Blueprint
from app.controllers import RegisterController
from app.middlewares import token_in_db_required

register_bp = Blueprint("reg_bp", __name__)

register_bp.route("/registers/", methods=["GET"])(
    token_in_db_required(RegisterController.get_all)
)

register_bp.route("/registers/<int:document_id>", methods=["GET"])(
    token_in_db_required(RegisterController.check_document)
)