# app/services/resend_service.py
import resend
from config import Config
from app.services import ApiResponse

resend.api_key = Config.RESEND_API_KEY

def send_password_reset_email(email, code):
    try:
        reset_link = f"Introduce este código en la app para restablecer tu contraseña: {code}"

        resend.Emails.send({
            "from": "onboarding@resend.dev",
            "to": email,
            "subject": "Bibliapp - Restablecer contraseña",
            "html": f"<h1>Restablecer contraseña</h1><p>{reset_link}</p>"
        })

        return ApiResponse.success(message="Correo de restablecimiento de contraseña enviado")
    except Exception:
        return ApiResponse.error(message="Error al enviar el correo de restablecimiento de contraseña", status_code=500)