# app/database/connection.py
import mysql.connector
from config import Config

class Connection:

    def get_db_connection():
        return mysql.connector.connect(
            host=Config.MYSQL_HOST,
            user=Config.MYSQL_USER,
            password=Config.MYSQL_PASSWORD,
            database=Config.MYSQL_DB
        )