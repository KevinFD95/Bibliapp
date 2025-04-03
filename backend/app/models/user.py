# app/models/user.py
from app.database.connection import get_db_connection
from app.database.queries import QUERY_USERS_GETALL, QUERY_USERS_INSERT, QUERY_USERS_DELETE

class User:
    @staticmethod
    def get_all():
        conn = get_db_connection()
        cursor = conn.cursor(dictionary=True)
        cursor.execute("SELECT * FROM users")
        users = cursor.fetchall()
        conn.close()
        print("Realizada conexión")
        return users
    
    @staticmethod
    def create(users):
        conn = get_db_connection()
        cursor = conn.cursor()

        if isinstance(users, list):
            values = [(user["user_name"], user["user_lastname"], user["username"], user["email"], user["password"]) for user in users]
            cursor.executemany(QUERY_USERS_INSERT, values)
            print(f"Se insertaron {len(users)} usuarios en la tabla 'users'")
        else:
            cursor.execute(QUERY_USERS_INSERT, (users["user_name"], users["user_lastname"], users["username"], users["email"], users ["password"]))
            print(f"Usuario {users("username")} insertado correctamente en la tabla 'users'")
        conn.commit()
        conn.close()
        return {"message": "Usuario creado exitosamente"}
    
    @staticmethod
    def delete(users):
        conn = get_db_connection()
        cursor = conn.cursor()

        cursor.execute(QUERY_USERS_DELETE, {users("username"),})
        conn.commit()
        conn.close()
        print(f"Se ha eliminado el usuario: {users('username')}")
