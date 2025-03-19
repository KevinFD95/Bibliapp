import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import color from "../config/colors.json";

// Vistas
import HomeScreen from "../app/home.jsx";
import LibraryScreen from "../app/library.jsx";
import SearchScreen from "../app/search.jsx";
import ProfileScreen from "../app/profile.jsx";

const Tab = createBottomTabNavigator();

export default function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: color.icons["selected-icons"],
        tabBarInactiveTintColor: color.icons["unselected-icons"],
      }}
    >
      <Tab.Screen
        name="home"
        component={HomeScreen}
        options={{ title: "Inicio" }}
      />
      <Tab.Screen
        name="library"
        component={LibraryScreen}
        options={{ title: "Libreria" }}
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
