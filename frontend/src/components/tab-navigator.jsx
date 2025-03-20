import { Image } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import color from "../config/colors.json";
import navLogo from "../../assets/bibliapp-logo-nav.png";

// Vistas
import HomeScreen from "../app/home.jsx";
import LibraryScreen from "../app/library.jsx";
import SearchScreen from "../app/search.jsx";
import ProfileScreen from "../app/profile.jsx";

import HomeIcon from "../../assets/icons/home.jsx";

const Tab = createBottomTabNavigator();

export default function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: color.nav["nav-background"],
        },
        headerTitleAlign: "center",
        headerLeft: () => (
          <Image
            source={navLogo}
            style={{ width: 50, height: 50, marginLeft: 20, marginBottom: 0 }}
            resizeMode="contain"
          />
        ),
        tabBarStyle: {
          backgroundColor: color.nav["nav-background"],
        },
        tabBarActiveTintColor: color.icons["selected-icons"],
        tabBarInactiveTintColor: color.icons["unselected-icons"],
      }}
    >
      <Tab.Screen
        name="home"
        component={HomeScreen}
        options={{
          title: "Inicio",
          tabBarIcon: ({ color, size }) => (
            <HomeIcon color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="library"
        component={LibraryScreen}
        options={{ title: "Mi biblioteca" }}
      />
      <Tab.Screen
        name="search"
        component={SearchScreen}
        options={{ title: "Buscar" }}
      />
      <Tab.Screen
        name="profile"
        component={ProfileScreen}
        options={{ title: "Perfil" }}
      />
    </Tab.Navigator>
  );
}
