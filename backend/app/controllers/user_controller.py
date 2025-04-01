# app/controllers/user_controller.py
from flask import request, jsonify
from app.models import User
import bcrypt

class UserController:
    def get_users():
        users = User.get_all()
        return jsonify(users)

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

    def delete_user():
        data = request.get_json()

        if not data or "username" not in data:
            return jsonify({"error": "Debe proporcionar un username"}), 400
        
        return jsonify(User.delete(data)), 201