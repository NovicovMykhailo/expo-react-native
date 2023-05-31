import { StatusBar } from "expo-status-bar";
import { StyleSheet, View } from "react-native";

import Registration from "./Screens/RegistrationScreen";
import LoginScreen from "./Screens/LoginScreen";


export default function App() {


  return (
    <View style={{ width: "100%"}} >
      <Registration />
      {/* <LoginScreen /> */}
    </View>
  );
}

const styles = StyleSheet.create({});
