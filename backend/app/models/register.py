# app/models/registers.py
from app.database import Connection, Queries


class Registers:
    def get_all_registers(username):
        try:
            conn = Connection.get_db_connection()
            cursor = conn.cursor(dictionary=True)
            cursor.execute(Queries.REGISTER_GET_ALL, (username,))

            documents = cursor.fetchall()
            conn.close()
            return documents
        except Exception as e:
            return None

    def set_doc_reg_from_cart(document_id, username):
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
            conn.close()
            return None

    @staticmethod
    def is_registered(username, document_id):
        try:
            conn = Connection.get_db_connection()
            cursor = conn.cursor()
            cursor.execute(Queries.REG_IS_REGISTERED, (username, document_id))
            result = cursor.fetchone()
            conn.close()
            return result is not None
        except Exception as e:
            return None