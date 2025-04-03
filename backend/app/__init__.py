from flask import Flask
from flask_cors import CORS
from flask_jwt_extended import JWTManager
from config import Config
from .routes import document_bp, user_bp, auth_bp
from datetime import timedelta

def create_app():
    app = Flask(__name__)

    app.config["JWT_SECRET_KEY"] = Config.SECRET_KEY
    app.config["JWT_ACCESS_TOKEN_EXPIRES"] = timedelta(days=7)
    JWTManager(app)

    CORS(app)

    app.register_blueprint(user_bp, url_prefix="/api")
    app.register_blueprint(document_bp, url_prefix="/api")
    app.register_blueprint(auth_bp, url_prefix="/api")

    return app