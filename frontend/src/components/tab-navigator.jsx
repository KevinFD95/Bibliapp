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
    <>
      <Tab.Navigator
        screenOptions={{
          tabBarActiveTintColor: color.icons["selected-icons"],
          tabBarInactiveTintColor: color.icons["unselected-icons"],
        }}
      >
        <Tab.Screen name="Inicio" component={HomeScreen} />
        <Tab.Screen name="Mi biblioteca" component={LibraryScreen} />
        <Tab.Screen name="Buscar" component={SearchScreen} />
        <Tab.Screen name="Perfil" component={ProfileScreen} />
      </Tab.Navigator>
    </>
  );
}
