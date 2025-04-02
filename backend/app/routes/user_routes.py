# app/routes/user_routes.py
from flask import Blueprint
from app.controllers import UserController

user_bp = Blueprint('user_bp', __name__)

user_bp.route('/users', methods=['GET'])(UserController.get_users)
user_bp.route('/users/<int:user_id>', methods=['GET'])(UserController.get_user_by_id)

# Requests Login
user_bp.route('/users/login/username', methods=['POST'])(UserController.login_by_username)
user_bp.route('/users/login/email', methods=['POST'])(UserController.login_by_email)

user_bp.route('/users', methods=['POST'])(UserController.create_user)
user_bp.route('/users/<string:username>', methods=['DELETE'])(UserController.delete_user)