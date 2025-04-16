# app/controllers/user_controller.py
from flask import request, jsonify
from flask_jwt_extended import get_jwt_identity
from app.models import User
from app.helpers import hash_password
from app.validations import (
    user_validation,
    user_name_validation,
    user_lastname_validation,
    username_validation,
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
        data = request.get_json()

        if not isinstance(data, (dict, list)):
            return jsonify({"error": "Formato de datos inválido"}), 400

        users = data if isinstance(data, list) else [data]
        validated_users = []
        errors_list = []

        for i, user in enumerate(users):
            errors = user_validation(user)

            if errors:
                errors_list.append({"user_index": i, "errors": errors})
                continue

            user["user_password"] = hash_password(user["user_password"])
            validated_users.append(user)

        if errors_list:
            errors_list = [str(e) for e in errors_list]
            return jsonify({"errors": errors_list}), 400

        try:
            users_created = User.create(validated_users)
            return jsonify(users_created), 201 if users_created else 400
        except Exception as e:
            return jsonify({"error": str(e)}), 400

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
