# app/routes/user_routes.py
from flask import Blueprint
from app.controllers import UserController

user_bp = Blueprint('user_bp', __name__)

@user_bp.route('/users/getall', methods=['GET'])
def get_users():
    return UserController.get_users()

@user_bp.route('/users/get/<int:user_id>', methods=['GET'])
def get_user_by_id(user_id):
    return UserController.get_user_by_id(user_id)

@user_bp.route('/users/create', methods=['POST'])
def create_user():
    return UserController.create_user()

@user_bp.route('/users/delete/<string:username>', methods=['DELETE'])
def delete_user(username):
    return UserController.delete_user(username)