import { createStackNavigator } from "@react-navigation/stack"; // native

import RegistrationScreen from "../screens/RegistrationScreen"; //screens
import LoginScreen from "../screens/LoginScreen"; //screens
import CommentsScreen from "../screens/CommentsScreen"; //screens
import MapScreen from "../screens/MapScreen"; //screens
import HomeScreenRoutes from "../navigation/HomeNavigation"; // stacks navigation

import { CreateHedder } from "../components/CreateHedder"; // hedder Creator
import { useSelector } from "react-redux";

// =========  Main Navigation

const MainStack = createStackNavigator();

const getIsSignedIn = () => {
  // isSignedIn
  const token = useSelector(state => state.auth.token);
  // сравнить токен с актуальным и потом буль
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
          <MainStack.Screen name="Registration" component={RegistrationScreen} />
          <MainStack.Screen name="Login" component={LoginScreen} />
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
