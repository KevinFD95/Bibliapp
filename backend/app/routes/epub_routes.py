# app/routes/epub_routes.py
from flask import Blueprint
from app.controllers import EpubController

epub_bp = Blueprint("epub_bp", __name__)

epub_bp.route("/epub/<int:document_id>", methods=["GET"])(EpubController.convert_epub_to_html)
