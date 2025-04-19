# tests/test_users.py
import pytest


@pytest.mark.order(1)
def test_user_register(client):
    print("TEST: REGISTRANDO USUARIO")
    user_data = {
        "user_name": "User",
        "user_lastname": "Test",
        "username": "testuser",
        "email": "testuser@example.com",
        "user_password": "Password123!",
    }

    response = client.post("/api/register", json=user_data)
    assert response.status_code == 201
    assert response.get_json()["message"] == "Usuario creado exitosamente."

@pytest.mark.order(1)
def test_user_no_register(client):
    print("TEST: NO REGISTRANDO USUARIO")
    user_data = {
        "user_name": "User",
        "user_lastname": "Test",
        "username": "testuser",
        "email": "testuser@example.com",
        "user_password": "Password123!",
    }

    response = client.post("/api/register", json=user_data)
    response_json = response.get_json()

    assert response.status_code == 400
    assert response_json["message"] == "El usuario no ha sido creado."


@pytest.mark.order(2)
def test_user_login(client):
    print("TEST: LOGUEANDO USUARIO")
    user_data = {
        "identifier": "testuser",
        "user_password": "Password123!",
    }

    response = client.post("/api/login", json=user_data)
    assert response.status_code == 200

    response_json = response.get_json()
    assert response_json.get("success") is True
    assert response_json.get("message") == "Success"

    access_token = response_json.get("access_token")
    assert access_token is not None

@pytest.mark.order(2)
def test_user_bad_user(client):
    print("TEST: USUARIO ERRÓNEO")
    user_data = {
        "identifier": "testuserMal",
        "user_password": "Password123!",
    }

    response = client.post("/api/login", json=user_data)
    assert response.status_code == 404

    response_json = response.get_json()
    assert response_json.get("success") is False
    assert response_json.get("message") == "Usuario no encontrado"

    access_token = response_json.get("access_token")
    assert access_token is None

@pytest.mark.order(2)
def test_user_bad_pass(client):
    print("TEST: PASSWORD ERRÓNEO")
    user_data = {
        "identifier": "testuser",
        "user_password": "PasswordMal",
    }

    response = client.post("/api/login", json=user_data)
    assert response.status_code == 404

    response_json = response.get_json()
    assert response_json.get("success") is False
    assert response_json.get("message") == "Credenciales incorrectas"

    access_token = response_json.get("access_token")
    assert access_token is None

def get_token_for_user(client, identifier, password):
    response = client.post("/api/login", json={
        "identifier": identifier,
        "user_password": password,
    })
    return response.get_json()["access_token"]


@pytest.mark.order(3)
def test_user_profile_update(client):
    print("TEST: ACTUALIZANDO USUARIO")
    token = get_token_for_user(client, "testuser", "Password123!")
    auth_header = {"Authorization": f"Bearer {token}"}
    data = {
        "user_name": "User",
        "user_lastname": "Test",
        "email": "test@example.com",
        "username": "testuser",
    }

    response = client.patch("/api/users/testuser", json=data, headers=auth_header)

    assert response.status_code == 200
    assert "actualizado" in response.get_json().get("message", "").lower()

@pytest.mark.order(3)
def test_user_profile_no_update_user_name(client):
    print("TEST: NO ACTUALIZA - USER_NAME MAL -")
    token = get_token_for_user(client, "testuser", "Password123!")
    auth_header = {"Authorization": f"Bearer {token}"}
    data = {
        "user_name": "1234",
        "user_lastname": "Test",
        "email": "testuser@example.com",
        "username": "testuser",
    }

    response = client.patch("/api/users/testuser", json=data, headers=auth_header)

    assert response.status_code == 400
    assert "Nombre no válido" in response.get_json().get("message", "")

@pytest.mark.order(3)
def test_user_profile_no_update_user_lastname(client):
    print("TEST: NO ACTUALIZA - USER_LASTNAME MAL -")
    token = get_token_for_user(client, "testuser", "Password123!")
    auth_header = {"Authorization": f"Bearer {token}"}
    data = {
        "user_name": "User",
        "user_lastname": "1234",
        "email": "testuser@example.com",
        "username": "testuser",
    }

    response = client.patch("/api/users/testuser", json=data, headers=auth_header)

    assert response.status_code == 400
    assert "Apellidos no válidos" in response.get_json().get("message", "")

@pytest.mark.order(3)
def test_user_profile_no_update_email(client):
    print("TEST: NO ACTUALIZA - EMAIL MAL -")
    token = get_token_for_user(client, "testuser", "Password123!")
    auth_header = {"Authorization": f"Bearer {token}"}
    data = {
        "user_name": "User",
        "user_lastname": "Test",
        "email": "testexample.com",
        "username": "testuser",
    }

    response = client.patch("/api/users/testuser", json=data, headers=auth_header)

    assert response.status_code == 400
    assert "Correo electrónico no válido" in response.get_json().get("message", "")
