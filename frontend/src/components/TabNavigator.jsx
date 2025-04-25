import { useContext } from "react";
import { Image, View, Pressable } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { ThemeContext } from "../context/ThemeContext.jsx";

import navLogo from "../../assets/bibliapp-logo-nav.png";

// Vistas
import HomeScreen from "../app/Home.jsx";
import LibraryScreen from "../app/Library.jsx";
import SearchScreen from "../app/Search.jsx";
import ProfileScreen from "../app/Profile.jsx";
import CartScreen from "../app/Cart.jsx";

// Iconos
import HomeIcon from "../../assets/icons/HomeIcon.jsx";
import LibraryIcon from "../../assets/icons/LibraryIcon.jsx";
import SearchIcon from "../../assets/icons/SearchIcon.jsx";
import ProfileIcon from "../../assets/icons/ProfileIcon.jsx";
import CartIcon from "../../assets/icons/CartIcon.jsx";

const Tab = createBottomTabNavigator();
const iconSize = 40;

export default function TabNavigator() {
  const { theme } = useContext(ThemeContext);

  return (
    <Tab.Navigator
      screenOptions={({ navigation }) => ({
        headerStyle: {
          backgroundColor: theme["nav-background"],
        },
        headerTitleAlign: "center",
        headerLeft: () => (
          <Image
            source={navLogo}
            style={{
              width: 50,
              height: 50,
              marginLeft: 20,
            }}
            resizeMode="contain"
          />
        ),
        headerRight: () => (
          <View style={{ marginRight: 20 }}>
            <Pressable onPress={() => navigation.navigate("cart")}>
              <CartIcon size={38} />
            </Pressable>
          </View>
        ),
        tabBarStyle: {
          backgroundColor: theme["nav-background"],
          paddingTop: 5,
          justifyContent: "space-around",
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
