import { createStackNavigator } from "@react-navigation/stack"; // native
import { getAuth, onAuthStateChanged } from "firebase/auth"; // firebase

import HomeScreenRoutes from "./HomeNavigation"; // stacks navigation
import RegistrationScreen from "../screens/RegistrationScreen"; //screens
import CommentsScreen from "../screens/CommentsScreen"; //screens
import LoginScreen from "../screens/LoginScreen"; //screens
import MapScreen from "../screens/MapScreen"; //screens

import { CreateHedder } from "../components/CreateHedder"; // hedder Creator (util)
import { useDispatch, useSelector } from "react-redux"; //redux
import { autologin } from "../redux/auth/slice"; // redux
import { logOut } from "../redux/auth/thunks"; //redux

import { useState } from "react"; // react

// =========  Main Navigation

const MainStack = createStackNavigator();

export const Routes = () => {
  const auth = getAuth();
  const isRegistered = useSelector(state=>state.auth.isRegistered);

  const dispatch = useDispatch();
  const [isSignedIn, setIsSignedIn] = useState(false);

  isRegistered && onAuthStateChanged(auth, user => {
      if (user) {
        dispatch(autologin(user));
        setIsSignedIn(true);

      }
      if (!user) {
        setIsSignedIn(false);

        dispatch(logOut());
      }
    });

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
