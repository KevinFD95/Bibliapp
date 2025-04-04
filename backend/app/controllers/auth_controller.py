# app/controllers/auth_controller.py
from flask import request, jsonify
from flask_jwt_extended import create_access_token
from app.models import User
from app.helpers import verify_password


class AuthController:
    def login():
        data = request.get_json()

        if not data or "identifier" not in data or "user_password" not in data:
            return (
                jsonify(
                    {
                        "error": "Se requiere un identificador (email o username) y una contraseña"
                    }
                ),
                400,
            )

        identifier = data["identifier"]
        user_password = data["user_password"]

        if "@" in identifier:
            user = User.get_user_by_email(identifier)
        else:
            user = User.get_user_by_username(identifier)

        if not user or not verify_password(user_password, user["user_password"]):
            return jsonify({"error": "Credenciales incorrectas"}), 401

        access_token = create_access_token(
            identity=user["user_id"],
            additional_claims={
                "username": user.get("username"),
                "email": user.get("email"),
            }
        )

        return jsonify(
            {
                "success": True,
                "access_token": access_token,
            }
        )
