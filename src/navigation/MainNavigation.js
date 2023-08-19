import { createStackNavigator } from "@react-navigation/stack"; // native
// import { useEffect } from "react";//react

import RegistrationScreen from "../screens/RegistrationScreen"; //screens
import LoginScreen from "../screens/LoginScreen"; //screens
import CommentsScreen from "../screens/CommentsScreen"; //screens
import MapScreen from "../screens/MapScreen"; //screens
import HomeScreenRoutes from "../navigation/HomeNavigation"; // stacks navigation

import { CreateHedder } from "../components/CreateHedder"; // hedder Creator (util)
import isStillAuthCheck from "../utils/isStillAuthCheck"; //utils
import { useDispatch, useSelector } from "react-redux"; //redux
import { selectCurrentToken } from "../redux/auth/selectors"; //redux
import { logOut, showLoaderPage } from "../redux/auth/thunks"; //redux

// =========  Main Navigation

const MainStack = createStackNavigator();

let isAuth;

const getIsSignedIn = () => {
  //check for token
  const token = useSelector(selectCurrentToken);
  isAuth = isStillAuthCheck(token);
  return Boolean(token);
};

export const Routes = () => {
  const dispatch = useDispatch();
  const isSignedIn = getIsSignedIn();

  if (!isSignedIn && !isAuth) dispatch(logOut());
  if (isSignedIn) dispatch(showLoaderPage(true));

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
