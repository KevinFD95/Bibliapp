# config.py
import os
from dotenv import load_dotenv

load_dotenv(dotenv_path="./.env")


class Config:
    FLASK_HOST = os.getenv("FLASK_RUN_HOST")
    FLASK_PORT = int(os.getenv("FLASK_RUN_PORT"))
    FLASK_DEBUG = os.getenv("FLASK_DEBUG")

    MYSQL_HOST = os.getenv("DB_HOST")
    MYSQL_USER = os.getenv("DB_USER")
    MYSQL_PASSWORD = os.getenv("DB_PASSWORD")
    MYSQL_DB = os.getenv("DB_NAME")
    SECRET_KEY = os.getenv("SECRET_KEY")
