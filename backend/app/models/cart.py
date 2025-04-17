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
        
    @staticmethod
    def set_doc_cart(username, document_id):
        print(f"Cart.set_doc_cart llamado para el usuario: {username}, document_id: {document_id}")
        try:
            conn = Connection.get_db_connection()
            cursor = conn.cursor()
            cursor.execute(Queries.CART_ADD_DOC, (username, document_id,))
            conn.commit()
            conn.close()
            print(f"Cart.set_doc_cart - Libro {document_id} añadido al carrito de {username}")
            return True
        except Exception as e:
            print(f"Error setting doc in cart: {e}")
            return None
        
    @staticmethod
    def delete_doc_cart(username, document_id):
        print(f"Cart.delete_doc_cart llamado para el usuario: {username}, document_id: {document_id}")
        try:
            conn = Connection.get_db_connection()
            cursor = conn.cursor()
            cursor.execute(Queries.CART_DELETE_DOC, (document_id, username,))
            conn.commit()
            conn.close()
            print(f"Cart.delete_doc_cart - Libro {document_id} eliminado del carrito de {username}")
            return cursor.rowcount > 0
        except Exception as e:
            print(f"Error deleting doc from cart: {e}")
            return False