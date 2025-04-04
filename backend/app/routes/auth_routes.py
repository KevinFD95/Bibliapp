from flask import Blueprint
from app.controllers import AuthController

auth_bp = Blueprint("auth_bp", __name__)

# Requests Login
auth_bp.route("/login", methods=["POST"])(AuthController.login)
