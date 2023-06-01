import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { MaterialIcons } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import Publications from "./Publications";
import Users from "./Users";
import CreatePublication from "./CreatePublication";
import { View } from "react-native";

export default PostsScreen = () => {
  const Tabs = createBottomTabNavigator();

  return (
    <Tabs.Navigator
      screenOptions={({ route }) => ({
        tabBarShowLabel: false,

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
      <Tabs.Screen name="User" component={Publications} options={{ title: "Користувачі" }} />
      <Tabs.Screen name="Create" component={CreatePublication} options={{ title: "Створити публікацію" }} />
      <Tabs.Screen name="Publications" component={Users} options={{ title: "Публікації" }} />
    </Tabs.Navigator>
  );
};
