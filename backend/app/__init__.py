from flask import Flask
from flask_cors import CORS
from .routes import document_bp, user_bp

def create_app():
    app = Flask(__name__)

    CORS(app)

    app.register_blueprint(user_bp, url_prefix="/api")
    app.register_blueprint(document_bp, url_prefix="/api")

    return app