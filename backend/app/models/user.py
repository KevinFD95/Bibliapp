from database import get_db_connection

class User:
    @staticmethod
    def get_all():
        conn = get_db_connection()
        cursor = conn.cursor(dictionary=True)
        cursor.execute("SELECT * FROM users")
        users = cursor.fetchall()
        conn.close()
        return users
    
    @staticmethod
    def create(users):
        conn = get_db_connection()
        cursor = conn.cursor()

        query = "INSERT INTO users (name, email, password) VALUES (%s, %s, %s)"

        if isinstance(users, list):
            values = [(user["name"], user["email"], user["password"]) for user in users]
            cursor.executemany(query, values)
        else:
            cursor.execute(query, (users["name"], users["email"], users["password"]))

        conn.commit()
        conn.close()
        return {"message": "Usuario creado exitosamente"}