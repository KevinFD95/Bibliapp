# app/__init__.py
from flask import Flask
from .routes import user_routes, doc_routes

app = Flask(__name__)