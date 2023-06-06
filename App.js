import "react-native-gesture-handler";

import { NavigationContainer } from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Routes } from "./navigation/mainNavigation";

export default function App() {
  const [fontsLoaded] = useFonts({
    Roboto: require("./assets/fonts/Roboto-Regular.ttf"),
  });
  if (!fontsLoaded) {
    return null;
  }
  return (
    <NavigationContainer>
      <Routes />
    </NavigationContainer>
  );
}
