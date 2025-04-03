# app/routes/user_routes.py
from flask import Blueprint
from flask_jwt_extended import jwt_required
from app.controllers import UserController
from app.middlewares import admin_required

user_bp = Blueprint("user_bp", __name__)

user_bp.route("/users", methods=["GET"])(UserController.get_users)
user_bp.route("/users/<int:user_id>", methods=["GET"])(UserController.get_user_by_id)

user_bp.route("/users", methods=["POST"])(UserController.create_user)
user_bp.route("/users/<string:username>", methods=["DELETE"])(
    jwt_required()(admin_required(UserController.delete_user))
)
# user_bp.route('/users/<string:username>', methods=['DELETE'])(UserController.delete_user) No segura
