# app/models/registers.py
from app.database import Connection, Queries


class Registers:
    def get_all_registers(username):
        try:
            conn = Connection.get_db_connection()
            cursor = conn.cursor(dictionary=True)
            cursor.execute(Queries.REGISTER_GET_ALL, (username,))
            
            documents = cursor.fetchall()
            
            return documents
        except Exception as e:
            raise e

    def set_doc_cart(document_id, username):
        try:
            conn = Connection.get_db_connection()
            cursor = conn.cursor()
            cursor.execute(
                Queries.REG_INSERT_DOCS,
                (
                    document_id,
                    username,
                ),
            )
            conn.commit()
            conn.close()
            return True
        except Exception as e:
            print(f"Error adding single doc to registers: {e}")
            return None


    def add_cart_items_to_registers(username, cart_items):
        if not cart_items:
            return 0

        try:
            conn = Connection.get_db_connection()
            cursor = conn.cursor()
            values = [(item["document_id"], username) for item in cart_items]
            cursor.executemany(Queries.REG_INSERT_DOCS, values)
            conn.commit()
            rows_affected = cursor.rowcount
            conn.close()
            return rows_affected
        except Exception as e:
            print(f"Error adding cart items to registers: {e}")
            conn.close()
            return None
