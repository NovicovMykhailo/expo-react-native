import { createStackNavigator } from "@react-navigation/stack"; // native

import RegistrationScreen from "../screens/RegistrationScreen"; //screens
import LoginScreen from "../screens/LoginScreen"; //screens
import CommentsScreen from "../screens/CommentsScreen"; //screens
import MapScreen from "../screens/MapScreen"; //screens
import HomeScreenRoutes from "../navigation/HomeNavigation"; // stacks navigation

import { CreateHedder } from "../components/CreateHedder"; // hedder Creator (util)
import { useSelector } from "react-redux"; //redux

// =========  Main Navigation

const MainStack = createStackNavigator();

const getIsSignedIn = () => {   //check for token
  const token = useSelector(state => state.auth.token);
  return Boolean(token);
};

export const Routes = () => {
  const isSignedIn = getIsSignedIn();

  return (
    <MainStack.Navigator screenOptions={{ headerShown: false }}>
      {isSignedIn ? (
        <>
          <MainStack.Screen name="HomeScreen" component={HomeScreenRoutes} />
          <MainStack.Screen
            name="Comments"
            component={CommentsScreen}
            options={{ title: "Коментарі", ...CommentsScreenHeaderOption }}
          />
          <MainStack.Screen name="Map" component={MapScreen} options={{ title: "Мапа", ...mapScreenHeaderOption }} />
        </>
      ) : (
        <>
          <MainStack.Screen name="Login" component={LoginScreen} />
          <MainStack.Screen name="Registration" component={RegistrationScreen} />
        </>
      )}
    </MainStack.Navigator>
  );
};

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
