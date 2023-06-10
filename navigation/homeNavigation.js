import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import CreatePublicationScreen from "../Screens/CreatePublicationScreen";
import PostsScreen from "../Screens/PostsScreen";
import ProfileScreen from "../Screens/ProfileScreen";

import { CreateHedder, PublicationsHedder } from "../Components/CreateHedder";

import { Feather, MaterialIcons } from "@expo/vector-icons";
import { View, StyleSheet } from "react-native";

const Tabs = createBottomTabNavigator();

export const HomeScreenRoutes = () => (
  <Tabs.Navigator screenOptions={homeScreenOptions}>
    <Tabs.Screen
      name="Publications"
      component={PostsScreen}
      options={{ title: "Публікації", ...PublicationsHeaderOption }}
    />
    <Tabs.Screen
      name="Create"
      component={CreatePublicationScreen}
      options={{ title: "Створити публікацію", ...CreateHeaderOption, tabBarStyle:  styles.tabBarHidden  }}
    />
    <Tabs.Screen name="User" component={ProfileScreen} options={{ title: "Користувачі", headerShown: false }} />
  </Tabs.Navigator>
);

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
    backgroundColor: "#FF6C00", //orange
  },
  plusIcon: {
    color: "#212121cc",
  },
  focusedPlusIcon: {
    color: "white",
  },

  icon: { color: "#212121cc" }, //grey
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
