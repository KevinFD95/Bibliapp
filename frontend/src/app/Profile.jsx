// React
import { createStackNavigator } from "@react-navigation/stack";

// Vistas
import Profile from "../views/ProfileView.jsx";
import ProfileEdit from "../views/ProfileEditView.jsx";
import Config from "../views/SettingsView.jsx";

const Stack = createStackNavigator();

export default function ProfileStackNavigator() {
  return (
    <Stack.Navigator
      initialRouteName="Profile"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="Profile" component={Profile} />
      <Stack.Screen name="EditProfile" component={ProfileEdit} />
      <Stack.Screen name="Config" component={Config} />
    </Stack.Navigator>
  );
}
