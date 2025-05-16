// React
import { createStackNavigator } from "@react-navigation/stack";

// Vistas
import HomeScreen from "../views/HomeView.jsx";
import BookDetails from "../views/DetailsView.jsx";
import BookView from "../views/BookView.jsx";

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
