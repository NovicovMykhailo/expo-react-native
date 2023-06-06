import { createStackNavigator } from "@react-navigation/stack";

import RegistrationScreen from "../Screens/RegistrationScreen";
import LoginScreen from "../Screens/LoginScreen";
import CommentsScreen from "../Screens/CommentsScreen";
import HomeScreen from "../Screens/HomeScreen";

import { CreateHedder } from "../Components/CreateHedder";

// =========  Main Navigation

const MainStack = createStackNavigator();

export const Routes = () => (
  <MainStack.Navigator initialRouteName="Login" screenOptions={{ headerShown: false }}>
    <MainStack.Screen name="Registration" component={RegistrationScreen} />
    <MainStack.Screen name="Login" component={LoginScreen} />
    <MainStack.Screen name="HomeScreen" component={HomeScreen} />
    <MainStack.Screen
      name="Comments"
      component={CommentsScreen}
      options={{ title: "Публікації", ...CommentsScreenHeaderOption }}
    />
  </MainStack.Navigator>
);

const CommentsScreenHeaderOption = {
  headerShown: true,
  header: ({ navigation, route, options }) => (
    <CreateHedder navigation={navigation} route={route} options={options} to={"User"} />
  ),
};