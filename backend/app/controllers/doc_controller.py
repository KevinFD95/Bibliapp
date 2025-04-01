from flask import jsonify
from models import Document

def get_documents():
    documents = Document.get_all()
    return jsonify(documents)