# app/controllers/user_controller.py
from flask import request, jsonify
from flask_jwt_extended import create_access_token
from app.models import User
import bcrypt

class UserController:
    def get_users():
        return jsonify(User.get_all())
    
    def get_user_by_id(user_id):
        user = User.get_user_by_id(user_id)
        status = 200 if "error" not in user else 404
        return jsonify(user), status
    
    def get_user_by_username(username):
        user = User.get_user_by_username(username)
        status = 200 if "error" not in user else 404
        return jsonify(user), status
    
    def get_user_by_email(email):
        user = User.get_user_by_email(email)
        status = 200 if "error" not in user else 404
        return jsonify(user), status
    
    def login_by_username():
        data = request.get_json()
        
        if not data or "username" not in data or "user_password" not in data:
            return jsonify({"error": "Se requiere nombre de usuario y contraseña"}), 400
        
        user = User.get_user_by_username(data["username"])
        if not user or not User.verify_password(data["user_password"], user["user_password"]):
            return jsonify({"error": "Credenciales incorrectas"}), 401
        
        access_token = create_access_token(identity={"user_id": user["user_id"], "username": user["username"]})
        return jsonify({"message": "Login con exito", "access_token": access_token, "user": {"user_id": user["user_id"], "username": user["username"]}}), 200
    
    def login_by_email():
        data = request.get_json()
        
        if not data or "email" not in data or "user_password" not in data:
            return jsonify({"error": "Se requiere nombre de usuario y contraseña"}), 400
        
        user = User.get_user_by_email(data["email"])
        if not user or not User.verify_password(data["user_password"], user["user_password"]):
            return jsonify({"error": "Credenciales incorrectas"}), 401
        
        access_token = create_access_token(identity={"user_id": user["user_id"], "email": user["email"]})
        return jsonify({"message": "Login con exito", "access_token": access_token, "user": {"user_id": user["user_id"], "email": user["email"]}}), 200

    def create_user():
        data = request.get_json()

        if not data:
            return jsonify({"error": "No se enviaron datos"}), 400
        if isinstance(data, list):
            for user in data:
                if "user_password" not in user or "username" not in user:
                    return jsonify({"error": "Datos incompletos en uno o más usuarios"}), 400
                
                user["user_password"] = bcrypt.hashpw(user["user_password"].encode(), bcrypt.gensalt()).decode()
            
            users_created = User.create(data)
            status = 201 if users_created else 500
            return jsonify(users_created), status
        
        if "user_password" not in data or "username" not in data:
            return jsonify({"error": "Faltan datos requeridos"}), 400
        
        data["user_password"] = bcrypt.hashpw(data["user_password"].encode(), bcrypt.gensalt()).decode()

        user_created = User.create(data)
        status = 201 if user_created else 500
        
        return jsonify(user_created), status

    def delete_user(username):
        if not username:
            return jsonify({"error": "debe proporcionar un username"}), 400
        
        result  = User.delete(username)
        if "error" in result:
            return jsonify(result), 404

        return jsonify(result), 200