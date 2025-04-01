# app/models/user.py
from app.database import Queries, Connection

class User:
    @staticmethod
    def get_all():
        try: 
            conn = Connection.get_db_connection()
            cursor = conn.cursor(dictionary=True)
            cursor.execute(Queries.USERS_GETALL)
            users = cursor.fetchall()
            conn.close()
            print(f"Realizada petición 'GET' a 'users'")
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
            print(f"Usuario con ID {user['user_id']} encontrado: {user['username']}")
            return user
        except Exception:
            return {"error": "Usuario no encontrado en la base de datos"}
    
    @staticmethod
    def create(users):
        try:
            conn = Connection.get_db_connection()
            cursor = conn.cursor()

            if isinstance(users, list):
                values = [(user["user_name"], user["user_lastname"], user["username"], user["email"], user["user_password"]) for user in users]
                cursor.executemany(Queries.USERS_INSERT, values)
                print(f"Se insertaron {len(users)} usuarios en la tabla 'users'")
            else:
                cursor.execute(Queries.USERS_INSERT, (users["user_name"], users["user_lastname"], users["username"], users["email"], users["user_password"]))
                print(f"Usuario {users['username']} insertado correctamente en la tabla 'users'")

            conn.commit()
            conn.close()

            return {"message": "Usuario creado exitosamente."}
        except Exception:
            return {"error": "El usuario no ha sido creado."}
            
    @staticmethod
    def update(users):
        try:
            conn = Connection.get_db_connection()
            cursor = conn.cursor()

            cursor.execute() # Añadir en app/database/queries.py el metodo para actualizar
            conn.commit()
            conn.close()
            print(f"Se han actualizado los datos de {users["username"]}")
            return {"message": "El usuario ha sido actualizado correctamente."}
        except Exception:
            return {"error": "No se han podido actualizar los datos del usuario."}
    
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
    