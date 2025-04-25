import { createStackNavigator } from "@react-navigation/stack";

import LoginScreen from "../views/LoginView.jsx";
import TabNavigator from "../components/TabNavigator.jsx";
import RegisterScreen from "../views/RegisterView.jsx";

const Stack = createStackNavigator();

export default function LoginStackNavigator() {
  return (
    <Stack.Navigator
      initialRouteName="LoginView"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen
        name="LoginView"
        component={LoginScreen}
        options={{ unmountOnBlur: true }}
      />
      <Stack.Screen name="HomeView" component={TabNavigator} />
      <Stack.Screen name="RegisterView" component={RegisterScreen} />
    </Stack.Navigator>
  );
}
