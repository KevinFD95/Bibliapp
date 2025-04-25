import { createStackNavigator } from "@react-navigation/stack";

import Library from "../views/LibraryView.jsx";
import BookDetails from "./BookDetails.jsx";
import BookView from "./BookView.jsx";

const Stack = createStackNavigator();

export default function LibraryStackNavigator() {
  return (
    <Stack.Navigator
      initialRouteName="Library"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="Library" component={Library} />
      <Stack.Screen name="BookDetails" component={BookDetails} />
      <Stack.Screen name="BookView" component={BookView} />
    </Stack.Navigator>
  );
}
