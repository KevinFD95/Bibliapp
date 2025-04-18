# app/controllers/auth_controller.py
from flask import request
from flask_jwt_extended import (
    create_access_token,
    verify_jwt_in_request,
    get_jwt_identity,
)
from app.models import User
from app.helpers import verify_password, getToken
from datetime import timedelta, datetime, timezone
from app.database import Queries, Connection
from app.services import ApiResponse


class AuthController:
    def login():
        data = request.get_json()

        if not data or "identifier" not in data or "user_password" not in data:
            return ApiResponse.error(
                message="No se encuentran identificador y contraseña"
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
            return ApiResponse.error(message="Usuario no encontrado", status_code=404)

        if not verify_password(user_password, user["user_password"]):
            conn.close()
            return ApiResponse.error(
                message="Credenciales incorrectas", status_code=404
            )

        expires = timedelta(days=7)
        access_token = create_access_token(
            identity=user["username"],
            additional_claims={
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

        return ApiResponse.success(data={"access_token": access_token})

    def validate_token():
        token = getToken()

        conn = Connection.get_db_connection()
        cursor = conn.cursor()

        try:
            verify_jwt_in_request()
            user = get_jwt_identity()

            cursor.execute(Queries.AUTH_GET_TOKENS, (user, token))
            token_data = cursor.fetchone()

            if token_data:
                token_db, expires_at = token_data

                if datetime.now() < expires_at:
                    conn.close()
                    return ApiResponse.success(message="Acceso autorizado")
                else:
                    cursor.execute(Queries.AUTH_DELETE_TOKEN, (token_db,))
                    conn.commit()
                    conn.close()
                    return ApiResponse.error(message="Token expirado")
            else:
                conn.close()
                return ApiResponse.error(message="Token no encontrado")
        except Exception:
            cursor.execute(Queries.AUTH_DELETE_TOKEN, (token,))
            conn.commit()
            conn.close()
            return ApiResponse.error(message="Token expirado")

    def logout():
        verify_jwt_in_request()

        token = request.headers.get("Authorization", None)

        if not token:
            return ApiResponse.error(message="Token no proporcionado", status_code=401)

        token = token.replace("Bearer ", "")

        try:
            username = get_jwt_identity()

            if not username:
                return ApiResponse.error(
                    message="No se encontró 'identity en el token", status_code=400
                )

            conn = Connection.get_db_connection()
            cursor = conn.cursor()

            cursor.execute(Queries.AUTH_DELETE_TOKEN, (token,))

            conn.commit()
            conn.close()

            return ApiResponse.success(message="Acceso autorizado")
        except Exception as e:
            return ApiResponse.error(message="Error al cerrar sesión", status_code=500)
