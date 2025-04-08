# app/validations/register_validations.py
from flask import jsonify
import re


# El nombre del usuario no debe contener nada que no sea
# letras ('^' = negacion, [contenido] = lo contiene el texto)
@staticmethod
def user_name_validation(user_name):
    if re.search(r"[^a-zA-Z\s]", user_name):
        return False
    return True


# El apellido del usuario no debe contener nada que no sea
# letras ('^' = negacion, [contenido] = lo contiene el texto)
@staticmethod
def user_lastname_validation(user_lastname):
    if re.search(r"[^a-zA-Z\s]", user_lastname):
        return False
    return True


# El usuario no debe contener nada que no sea letras o
# numeros ('^' = negacion, [contenido] = lo contiene el texto)
# No se aceptan caracteres especiales
@staticmethod
def username_validation(username):
    if re.search(r"[^a-zA-z0-9]", username):
        return False
    return True


# El email debe tener una estructura de email
# independientemente del contenido
@staticmethod
def email_validation(email):
    # Estructura: [contenido]@[contenido].[contenido]
    email_regex = r"^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$"

    if re.match(email_regex, email):
        return True
    return False


# Validación de contraseña
@staticmethod
def password_validation(password):
    # Longitud mínima y máxima
    if len(password) < 8 or len(password) > 30:
        return False
    # Comprobar si contiene '--' o cualquier otro carácter peligroso
    if re.search(r"--|\'|\"|;|#|--|/\*|\*/", password):
        return False
    # Al menos que contenga un número, mayúscula y un carácter especial
    if not re.search(r"\d", password):
        return False
    # Al menos que contenga una mayúscula
    if not re.search(r"[A-Z]", password):
        return False
    # Al menos que contenga un carácter especial
    if not re.search(r"[\W_]", password):
        return False
    return True


# Verifica que todos los datos de registro sean correctos
@staticmethod
def user_validation(user):
    if not user_name_validation(user.get("user_name", "")):
        return (jsonify({"error": f"Nombre '{user['user_name']}' no válido"})), 400

    if not user_lastname_validation(user.get("user_lastname", "")):
        return (
            jsonify({"error": f"Apellido(s) '{user['user_lastname']}' no válido"}),
            400,
        )

    if not username_validation(user.get("username", "")):
        return (
            jsonify({"error": f"Usuario '{user['username']}' no válido"}),
            400,
        )

    if not email_validation(user.get("email", "")):
        return (
            jsonify({"error": f"Correo electrónico '{user['email']}' no válido"}),
            400,
        )

    if not password_validation(user.get("user_password", "")):
        return (
            jsonify(
                {
                    "error": "La contraseña debe contener una minúscula, mayúscula, número y carácter especial"
                }
            ),
            400,
        )
