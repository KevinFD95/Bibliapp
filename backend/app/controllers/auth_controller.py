# app/controllers/auth_controller.py
from flask import request, jsonify
from flask_jwt_extended import (
    create_access_token,
    verify_jwt_in_request,
    get_jwt_identity,
)
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

        conn = Connection.get_db_connection()
        cursor = conn.cursor()

        if "@" in identifier:
            user = User.get_user_by_email(identifier)
        else:
            user = User.get_user_by_username(identifier)

        if not user:
            return jsonify({"error": "Usuario no encontrado"}), 404

        if not verify_password(user_password, user["user_password"]):
            conn.close()
            return jsonify({"error": "Credenciales incorrectas"}), 200

        expires = timedelta(minutes=1)
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

    def validate_token():
        auth_header = request.headers.get("Authorization", "")
        token = auth_header.replace("Bearer ", "").strip()
        
        conn = Connection.get_db_connection()
        cursor = conn.cursor()
        
        try:
            verify_jwt_in_request()
            user = get_jwt_identity()

            cursor.execute(Queries.AUTH_GET_TOKENS, (user, token))
            token_data = cursor.fetchone()

            print(f"Datos del token en la BD: {token_data}")

            if token_data:
                token_db, expires_at = token_data

                if datetime.now() < expires_at:
                    conn.close()
                    return jsonify({"success": True, "message": "Acceso autorizado"})
                else:
                    cursor.execute(Queries.AUTH_DELETE_TOKEN, (user, token_db))
                    conn.commit()
                    conn.close()
                    return jsonify({"success": False, "message": "Token expirado"})
            else:
                conn.close()
                return jsonify({"success": False, "message": "Token no encontrado"})
        except Exception:
            cursor.execute(Queries.AUTH_DELETE_EXPIRED_TOKEN, (token,))
            conn.commit()
            conn.close()
            return jsonify({"success": False, "message": "Token expirado"})

    def logout():
        verify_jwt_in_request()

        token = request.headers.get("Authorization", None)

        if not token:
            return jsonify({"error": "Token no proporcionado"}), 401

        token = token.replace("Bearer ", "")

        try:
            username = get_jwt_identity()

            if not username:
                return jsonify({"error": "No se encontró 'identity en el token"}), 400

            conn = Connection.get_db_connection()
            cursor = conn.cursor()

            cursor.execute(Queries.AUTH_DELETE_TOKEN, (username, token))

            conn.commit()
            conn.close()

            return jsonify({"message": "Sesión cerrada con éxito"}), 200
        except Exception as e:
            return jsonify({"error": "Error al cerrar sesión", "message": str(e)}), 500
