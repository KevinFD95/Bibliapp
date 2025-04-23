import { createStackNavigator } from "@react-navigation/stack";

import HomeScreen from "../views/home-view.jsx";
import BookDetails from "./book-details.jsx";
import BookView from "./book-view.jsx";

const Stack = createStackNavigator();

export default function HomeStackNavigator() {
  return (
    <Stack.Navigator
      initialRouteName="HomeView"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen
        name="HomeView"
        component={HomeScreen}
        options={{ unmountOnBlur: true }}
      />
      <Stack.Screen
        name="BookDetails"
        component={BookDetails}
        options={{ unmountOnBlur: true }}
      />
      <Stack.Screen
        name="BookView"
        component={BookView}
        options={{ unmountOnBlur: true }}
      />
    </Stack.Navigator>
  );
}
