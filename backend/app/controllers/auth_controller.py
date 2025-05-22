# app/controllers/auth_controller.py
from flask import request
from flask_jwt_extended import (
    create_access_token,
    verify_jwt_in_request,
    get_jwt_identity,
)
from app.models import User
from app.helpers import verify_password, getToken, hash_password
from app.validations import password_validation
from datetime import timedelta, datetime, timezone
from app.database import Queries, Connection
from app.services import ApiResponse
from itsdangerous import TimedSerializer
from app.services import send_password_reset_email
from config import Config
import random

serializer = TimedSerializer(Config.SECRET_KEY)

class AuthController:
    def login():
        data = request.get_json()

        if not data or "identifier" not in data or "user_password" not in data:
            return ApiResponse.error(
                message="No se encuentran usuario o email y contraseña."
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
                message="Usuario y/o contraseña incorrectos", status_code=404
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
        cursor.close()
        conn.close()

        return ApiResponse.success(data={"access_token": access_token})

    def validate_token():
        token = getToken()

        conn = Connection.get_db_connection()
        cursor = conn.cursor()

        try:
            user = get_jwt_identity()

            cursor.execute(Queries.AUTH_GET_TOKENS, (user, token))
            token_data = cursor.fetchone()

            if token_data:
                token_db, expires_at = token_data

                if datetime.now() < expires_at:
                    conn.close()
                    return ApiResponse.success(message="Inicio de sesión correcto")
                else:
                    cursor.execute(Queries.AUTH_DELETE_TOKEN, (token_db,))
                    conn.commit()
                    conn.close()
                    return ApiResponse.error(message="Sesión caducada. Vuelva a iniciar sesión.")
            else:
                return ApiResponse.error(message="Sesión caducada. Vuelva a iniciar sesión.")
        except Exception:
            return ApiResponse.error(message="Sesión caducada. Vuelva a iniciar sesión.")

    def logout():
        verify_jwt_in_request()

        token = request.headers.get("Authorization", None)

        if not token:
            return ApiResponse.error(message="Sesión no autorizada.", status_code=401)

        token = token.replace("Bearer ", "")

        try:
            username = get_jwt_identity()

            if not username:
                return ApiResponse.error(
                    message="Sesión no autorizada.", status_code=400
                )

            conn = Connection.get_db_connection()
            cursor = conn.cursor()

            cursor.execute(Queries.AUTH_DELETE_TOKEN, (token,))

            conn.commit()
            conn.close()

            return ApiResponse.success(message="Se cerró sesión con éxito.1")
        except Exception as e:
            return ApiResponse.error(message="Error al cerrar sesión", status_code=500)
        
    def forgot_password_request():
        data = request.get_json()
        email = data.get("email")

        if not email:
            return ApiResponse.error(message="Email no proporcionado")
        
        user = User.get_user_by_email(email)

        if not user:
            return ApiResponse.error(message="Usuario no encontrado", status_code=404)
        
        code = random.randint(100000, 999999)
        
        token = serializer.dumps({"email": email, "code": code}, salt="password-reset-salt")

        send_password_reset_email(email, code)

        return ApiResponse.success(message="Correo eléctronico de restablecimiento de contraseña enviado.", data={"token": token})
    
    def forgot_password_confirm():
        data = request.get_json()
        email = data.get("email")
        token = data.get("token")
        code = data.get("code")
        new_password = data.get("new_password")

        if not all([email, token, code, new_password]):
            return ApiResponse.error(message="Datos incompletos")
        
        if not password_validation(new_password):
            return ApiResponse.error(message="La contraseña debe contener una minúscula, mayúscula, número y carácter especial.")
        
        try:
            token_data = serializer.loads(token, salt="password-reset-salt", max_age=300)
            email_from_token = token_data.get("email")
            code_from_token = str(token_data.get("code"))
        except Exception:
            return ApiResponse.error(message="Token inválido o expirado")
        
        if email != email_from_token:
            return ApiResponse.error(message="Email no coincide con el token.")
        if str(code) != code_from_token:
            return ApiResponse.error(message="Código incorrecto.")
        
        new_password_hashed = hash_password(new_password)
        try:
            User.changepassword(email, new_password_hashed)
            return ApiResponse.success(message="Contraseña restablecida exitósamente.")
        except Exception:
            return ApiResponse.error(message="Error al restablecer la contraseña")
