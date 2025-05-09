# app/routes/doc_routes.py
from flask import Blueprint
from flask_jwt_extended import jwt_required
from app.controllers import DocController
from app.middlewares import token_in_db_required

document_bp = Blueprint("document_bp", __name__)

document_bp.route("/docs", methods=["GET"])(DocController.get_documents)
document_bp.route("/random", methods=["GET"])(DocController.get_documents_random)
document_bp.route("/random/by_categories", methods=["GET"])(
    jwt_required()(DocController.get_documents_random_by_user_categories)
)
document_bp.route("/docs/<int:document_id>", methods=["GET"])(
    token_in_db_required(DocController.get_document)
)
document_bp.route("/docs", methods=["POST"])(
    token_in_db_required(DocController.create_document)
)
