import { createContext, useContext, useState, useEffect } from "react";
import {
  getCart,
  getCartDoc,
  addCart,
  deleteCart,
  finalizePurchaseApi,
} from "../api/cart.js";
import { useAlert } from "./AlertContext.jsx";

export const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { showAlert } = useAlert();

  const cartCount = cartItems.length;

  useEffect(() => {
    fetchCartItems();
  }, []);

  const fetchCartItems = async () => {
    try {
      setIsLoading(true);
      const response = await getCart();
      const { ok, status, data } = response;

      if (ok && status === 200) {
        setCartItems(data.cart || []);
      } else {
        setCartItems([]);
      }
    } catch {
      setCartItems([]);
    } finally {
      setIsLoading(false);
    }
  };

  const addToCart = async (document) => {
    try {
      const check = await getCartDoc(document.document_id);
      const { ok, status } = check;
      if (ok && status === 200) {
        showAlert(
          "Añadir Documento",
          `${document.title} ya esta añadido en el carrito`,
        );
        fetchCartItems();
        return;
      } else if (status === 404) {
        const response = await addCart(document.document_id);
        const { ok, status } = response;

        if (ok && status === 200) {
          showAlert(
            "Añadir Documento",
            `${document.title} se ha añadido al carrito`,
          );
          fetchCartItems();
        } else {
          showAlert("Añadir Documento", "No se ha añadido al carrito");
        }
      } else {
        showAlert("Aviso", "Error al añadir al carrito");
      }
    } catch (error) {
      console.error("Error al añadir al carrito:", error);
    }
  };

  const removeFromCart = async (document) => {
    try {
      setIsLoading(true);
      const response = await deleteCart(document["document_id"]);
      const { ok, status } = response;

      if (ok && status === 200) {
        setCartItems((prevItems) =>
          prevItems.filter(
            (item) => item.document_id !== document["document_id"],
          ),
        );
        showAlert(
          "Eliminar Documento",
          `${document.title} se ha eliminado del carrito`,
        );
      } else {
        const errorMessage =
          response?.error?.message ||
          response?.error ||
          `Error: ${document.title} no se ha podido eliminar del carrito`;
        showAlert("Eliminar Documento", errorMessage);
      }
    } catch (err) {
      showAlert(
        "Error de Comunicación",
        "Hubo un error al comunicarse con el servidor para eliminar el libro.",
      );
      console.error("Error de red al eliminar el libro:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const purchaseItems = async () => {
    try {
      setIsLoading(true);
      const purchaseResponse = await finalizePurchaseApi();
      if (purchaseResponse && purchaseResponse.ok) {
        setCartItems([]);
        showAlert(
          "Compra Finalizada",
          "Se ha/han comprado el/los documento/s del carrito",
        );
      } else {
        const errorData = purchaseResponse?.error;
        showAlert(
          "Error de Compra",
          errorData || "Hubo un error al realizar la compra.",
        );
      }
    } catch (error) {
      showAlert(
        "Error de Comunicación",
        "Hubo un error al comunicarse con el servidor para realizar la compra.",
      );
      console.error("Error de red en la compra:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        isLoading,
        cartCount,
        fetchCartItems,
        addToCart,
        removeFromCart,
        purchaseItems,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
