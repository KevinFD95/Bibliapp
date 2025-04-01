from flask import request, jsonify
from models import User
import bcrypt

def get_users():
    users = User.get_all()
    return jsonify(users)

def create_user():
    data = request.get_json()

    if not data:
        return jsonify({"error": "No se enviaron datos"}), 400
    if isinstance(data, list):
        for user in data:
            user["password"] = bcrypt.hashpw(user["password"].encode(), bcrypt.gensalt()).decode()
        return jsonify(User.create(data)), 201
    
    data["password"] = bcrypt.hashpw(data["password"].encode(), bcrypt.gensalt()).decode()
    return jsonify(User.create(data)), 201