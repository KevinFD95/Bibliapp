# app/routes/doc_routes.py
from flask import Blueprint
from app.controllers import DocController

document_bp = Blueprint('document_bp', __name__)

@document_bp.route('/docs/getall', methods=['GET'])
def get_documents():
    return DocController.get_documents()