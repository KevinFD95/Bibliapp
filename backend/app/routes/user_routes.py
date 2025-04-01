# app/routes/user_routes.py
from flask import Blueprint
from app.controllers import UserController

user_bp = Blueprint('user_bp', __name__)

user_bp.route('/users/getall', methods=['GET'])(UserController.get_users)
user_bp.route('/users/create', methods=['POST'])(UserController.create_user)
user_bp.route('/users/delete', methods=['DELETE'])(UserController.delete_user)