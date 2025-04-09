# users_feeder.py
import sys, os

sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), "..")))

from resources import load_users
from app.database import Queries, Connection
from app.helpers import format_data_user, format_data_email, hash_password
from app.validations import (
    user_name_validation,
    user_lastname_validation,
    username_validation,
    email_validation,
    password_validation,
)


class UsersFeeder:
    def insert_users():
        try:
            conn = Connection.get_db_connection()
            cursor = conn.cursor()

            users = load_users()
            i = 0

            for user in users:
                i += 1

                if not (user_name_validation(user["user_name"])):
                    print(f"Usuario {i}: Nombre '{user["user_name"]}' no válido")
                    continue
                if not (user_lastname_validation(user["user_lastname"])):
                    print(f"Usuario {i}: Apellidos '{user["user_lastname"]}' no válidos")
                    continue
                if not (username_validation(user["username"])):
                    print(f"Usuario {i}: Nombre de usuario '{user["username"]}' no válido")
                    continue
                if not (email_validation(user["email"])):
                    print(f"Usuario {i}: Correo electrónico '{user["email"]}' no válido")
                    continue
                if not (password_validation(user["user_password"])):
                    print(f"Usuario {i}: Contraseña no válida")
                    continue

                user["user_name"] = format_data_user(user["user_name"])
                user["user_lastname"] = format_data_user(user["user_lastname"])
                user["email"] = format_data_email(user["email"])
                user["user_password"] = hash_password(user["user_password"])

                try:
                    cursor.execute(
                        Queries.USERS_INSERT,
                        (
                            user["user_name"],
                            user["user_lastname"],
                            user["username"],
                            user["email"],
                            user["user_password"],
                        ),
                    )
                    conn.commit()
                    print(f"Usuario {i} insertado: {user["username"]}")
                except Exception as e:
                    print(f"No se ha introducido el usuario {i} '{user["username"]}': {e}")

            print("Usuarios insertados correctamente")
        except Exception as e:
            print(f"Error al insertar usuarios: {e}")
        finally:
            cursor.close()
            conn.close()

if __name__ == "__main__":
    UsersFeeder.insert_users()
