# app/routes/doc_routes.py
from flask import Blueprint
from app.controllers.doc_controller import DocController

document_bp = Blueprint('document_bp', __name__)

document_bp.route('/documents', methods=['GET'])(DocController.get_documents)