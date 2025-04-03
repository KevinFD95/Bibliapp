from flask import request, jsonify
from flask_jwt_extended import create_access_token
from app.models import User
import bcrypt


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
            print(f"Usuario accediendo desde mail {identifier}")
        else:
            user = User.get_user_by_username(identifier)
            print(f"Usuario accediendo desde nombre {identifier}")

        if not user or not AuthController.verify_password(
            user_password, user["user_password"]
        ):
            return jsonify({"error": "Credenciales incorrectas"}), 401

        access_token = create_access_token(
            identity={
                "user_id": user["user_id"],
                "username": user.get("username"),
                "email": user.get("email"),
            }
        )

        return jsonify(
            {
                "message": "Login con éxito",
                "access_token": access_token,
                "user": {
                    "user_id": user["user_id"],
                    "username": user.get("username"),
                    "email": user.get("email"),
                },
            }
        )

    def verify_password(user_password, hashed_password):
        return bcrypt.checkpw(
            user_password.encode("utf-8"), hashed_password.encode("utf-8")
        )
