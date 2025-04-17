# tests/test_users.py
from app.database import Connection


def test_user_register(client):
    user_data = {
        "user_name": "Test",
        "user_lastname": "User",
        "username": "testuser",
        "email": "testuser@example.com",
        "user_password": "Password123!",
    }

    response = client.post("/api/register", json=user_data)
    assert response.status_code == 201
    assert response.get_json()["message"] == "Usuario creado exitosamente."


def test_user_login(client):
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


def test_user_profile_update(client):
    data = {
        "user_name": "User",
        "user_lastname": "Test",
        "email": "test@example.com",
        "username": "testuser",
    }

    token = None

    try:
        conn = Connection.get_db_connection()
        cursor = conn.cursor()
        cursor.execute(
            "SELECT token FROM tokens WHERE username = %s", (data["username"],)
        )
        result = cursor.fetchone()

        if result:
            token = result[0]
        conn.close()

    except Exception as e:
        print("No se han obtenido datos de la base de datos", e)
    
    assert token is not None, "No se encontró un token válido para el usuario."

    auth_header = {
        "Authorization": f"Bearer {token}"
    }

    response = client.patch("/api/users/testuser", json=data, headers=auth_header)

    assert response.status_code == 200
    assert "actualizado" in response.get_json().get("message", "").lower()
