# app/controllers/doc_controller.py
from flask import jsonify
from app.models import Document

class DocController:
    def get_documents():
        documents = Document.get_all()
        return jsonify(documents)