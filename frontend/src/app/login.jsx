import { createStackNavigator } from "@react-navigation/stack";

import LoginScreen from "../views/login-view.jsx";
import TabNavigator from "../components/tab-navigator.jsx";
import RegisterScreen from "../views/register-view.jsx";

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
