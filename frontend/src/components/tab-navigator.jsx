import { Image, View, Pressable } from "react-native";
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
import CartIcon from "../../assets/icons/cart-icon.jsx";

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
        headerRight: () => (
          <View style={{ marginRight: 20 }}>
            <Pressable onPress={() => alert("Carrito")}>
              <CartIcon size={38} />
            </Pressable>
          </View>
        ),
        tabBarStyle: {
          backgroundColor: color.nav["nav-background"],
          paddingTop: 5,
        },
        tabBarLabel: () => null,
      }}
    >
      <Tab.Screen
        name="home"
        component={HomeScreen}
        options={{
          title: "Inicio",
          tabBarIcon: ({ focused }) => (
            <HomeIcon
              size={iconSize}
              filled={focused}
              selectedColor={color.icons["selected-icons"]}
              unselectedColor={color.icons["unselected-icons"]}
            />
          ),
        }}
      />
      <Tab.Screen
        name="library"
        component={LibraryScreen}
        options={{
          title: "Mi biblioteca",
          tabBarIcon: ({ focused }) => (
            <LibraryIcon
              size={iconSize}
              filled={focused}
              selectedColor={color.icons["selected-icons"]}
              unselectedColor={color.icons["unselected-icons"]}
            />
          ),
        }}
      />
      <Tab.Screen
        name="search"
        component={SearchScreen}
        options={{
          title: "Buscar",
          tabBarIcon: ({ focused }) => (
            <SearchIcon
              size={iconSize}
              filled={focused}
              selectedColor={color.icons["selected-icons"]}
              unselectedColor={color.icons["unselected-icons"]}
            />
          ),
        }}
      />
      <Tab.Screen
        name="profile"
        component={ProfileScreen}
        options={{
          title: "Perfil",
          tabBarIcon: ({ focused }) => (
            <ProfileIcon
              size={iconSize}
              filled={focused}
              selectedColor={color.icons["selected-icons"]}
              unselectedColor={color.icons["unselected-icons"]}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
