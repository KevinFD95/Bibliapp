import { createContext, useContext, useState, useEffect } from "react";
import { getCart } from "../api/cart.js";

export const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

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

  return (
    <CartContext.Provider
      value={{ cartItems, isLoading, cartCount, fetchCartItems }}
    >
      {children}
    </CartContext.Provider>
  );
}
