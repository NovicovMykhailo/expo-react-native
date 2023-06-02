import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { View } from "react-native";

import { MaterialIcons } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";

import CreatePublication from "./CreatePublication";
import Publications from "./Publications";
import User from "./User";
import { CreateHedder, PublicationsHedder } from "../Components/CreateHedder";

export default PostsScreen = () => {
  const Tabs = createBottomTabNavigator();

  return (
    <Tabs.Navigator
      screenOptions={({ route }) => ({
        tabBarShowLabel: false,
        tabBarStyle: { paddingHorizontal: 82 },

        tabBarIcon: ({ focused, color, size }) => {
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
          }
          return <MaterialIcons name="grid-view" size={24} color={!focused ? "#212121cc" : "#FF6C00"} />;
        },
      })}
    >
      <Tabs.Screen
        name="Publications"
        component={Publications}
        options={{ title: "Публікації", ...PublicationsHeaderOption }}
      />
      <Tabs.Screen
        name="Create"
        component={CreatePublication}
        options={{
          title: "Створити публікацію",
          tabBarStyle: { display: "none" },
          ...CreateHeaderOption,
        }}
      />
      <Tabs.Screen
        name="User"
        component={User}
        options={{
          title: "Користувачі",
          headerShown: false,
        }}
      />
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
