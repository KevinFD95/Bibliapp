# tests/conftest.py
import pytest
from app import create_app
from app import apply_migrations
from flask_jwt_extended import create_access_token


@pytest.fixture(scope="function")
def app():
    app = create_app()

    yield app


@pytest.fixture(scope="function")
def client(app):
    with app.test_client() as client:
        yield client


@pytest.fixture(scope="function")
def auth_header(app):
    with app.app_context():
        access_token = create_access_token(
            identity="test_user", additional_claims={"user_role": "user"}
        )
        headers = {"Authorization": f"Bearer {access_token}"}
        return headers
