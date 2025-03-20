import { Image } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import color from "../config/colors.json";
import navLogo from "../../assets/bibliapp-logo-nav.png";

// Vistas
import HomeScreen from "../app/home.jsx";
import LibraryScreen from "../app/library.jsx";
import SearchScreen from "../app/search.jsx";
import ProfileScreen from "../app/profile.jsx";

// Iconos
import HomeIcon from "../../assets/icons/home-icon.jsx";
import LibraryIcon from "../../assets/icons/library-icon.jsx";
import SearchIcon from "../../assets/icons/search-icon.jsx";
import ProfileIcon from "../../assets/icons/profile-icon.jsx";

const Tab = createBottomTabNavigator();
const iconSize = 40;

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
            style={{
              width: 50,
              height: 50,
              marginLeft: 20,
            }}
            resizeMode="contain"
          />
        ),
        tabBarStyle: {
          backgroundColor: color.nav["nav-background"],
          paddingTop: 10,
        },
        tabBarActiveTintColor: color.icons["selected-icons"],
        tabBarInactiveTintColor: color.icons["unselected-icons"],
        tabBarLabel: () => null,
      }}
    >
      <Tab.Screen
        name="home"
        component={HomeScreen}
        options={{
          title: "Inicio",
          tabBarIcon: ({ color }) => <HomeIcon color={color} size={iconSize} />,
        }}
      />
      <Tab.Screen
        name="library"
        component={LibraryScreen}
        options={{
          title: "Mi biblioteca",
          tabBarIcon: ({ color }) => (
            <LibraryIcon color={color} size={iconSize} />
          ),
        }}
      />
      <Tab.Screen
        name="search"
        component={SearchScreen}
        options={{
          title: "Buscar",
          tabBarIcon: ({ color }) => (
            <SearchIcon color={color} size={iconSize} />
          ),
        }}
      />
      <Tab.Screen
        name="profile"
        component={ProfileScreen}
        options={{
          title: "Perfil",
          tabBarIcon: ({ color }) => (
            <ProfileIcon color={color} size={iconSize} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
