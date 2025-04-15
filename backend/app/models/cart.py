# app/models/cart.py
from app.database import Connection, Queries

class Cart:
        
    @staticmethod
    def get_cart(username):
        try:
            conn = Connection.get_db_connection()
            cursor = conn.cursor(dictionary=True)
            cursor.execute(Queries.CART_GETALL, (username,))
            cart = cursor.fetchall()
            conn.close()
            return cart
        except Exception as e:
            print(f"Error getting cart: {e}")
            return None