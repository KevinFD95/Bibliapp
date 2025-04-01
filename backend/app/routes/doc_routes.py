from flask import Blueprint
from controllers import get_documents

document_bp = Blueprint('document_bp', __name__)

document_bp.route('/documents', methods=['GET'])(get_documents)