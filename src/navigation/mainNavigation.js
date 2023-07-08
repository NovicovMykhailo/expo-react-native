import { createStackNavigator } from "@react-navigation/stack";

import RegistrationScreen from "../screens/RegistrationScreen";
import LoginScreen from "../screens/LoginScreen";
import CommentsScreen from "../screens/CommentsScreen";
import MapScreen from "../screens/MapScreen";
import HomeScreenRoutes from "../navigation/HomeNavigation";



import { CreateHedder } from "../components/CreateHedder";

// =========  Main Navigation

const MainStack = createStackNavigator();

export const Routes = () => (
  <MainStack.Navigator initialRouteName="Login" screenOptions={{ headerShown: false }}>
    <MainStack.Screen name="Registration" component={RegistrationScreen} />
    <MainStack.Screen name="Login" component={LoginScreen} />
    <MainStack.Screen name="HomeScreen" component={HomeScreenRoutes} />
    <MainStack.Screen
      name="Comments"
      component={CommentsScreen}
      options={{ title: "Коментарі", ...CommentsScreenHeaderOption }}
    />
    <MainStack.Screen name="Map" component={MapScreen} options={{ title: "Мапа", ...mapScreenHeaderOption }} />
  </MainStack.Navigator>
);

const CommentsScreenHeaderOption = {
  headerShown: true,
  header: ({ navigation, route, options }) => (
    <CreateHedder navigation={navigation} route={route} options={options} to={"back"} />
  ),
};

const mapScreenHeaderOption = {
  headerShown: true,
  header: ({ navigation, route, options }) => (
    <CreateHedder navigation={navigation} route={route} options={options} to={"back"} />
  ),
};
