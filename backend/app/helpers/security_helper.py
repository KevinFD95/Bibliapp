# app/helpers/security_helper.py
import bcrypt
from flask import request


# Encripta contraseña con Hash
def hash_password(password):
    return bcrypt.hashpw(password.encode(), bcrypt.gensalt()).decode()


# Verifica que dos contraseñas (encriptada y no encriptada) son iguales
def verify_password(password, hashed_password):
    return bcrypt.checkpw(password.encode(), hashed_password.encode())


def getToken():
    auth_header = request.headers.get("Authorization", "")
    token = auth_header.replace("Bearer ", "")

    return token