import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import Registration from "./Screens/RegistrationScreen";

export default function App() {
  return (
    <View style={{  width: "100%" }}>
      <Registration />
    </View>
  );
}

const styles = StyleSheet.create({});
