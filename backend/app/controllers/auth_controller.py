# app/controllers/auth_controller.py
from flask import request, jsonify
from flask_jwt_extended import create_access_token
from app.models import User
from app.helpers import verify_password
from datetime import timedelta, datetime, timezone
from app.database import Queries, Connection


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

        expires = timedelta(days=7)
        access_token = create_access_token(
            identity=user["username"],
            additional_claims={
                "email": user.get("email"),
                "user_role": user.get("user_role"),
            },
            expires_delta=expires,
        )

        utc_plus_2 = timezone(timedelta(hours=2))
        expires_at = datetime.now(utc_plus_2) + expires
        device = request.headers.get("User-Agent") or "unknown"

        conn = Connection.get_db_connection()
        cursor = conn.cursor()
        cursor.execute(
            Queries.AUTH_INSERT_TOKEN,
            (user["username"], access_token, device, expires_at),
        )
        conn.commit()
        conn.close()

        return jsonify(
            {
                "success": True,
                "access_token": access_token,
            }
        )
