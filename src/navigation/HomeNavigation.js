import { View, StyleSheet } from "react-native"; //react-native
import { useCallback, useEffect } from "react"; //react
import { useSelector, useDispatch } from "react-redux"; //redux
import { logOut, refreshUser, showLoaderPage } from "../redux/auth/thunks"; //redux
import { selectCurrentToken, selectIsLoading } from "../redux/auth/selectors"; //redux

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"; //navigator
import { useFocusEffect } from "@react-navigation/native"; // navigator

import CreatePublicationScreen from "../screens/CreatePublicationScreen"; //screens
import PostsScreen from "../screens/PostsScreen"; //screens
import ProfileScreen from "../screens/ProfileScreen"; //screens

import { CreateHedder, PublicationsHedder } from "../components/CreateHedder"; //components
import isStillAuthCheck from "../utils/isStillAuthCheck"; //util
import { Feather, MaterialIcons } from "@expo/vector-icons"; //icons

const Tabs = createBottomTabNavigator();
// verifying token

// let isAuth;
const HomeScreenRoutes = () => {
  // const dispatch = useDispatch();
  // const currentToken = useSelector(selectCurrentToken);
  // const isLoading = useSelector(selectIsLoading);

  // useEffect(() => {
  //   (async () => {
  //     dispatch(refreshUser());
  //   })();
  // }, []);

  // useFocusEffect(
  //   useCallback(() => {
  //     setTimeout(() => {
  //       isAuth = isStillAuthCheck(currentToken);
  //       // if (isAuth) dispatch(showLoaderPage(false));
  //       if (!isAuth) dispatch(logOut());
  //     }, 3000);
  //   }),
  // );

  return (
    <Tabs.Navigator screenOptions={homeScreenOptions}>
      <Tabs.Screen
        name="Publications"
        component={PostsScreen}
        options={{ title: "Публікації", ...PublicationsHeaderOption }}
      />
      <Tabs.Screen
        name="Create"
        component={CreatePublicationScreen}
        options={{ title: "Створити публікацію", ...CreateHeaderOption, tabBarStyle: styles.tabBarHidden }}
      />
      <Tabs.Screen name="User" component={ProfileScreen} options={{ title: "Користувачі", headerShown: false }} />
    </Tabs.Navigator>
  );
};

const CreateHeaderOption = {
  headerShown: true,
  header: ({ navigation, route, options }) => <CreateHedder navigation={navigation} route={route} options={options} />,
};

const PublicationsHeaderOption = {
  headerShown: true,
  header: ({ navigation, route, options }) => (
    <PublicationsHedder navigation={navigation} route={route} options={options} />
  ),
};

const homeScreenOptions = ({ route }) => ({
  tabBarShowLabel: false,
  tabBarStyle: styles.tabBarHomeScreen,

  tabBarIcon: ({ focused }) => {
    if (route.name === "Create") {
      return (
        <View style={[styles.overlay, focused && styles.focusedIcon]}>
          <Feather name="plus" size={24} style={[styles.plusIcon, focused && styles.focusedPlusIcon]} />
        </View>
      );
    } else if (route.name === "User") {
      return <Feather name="user" size={24} style={[styles.icon, focused && styles.focusedIcon]} />;
    } else if (route.name === "Publications") {
      return <MaterialIcons name="grid-view" size={24} style={[styles.icon, focused && styles.focusedIcon]} />;
    }
  },
});

const styles = StyleSheet.create({
  overlay: {
    width: 70,
    height: 40,
    borderRadius: 20,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#F6F6F6",
  },
  focusedOverlay: {
    backgroundColor: "#FF6C00", 
  },
  plusIcon: {
    color: "#212121cc",
  },
  focusedPlusIcon: {
    color: "white",
  },

  icon: { color: "#212121cc" }, 
  focusedIcon: {
    color: "#FF6C00",
  },
  tabBarHidden: {
    display: "none",
  },
  tabBarHomeScreen: {
    paddingHorizontal: 82,
  },
});

export default HomeScreenRoutes;
