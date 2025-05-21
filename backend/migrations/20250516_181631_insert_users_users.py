# migrations/20250520_181631_insert_users_users.py
import json, os
from app.helpers import format_data_user, format_data_email, hash_password
from app.validations import user_name_validation, user_lastname_validation, username_validation, email_validation, password_validation
from app.database import Queries

# Migración: insert_users_users
# Fecha de creación: 20250516_181631


def upgrade(cursor):
    # Aquí va el código para aplicar la migración
    path = os.path.join(os.path.dirname(__file__),
                        "..", "resources", "users.json")
    with open(path, encoding="utf-8") as f:
        users = json.load(f)

    for i, user in enumerate(users, start=1):
        try:
            if not user_name_validation(user["user_name"]):
                print(f"Usuario {i}: Nombre no válido")
                continue
            if not user_lastname_validation(user["user_lastname"]):
                print(f"Usuario {i}: Apellidos no válidos")
                continue
            if not username_validation(user["username"]):
                print(f"Usuario {i}: Username no válido")
                continue
            if not email_validation(user["email"]):
                print(f"Usuario {i}: Email no válido")
                continue
            if not password_validation(user["user_password"]):
                print(f"Usuario {i}: Contraseña no válida")
                continue

            formatted_user = {
                "user_name": format_data_user(user["user_name"]),
                "user_lastname": format_data_user(user["user_lastname"]),
                "username": user["username"],
                "email": format_data_email(user["email"]),
                "user_password": hash_password(user["user_password"])
            }

            cursor.execute(
                Queries.USERS_INSERT,
                (
                    formatted_user["user_name"],
                    formatted_user["user_lastname"],
                    formatted_user["username"],
                    formatted_user["email"],
                    formatted_user["user_password"]
                )
            )
        except Exception as e:
            print(f"No se ha introducido el usuario {i} '{user["username"]}': {e}")
    pass


def downgrade(cursor):
    # Aquí va el código para revertir la migración
    cursor.execute()
    pass
