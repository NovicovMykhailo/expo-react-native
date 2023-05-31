import { StatusBar } from "expo-status-bar";
import { StyleSheet, View } from "react-native";
import { useFonts } from "expo-font";
import Registration from "./Screens/RegistrationScreen";


export default function App() {
    const [fontsLoaded] = useFonts({
      "Roboto-Regular": require("./assets/fonts/Roboto-Regular.otf"),
      "Roboto-Medium": require("./assets/fonts/Roboto-Medium.otf"),
      "Roboto-Bold": require("./assets/fonts/Roboto-Bold.otf"),
    });
  
   if (!fontsLoaded) {
     return null;
   }
  
  return (
    <View style={{ width: "100%"}}>
      <Registration />
    </View>
  );
}

const styles = StyleSheet.create({});
