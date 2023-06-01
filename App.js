import "react-native-gesture-handler";

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Registration from "./Screens/RegistrationScreen";
import LoginScreen from "./Screens/LoginScreen";

const MainStack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <MainStack.Navigator initialRouteName="Login" screenOptions={{ headerShown: false }}>
        <MainStack.Screen name="Registration" component={Registration} />
        <MainStack.Screen name="Login" component={LoginScreen} />
        {/* <MainStack.Screen name="Home" component={PostsScreen} /> */}
      </MainStack.Navigator>
    </NavigationContainer>
  );
}
