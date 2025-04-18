# app/controllers/epub_controller.py
from app.services import EpubConverter, ApiResponse
from app.database import Connection, Queries
from config import Config
import os

class EpubController:
    def convert_epub_to_html(document_id):
        try:
            conn = Connection.get_db_connection()
            cursor = conn.cursor()
            cursor.execute(Queries.DOC_GET_EPUB_PATH, (document_id,))
            result = cursor.fetchone()

            if not result:
                return ApiResponse.error("Documento no encontrado en la base de datos.")
            
            epub_file_path = os.path.join(Config.CLOUD_PATH, result[0])

            if not os.path.exists(epub_file_path):
                return ApiResponse.error(message="Archivo EPUB no encontrado en la ruta.")

            converter = EpubConverter(epub_file_path)
            html_content = converter.convert_to_html()

            return ApiResponse.success(data={"chapters": html_content})
        except Exception as e:
            return ApiResponse.error(message="Error al convertir el EPUB en HTML")
