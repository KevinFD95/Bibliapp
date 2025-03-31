from flask import Blueprint
from app.controllers.doc_controller import get_documents

document_bp = Blueprint('document_bp', __name__)

document_bp.route('/documents', methods=['GET'])(get_documents)