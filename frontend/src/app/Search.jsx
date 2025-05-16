// React
import { createStackNavigator } from "@react-navigation/stack";

// Vistas
import SearchView from "../views/SearchView.jsx";
import BookDetails from "../views/DetailsView.jsx";
import BookView from "../views/BookView.jsx";

const Stack = createStackNavigator();

export default function SearchStackNavigator() {
  return (
    <Stack.Navigator
      initialRouteName="SearchView"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="SearchView" component={SearchView} />
      <Stack.Screen name="BookDetails" component={BookDetails} />
      <Stack.Screen name="BookView" component={BookView} />
    </Stack.Navigator>
  );
}
