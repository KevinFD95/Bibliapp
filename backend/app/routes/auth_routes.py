# app/routes/auth_routes.py
from flask import Blueprint
from app.controllers import AuthController, UserController
from app.middlewares import token_in_db_required

auth_bp = Blueprint("auth_bp", __name__)

# Requests Login
auth_bp.route("/login", methods=["POST"])(AuthController.login)
auth_bp.route("/validate-token", methods=["GET"])(token_in_db_required(AuthController.validate_token))

# Requests Register
auth_bp.route("/register", methods=["POST"])(UserController.create_user)

# Requests Logout
auth_bp.route("/logout", methods=["POST"])(token_in_db_required(AuthController.logout))

# Request Password Reset
auth_bp.route("/forgot-password", methods=["POST"])(AuthController.forgot_password_request)
auth_bp.route("/reset-password", methods=["POST"])(AuthController.forgot_password_confirm)