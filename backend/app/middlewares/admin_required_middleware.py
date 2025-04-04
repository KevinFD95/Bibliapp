# app/middlewares/admin_required_middleware.py
from functools import wraps
from flask import request, jsonify
from flask_jwt_extended import verify_jwt_in_request, get_jwt
from app.models import User


# comprobar role de user
def admin_required(fn):
    @wraps(fn)
    def wrapper(*args, **kwargs):
        try:
            verify_jwt_in_request()
            claims = get_jwt()
            
            if claims.get("user_role") != "admin":
                return jsonify({"error": "Acceso no autorizado"}), 403

            return fn(*args, **kwargs)
        except Exception as e:
            return (
                jsonify({"error": "Error en la autentificación", "message": str(e)}),
                401,
            )

    return wrapper
