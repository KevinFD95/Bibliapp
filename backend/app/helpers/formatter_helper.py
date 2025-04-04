# app/helpers/formatter_helper.py


# Formato del nombre y apellidos del usuario (eliminación de espacios en blanco
# y mayúsculas)
def format_data_user(data):
    data = data.strip()
    data = data.lower()
    data = data.capitalize()
    return data


# Formato del email (eliminación de espacios en blanco y convertir a minúsculas)
def format_data_email(data):
    data = data.strip()
    data = data.lower()
    return data
