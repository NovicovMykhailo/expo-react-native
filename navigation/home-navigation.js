import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import CreatePublicationScreen from "../Screens/CreatePublicationScreen";
import PostsScreen from "../Screens/PostsScreen";
import ProfileScreen from "../Screens/ProfileScreen";

import { CreateHedder, PublicationsHedder } from "../Components/CreateHedder";

import { Feather, MaterialIcons } from "@expo/vector-icons";
import { View } from "react-native";



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
      options={{ title: "Створити публікацію", ...CreateHeaderOption, tabBarStyle: { display: "none" } }}
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
  tabBarStyle: { paddingHorizontal: 82 },

  tabBarIcon: ({ focused }) => {
    if (route.name === "Create") {
      return (
        <View
          style={{
            width: 70,
            height: 40,
            backgroundColor: !focused ? "#F6F6F6" : "#FF6C00",
            borderRadius: 20,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Feather name="plus" size={24} color={!focused ? "#212121cc" : "white"} />
        </View>
      );
    } else if (route.name === "User") {
      return <Feather name="user" size={24} color={!focused ? "#212121cc" : "#FF6C00"} />;
    } else if (route.name === "Publications") {
      return <MaterialIcons name="grid-view" size={24} color={!focused ? "#212121cc" : "#FF6C00"} />;
    }
  },
});
