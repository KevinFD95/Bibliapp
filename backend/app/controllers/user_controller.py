# app/controllers/user_controller.py
from flask import request, jsonify
from flask_jwt_extended import get_jwt_identity
from app.models import User
from app.helpers import hash_password
from app.validations import (
    user_validation,
    user_name_validation,
    user_lastname_validation,
    email_validation,
)
from app.services import ApiResponse


class UserController:
    def get_users():
        return jsonify(User.get_all())

    def get_user_by_id(user_id):
        user = User.get_user_by_id(user_id)
        status = 200 if "error" not in user else 404
        return jsonify(user), status

    def get_profile():
        username = get_jwt_identity()
        return ApiResponse.success(
            data={"user": User.get_user_data_by_username(username)}
        )

    def create_user():
        try:
            data = request.get_json()

            if not data:
                return ApiResponse.error(message="Formato de datos inválido.")

            data["user_password"] = hash_password(data["user_password"])

            if User.create(data):
                return ApiResponse.success(message="Usuario "+data["username"]+" creado exitósamente.", status_code=201)
            else:
                return ApiResponse.error(message="El usuario no es válido.", status_code=400)
        except Exception as e:
            return ApiResponse.error(message="No se ha podido registrar el usuario.")

    def update_profile(username):
        try:
            user = request.get_json()

            if not user_name_validation(user.get("user_name")):
                return ApiResponse.error(message="Nombre no válido")
            if not user_lastname_validation(user.get("user_lastname")):
                return ApiResponse.error(message="Apellidos no válidos")
            if not email_validation(user.get("email")):
                return ApiResponse.error(message="Correo electrónico no válido")

            return ApiResponse.success(data=User.update(user))
        except Exception:
            return ApiResponse.error(
                message="No se ha podido actualizar el usuario en la base de datos."
            )

    def delete_user(username):
        if not username:
            return jsonify({"error": "Debe proporcionar un username"}), 400

        result = User.delete(username)
        if "error" in result:
            return jsonify(result), 404

        return jsonify(result), 200
