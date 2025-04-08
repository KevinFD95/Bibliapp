# app/__init__.py
from flask import Flask
from flask_cors import CORS
from flask_jwt_extended import JWTManager
from config import Config
from .routes import document_bp, user_bp, auth_bp
from datetime import timedelta
from commands import apply_migrations, make_migration, migration_status, rollback_migration
import click


def create_app():
    app = Flask(__name__)

    app.config["JWT_SECRET_KEY"] = Config.SECRET_KEY
    app.config["JWT_ACCESS_TOKEN_EXPIRES"] = timedelta(days=7)
    JWTManager(app)

    CORS(app)

    app.register_blueprint(user_bp, url_prefix="/api")
    app.register_blueprint(document_bp, url_prefix="/api")
    app.register_blueprint(auth_bp, url_prefix="/api")

    cli_commands(app)

    return app

def cli_commands(app):
    
    # Comandos CLI para la gestión de migraciones
    @app.cli.command("make:migration")
    @click.argument("name")
    def make_migration_command(name):
        make_migration(name)

    @app.cli.command("migrate")
    def migrate_command():
        """Ejecutar migraciones de la base de datos"""
        apply_migrations()

    @app.cli.command("migrate:status")
    def migration_status_command():
        migration_status()

    @app.cli.command("migrate:rollback")
    def rollback_migration_command():
        rollback_migration()
