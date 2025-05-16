// React
import { useState, useEffect, useContext } from "react";
import { ScrollView, Text, View } from "react-native";

// Context
import { ThemeContext } from "../context/ThemeContext.jsx";
import { useAlert } from "../context/AlertContext.jsx";
import { useCart } from "../context/CartContext.jsx";

// Estilos
import { viewStyles } from "../styles/globalStyles.js";
import { styles } from "../styles/cartStyles.js";

// Components
import { BookLiteCart } from "../components/CardComponent.jsx";
import { CustomButton, IconButton } from "../components/ButtonComponent.jsx";
import CustomLoader from "../components/LoadingComponent.jsx";

// Iconos
import CloseIcon from "../../assets/icons/CloseIcon.jsx";

export default function Cart() {
  const { theme } = useContext(ThemeContext);
  const { showConfirm } = useAlert();
  const { cartItems, removeFromCart, purchaseItems, isLoading } = useCart();

  const themeStyles = viewStyles(theme);

  const [totalPrice, setTotalPrice] = useState(0.0);

  useEffect(() => {
    calculateTotal(cartItems, setTotalPrice);
  }, [cartItems]);

  if (isLoading) {
    return (
      <View style={styles(theme).loadingScreen}>
        <CustomLoader />
      </View>
    );
  }

  if (!Array.isArray(cartItems) || cartItems.length === 0) {
    return (
      <View style={styles(theme).emptyContainer}>
        <Text style={themeStyles.h5}>El carrito está vacío.</Text>
      </View>
    );
  }

  return (
    <View style={{ flex: 1 }}>
      <View style={[themeStyles.mainContainer, { flex: 1 }]}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            paddingBottom: styles(theme).footer.height,
            gap: 20,
          }}
        >
          {cartItems.map((item) => (
            <View key={item.document_id} style={styles(theme).bookItem}>
              <View style={styles(theme).bookRow}>
                <BookLiteCart image={item.url_image} />
                <View style={styles(theme).bookDetails}>
                  <View style={styles(theme).removeIconContainer}>
                    <IconButton
                      onPress={() => handleRemoveBook(item, removeFromCart)}
                      icon={<CloseIcon size={32} />}
                    />
                  </View>
                  <Text style={themeStyles.h4}>{item.title}</Text>
                  <Text style={themeStyles.h5}>Autor: {item.author}</Text>
                  <Text style={themeStyles.p}>
                    Año: {item.publication_year}
                  </Text>
                  <Text style={styles(theme).bookPrice}>{item.price}€</Text>
                </View>
              </View>
            </View>
          ))}
        </ScrollView>
      </View>
      {cartItems && cartItems.length > 0 && (
        <View style={styles(theme).footer}>
          <View style={styles(theme).totalContainer}>
            <View style={styles(theme).totalPriceContainer}>
              <Text style={styles(theme).totalText}>Total: </Text>
              <Text style={styles(theme).priceText}>{totalPrice}€</Text>
            </View>
            <CustomButton
              title="Comprar"
              text={"Realizar compra"}
              onPress={() => {
                showConfirm({
                  title: "Aviso",
                  message: "Desea comprar todos los documentos del carrito?",
                  onConfirm: () => handlePurchase(purchaseItems),
                });
              }}
            />
          </View>
        </View>
      )}
    </View>
  );
}

function calculateTotal(cartItems, setTotalPrice) {
  let total = 0;
  if (cartItems && Array.isArray(cartItems)) {
    cartItems.forEach((book) => {
      const price = parseFloat(book.price);
      if (!isNaN(price)) {
        total += price;
      }
    });
  }
  setTotalPrice(total.toFixed(2));
}

async function handleRemoveBook(document, removeFromCart) {
  await removeFromCart(document);
}

async function handlePurchase(purchaseItems) {
  await purchaseItems();
}
