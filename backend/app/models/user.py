# app/models/user.py
from app.database import Queries, Connection
from app.services import ApiResponse


class User:
    @staticmethod
    def get_all():
        try:
            conn = Connection.get_db_connection()
            cursor = conn.cursor(dictionary=True)
            cursor.execute(Queries.USERS_GETALL)
            users = cursor.fetchall()
            conn.close()
            return users
        except Exception:
            return {"error": "No se han podido recuperar los datos."}

    @staticmethod
    def get_user_by_id(user_id):
        try:
            conn = Connection.get_db_connection()
            cursor = conn.cursor(dictionary=True)
            cursor.execute(Queries.USERS_GET_BY_ID, (user_id,))
            user = cursor.fetchone()
            conn.close()
            return user
        except Exception:
            return {"error": "Usuario no encontrado en la base de datos"}

    @staticmethod
    def get_user_by_username(username):
        try:
            conn = Connection.get_db_connection()
            cursor = conn.cursor(dictionary=True)
            cursor.execute(Queries.USERS_GET_BY_USERNAME, (username,))
            user = cursor.fetchone()
            conn.close()
            return user
        except Exception:
            return {"error": "Usuario no encontrado en la base de datos"}

    @staticmethod
    def get_user_by_email(email):
        try:
            conn = Connection.get_db_connection()
            cursor = conn.cursor(dictionary=True)
            cursor.execute(Queries.USERS_GET_BY_EMAIL, (email,))
            user = cursor.fetchone()
            conn.close()
            return user
        except Exception:
            return {"error": "Usuario no encontrado en la base de datos"}

    @staticmethod
    def get_user_data_by_username(username):
        try:
            conn = Connection.get_db_connection()
            cursor = conn.cursor(dictionary=True)
            cursor.execute(Queries.USERS_GET_DATA_BY_USERNAME, (username,))
            user = cursor.fetchone()
            return user
        except Exception:
            return {"error": "Usuario no encontrado en la base de datos"}

    @staticmethod
    def create(user):
        try:
            conn = Connection.get_db_connection()
            cursor = conn.cursor()

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
            conn.close()

            return True;
        except Exception:
            return False;

    @staticmethod
    def update(user):
        try:
            conn = Connection.get_db_connection()
            cursor = conn.cursor()

            cursor.execute(
                Queries.USERS_UPDATE_BY_USERNAME,
                (
                    user["user_name"],
                    user["user_lastname"],
                    user["email"],
                    user["username"],
                ),
            )
            conn.commit()
            conn.close()
            return {"message": "Los datos han sido actualizados correctamente."}
        except Exception:
            return {"message": "No se han podido actualizar los datos."}

    def changepassword(username, password):
        try:
            conn = Connection.get_db_connection()
            cursor = conn.cursor()

            cursor.execute(Queries.USERS_CHANGEPASSWORD, (password, username))
            conn.commit()
            conn.close()
            return {"message": "Contraseña cambiada exitósamente."}
        except Exception:
            return {"error": "No se ha podido cambiar la contraseña."}

    @staticmethod
    def delete(username):
        try:
            conn = Connection.get_db_connection()
            cursor = conn.cursor()

            cursor.execute(Queries.USERS_DELETE, (username,))
            conn.commit()
            conn.close()

            return {"message": "Usuario eliminado exitosamente"}
        except Exception:
            return {"error": "El usuario no ha sido eliminado."}
