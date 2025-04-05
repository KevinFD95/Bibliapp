from flask import Blueprint
from app.controllers import AuthController, UserController

auth_bp = Blueprint("auth_bp", __name__)

# Requests Login
auth_bp.route("/login", methods=["POST"])(AuthController.login)

# Requests Register
auth_bp.route("/register", methods=["POST"])(UserController.create_user)

# Requests Logout
