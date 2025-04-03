# app/middlewares/admin_required_middleware.py
from functools import wraps
from flask import request, jsonify
from flask_jwt_extended import get_jwt_identity, verify_jwt_in_request
from app.models import User

# comprobar role de user
def admin_required(fn):
    @wraps(fn)
    def wrapper(*args, **kwargs):
        try:
            verify_jwt_in_request()
            identify = get_jwt_identity()

            user = User.get_user_by_id(identify["user_id"])

            if not user or user["user_role"] != "admin":
                return jsonify({"error": "Acceso no autorizado"}), 403
            
            return fn(*args, **kwargs)
        except Exception as e:
            return jsonify({"error": "Error en la autentificación", "message": str(e)}), 401
        
    return wrapper