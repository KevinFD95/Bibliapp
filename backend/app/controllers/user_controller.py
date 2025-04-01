# app/controllers/user_controller.py
from flask import request, jsonify
from app.models import User
import bcrypt

class UserController:
    def get_users():
        users = User.get_all()

        return jsonify(users)
    
    def get_user_by_id(user_id):
        user = User.get_user_by_id(user_id)

        if user is None:
            return jsonify({"error": "Usuario no encontrado"}), 404

        return jsonify(user), 200

    def create_user():
        data = request.get_json()

        if not data:
            return jsonify({"error": "No se enviaron datos"}), 400
        if isinstance(data, list):
            for user in data:
                user["user_password"] = bcrypt.hashpw(user["user_password"].encode(), bcrypt.gensalt()).decode()
            return jsonify(User.create(data)), 201
        
        data["user_password"] = bcrypt.hashpw(data["user_password"].encode(), bcrypt.gensalt()).decode()

        return jsonify(User.create(data)), 201

    def delete_user(username):
        return jsonify(User.delete(username)), 200