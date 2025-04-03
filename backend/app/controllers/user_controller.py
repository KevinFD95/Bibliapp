# app/controllers/user_controller.py
from flask import request, jsonify
from app.models import User
from app.helpers import hash_password
from app.validations import user_validation


class UserController:
    def get_users():
        return jsonify(User.get_all())

    def get_user_by_id(user_id):
        user = User.get_user_by_id(user_id)
        status = 200 if "error" not in user else 404
        return jsonify(user), status

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
            return jsonify({"errors": errors_list}), 400

        try:
            users_created = User.create(validated_users)
            return jsonify(users_created), 201 if users_created else 400
        except Exception as e:
            return jsonify({"error": str(e)}), 400

    def delete_user(username):
        if not username:
            return jsonify({"error": "debe proporcionar un username"}), 400

        result = User.delete(username)
        if "error" in result:
            return jsonify(result), 404

        return jsonify(result), 200
