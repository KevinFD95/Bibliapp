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
            return None
        
    @staticmethod
    def check_doc_cart(username, document_id):
        try:
            conn = Connection.get_db_connection()
            cursor = conn.cursor()
            cursor.execute(Queries.CART_CHECK_DOC, (username, document_id,))
            exists = cursor.fetchone() is not None
            conn.close()
            return exists
        except Exception as e:
            raise
        
    @staticmethod
    def set_doc_cart(username, document_id):
        try:
            conn = Connection.get_db_connection()
            cursor = conn.cursor()
            cursor.execute(Queries.CART_ADD_DOC, (username, document_id,))
            conn.commit()
            conn.close()
            return True
        except Exception as e:
            return None
        
    @staticmethod
    def delete_doc_cart(username, document_id):
        try:
            conn = Connection.get_db_connection()
            cursor = conn.cursor()
            cursor.execute(Queries.CART_DELETE_DOC, (document_id, username,))
            conn.commit()
            conn.close()
            return cursor.rowcount > 0
        except Exception as e:
            return False
        
    @staticmethod
    def buy_doc_cart(username):
        try:
            conn = Connection.get_db_connection()
            cursor = conn.cursor()
            cursor.execute(Queries.CART_BUY_DOC, (username,))
            conn.commit()
            conn.close()
            return cursor.rowcount > 0
        except Exception as e:
            return False