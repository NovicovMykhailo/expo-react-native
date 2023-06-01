import "react-native-gesture-handler";

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Registration from "./Screens/RegistrationScreen";
import LoginScreen from "./Screens/LoginScreen";
import PostsScreen from "./Screens/PostsScreen";
import { useFonts } from "expo-font";
import { MaterialIcons } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";

import HeaderTitle from "./Components/HeaderTitle";
import CreatePublication from "./Screens/CreatePublication";



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
        <MainStack.Screen
          name="PostScreen"
          component={PostsScreen}
          // options={{ ...HeaderOption }}
          
        />
      </MainStack.Navigator>
    </NavigationContainer>
  );
}

const HeaderOption = {
  headerShown: true,


  title: <HeaderTitle title={"Публікації"} />,
  headerStyle: {
    backgroundColor: "#ffffff",
    height: 88,
  },
  // headerBackImageSource: {
  //    <Feather
  //     name="arrow-left"
  //     size={24}
  //     color="#212121"
  //     style={{ marginLeft: 20 }}

  //   />

  // }
  // headerLeft: () => (

  // ),

  headerRight: () => (
    <MaterialIcons
      name="logout"
      size={24}
      color="#BDBDBD"
      onPress={() => alert("This is a button!")}
      style={{ marginRight: 24 }}
    />
  ),
};
