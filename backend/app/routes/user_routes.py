# app/routes/user_routes.py
from flask import Blueprint
from flask_jwt_extended import jwt_required, verify_jwt_in_request
from app.controllers import UserController
from app.middlewares import admin_required, token_in_db_required

user_bp = Blueprint("user_bp", __name__)

user_bp.route("/users", methods=["GET"])(
    token_in_db_required(admin_required(UserController.get_users))
)
user_bp.route("/users/<int:user_id>", methods=["GET"])(
    token_in_db_required(admin_required(UserController.get_user_by_id))
)

user_bp.route("/users/<string:username>", methods=["DELETE"])(
    token_in_db_required(admin_required(UserController.delete_user))
)
