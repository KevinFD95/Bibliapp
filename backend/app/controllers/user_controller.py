from flask import request, jsonify
from app.models.user import User
import bcrypt

def get_users():
    users = User.get_all()
    return jsonify(users)

def create_user():
    data = request.get_json()
    hashed_password = bcrypt.hashpw(data['password'].encode(), bcrypt.gensalt())
    response = User.create(data['name'], data['email'], hashed_password.decode())
    return jsonify(response)