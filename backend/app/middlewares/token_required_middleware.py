# app/middlewares/token_required_middleware.py
from functools import wraps
from flask import request, jsonify
from flask_jwt_extended import verify_jwt_in_request, get_jwt_identity
from datetime import datetime, timezone
from app.database import Queries, Connection


# FALTA ELIMINAR TOKEN DE LA BASE DE DATOS
def token_in_db_required(fn):
    @wraps(fn)
    def wrapper(*args, **kwargs):
        try:
            verify_jwt_in_request()
            token = request.headers.get("Authorization", "").replace("Bearer ", "")
            if not token:
                return jsonify({"error": "Token no proporcionado"}), 401

            identity = get_jwt_identity()
            if not identity:
                return jsonify({"error": "Token no válido"}), 401

            conn = Connection.get_db_connection()
            cursor = conn.cursor(dictionary=True)

            cursor.execute(Queries.AUTH_GET_TOKENS, (identity, token))
            record = cursor.fetchone()

            if not record:
                return jsonify({"error": "Token no encontrado o revocado"}), 401

            expires_at = record.get("expires_at")
            if expires_at and expires_at.replace(tzinfo=timezone.utc) < datetime.now(
                timezone.utc
            ):
                return jsonify({"error": "Token expirado"}), 401

            return fn(*args, **kwargs)

        except Exception as e:
            return (
                jsonify({"error": "Error en la autentificacion", "message": str(e)}),
                401,
            )

    return wrapper
