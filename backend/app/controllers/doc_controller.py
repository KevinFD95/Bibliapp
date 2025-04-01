from flask import jsonify
from app.models import Document

def get_documents():
    documents = Document.get_all()
    return jsonify(documents)