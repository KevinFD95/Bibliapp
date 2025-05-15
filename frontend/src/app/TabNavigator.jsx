// React
import { useContext } from "react";
import { Image, View, Pressable, Text, StyleSheet } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

// Contextos
import { ThemeContext } from "../context/ThemeContext.jsx";
import { useCart } from "../context/CartContext.jsx";

// Vistas
import HomeScreen from "./Home.jsx";
import LibraryScreen from "./Library.jsx";
import SearchScreen from "./Search.jsx";
import ProfileScreen from "./Profile.jsx";
import CartScreen from "../views/CartView.jsx";

// Iconos
import HomeIcon from "../../assets/icons/HomeIcon.jsx";
import LibraryIcon from "../../assets/icons/LibraryIcon.jsx";
import SearchIcon from "../../assets/icons/SearchIcon.jsx";
import ProfileIcon from "../../assets/icons/ProfileIcon.jsx";
import CartIcon from "../../assets/icons/CartIcon.jsx";

// Logos
import navLogoLight from "../../assets/bibliapp-logo-nav.png";
import navLogoDark from "../../assets/bibliapp-logo-nav-dark.png";

const Tab = createBottomTabNavigator();
const iconSize = 40;

export default function TabNavigator() {
  const { theme, mode } = useContext(ThemeContext);
  const { cartItems } = useCart();

  return (
    <Tab.Navigator
      screenOptions={({ navigation }) => ({
        headerStyle: {
          backgroundColor: theme["nav-background"],
        },
        headerTitleStyle: { fontSize: 21, paddingHorizontal: 10 },
        headerTitleAlign: "center",
        headerTintColor: theme["dark-text"],
        headerLeft: () => (
          <Image
            source={mode === "light" ? navLogoLight : navLogoDark}
            style={{
              width: 50,
              height: 50,
              marginLeft: 20,
            }}
            resizeMode="contain"
          />
        ),
        headerRight: () =>
          cartItems.length > 0 ? (
            <View style={{ marginRight: 20 }}>
              <Pressable onPress={() => navigation.navigate("cart")}>
                <View>
                  <CartIcon size={38} />
                  <Text style={styles(theme).cartNumber}>
                    {cartItems.length}
                  </Text>
                </View>
              </Pressable>
            </View>
          ) : null,
        tabBarStyle: {
          backgroundColor: theme["nav-background"],
          paddingTop: 5,
          justifyContent: "space-around",
          borderTopWidth: 0,
        },
        tabBarLabel: () => null,
      })}
    >
      <Tab.Screen
        name="home"
        component={HomeScreen}
        options={{
          title: "Inicio",
          tabBarIcon: ({ focused }) => (
            <HomeIcon size={iconSize} filled={focused} />
          ),
        }}
      />
      <Tab.Screen
        name="library"
        component={LibraryScreen}
        options={{
          title: "Mi biblioteca",
          tabBarIcon: ({ focused }) => (
            <LibraryIcon size={iconSize} filled={focused} />
          ),
        }}
      />
      <Tab.Screen
        name="search"
        component={SearchScreen}
        options={{
          title: "Buscar",
          tabBarIcon: ({ focused }) => (
            <SearchIcon size={iconSize} filled={focused} />
          ),
        }}
      />
      <Tab.Screen
        name="profile"
        component={ProfileScreen}
        options={{
          title: "Perfil",
          tabBarIcon: ({ focused }) => (
            <ProfileIcon size={iconSize} filled={focused} />
          ),
        }}
      />
      <Tab.Screen
        name="cart"
        component={CartScreen}
        options={{
          title: "Mi Carrito",
          tabBarButton: () => null,
          tabBarItemStyle: {
            display: "none",
            height: 0,
            width: 0,
          },
        }}
      />
    </Tab.Navigator>
  );
}

const styles = (theme) => {
  return StyleSheet.create({
    cartNumber: {
      color: "red",
      backgroundColor: theme["dark-text"],
      borderWidth: 1,
      borderColor: theme["app-background"],
      borderRadius: 50,
      width: 20,
      height: 20,
      fontWeight: "bold",
      textAlign: "center",
      alignSelf: "center",
      zIndex: 2,
      position: "absolute",
      bottom: 0,
      right: 0,
    },
  });
};
