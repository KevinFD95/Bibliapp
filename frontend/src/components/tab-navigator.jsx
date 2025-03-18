import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import color from "../config/colors.json";

const Tab = createBottomTabNavigator();

export function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: color.icons["selected-icons"],
        tabBarInactiveTintColor: color.icons["unselected-icons"],
      }}
    >
      <Tab.Screen name="Home" />
      <Tab.Screen name="Library" />
      <Tab.Screen name="Search" />
      <Tab.Screen name="Profile" />
    </Tab.Navigator>
  );
}
