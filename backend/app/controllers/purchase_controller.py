# app/controllers/purchase_controller.py
from flask_jwt_extended import get_jwt_identity
from app.models import Cart, Registers
from app.services import ApiResponse

class PurchaseController:
    def finalize_purchase():
        try:
            username = get_jwt_identity()
            if not username:
                return ApiResponse.error(message="Usuario no autenticado", status_code=401)
            cart_items = Cart.get_cart(username)

            if not cart_items:
                return ApiResponse.error(message="El carrito está vacío. No hay documentos para comprar.", status_code=400)
            
            registered_count = Registers.add_cart_items_to_registers(username, cart_items)
            
            if registered_count is None:
                 return ApiResponse.error(message="Error al registrar los documentos comprados.", status_code=500)
            
            cart_cleared = Cart.buy_doc_cart(username)

            if not cart_cleared:
                 print(f"Advertencia: Documentos registrados para {username}, pero hubo un problema al vaciar el carrito.")

            return ApiResponse.success(message="Compra finalizada: Documentos registrados y carrito vaciado.")

        except Exception as e:
            print(f"Error en PurchaseController.finalize_purchase: {e}")
            return ApiResponse.error(message=f"Error interno al procesar la compra: {str(e)}", status_code=500)