# app/routes/doc_routes.py
from flask import Blueprint
from app.controllers import DocController

document_bp = Blueprint('document_bp', __name__)

document_bp.route('/docs', methods=['GET'])(DocController.get_documents)
document_bp.route('/docs/<int:document_id>', methods=['GET'])(DocController.get_document)
document_bp.route('/docs', methods=['POST'])(DocController.create_document)