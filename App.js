import "react-native-gesture-handler";

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { useFonts } from "expo-font";
import Registration from "./Screens/RegistrationScreen";
import LoginScreen from "./Screens/LoginScreen";
import PostsScreen from "./Screens/PostsScreen";
import Comments from "./Components/Comments";
import {CreateHedder} from "./Components/CreateHedder";



const MainStack = createStackNavigator();

export default function App() {
  const [fontsLoaded] = useFonts({
    Roboto: require("./assets/fonts/Roboto-Regular.ttf"),
  });
  if (!fontsLoaded) {
    return null;
  }
  return (
    <NavigationContainer>
      <MainStack.Navigator initialRouteName="Login" screenOptions={{ headerShown: false }}>
        <MainStack.Screen name="Registration" component={Registration} />
        <MainStack.Screen name="Login" component={LoginScreen} />
        <MainStack.Screen name="PostScreen" component={PostsScreen} />
        <MainStack.Screen
          name="Comments"
          component={Comments}
          options={{ title: "Публікації",...CreateHeaderOption }}
        />
      </MainStack.Navigator>
    </NavigationContainer>
  );
}


const CreateHeaderOption = {
  headerShown: true,
  header: ({ navigation, route, options }) => <CreateHedder navigation={navigation} route={route} options={options} to={"User"}/>,
};
