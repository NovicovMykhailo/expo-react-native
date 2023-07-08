import { View, Text, StyleSheet } from "react-native";
import { useFonts } from "expo-font";

export default function HeaderTitle({ title }) {
  const [fontsLoaded] = useFonts({
    Roboto: require("../assets/fonts/Roboto-Regular.ttf"),
  });
  if (!fontsLoaded) {
    return null;
  }
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{title}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: "center", flexDirection: "row", paddingHorizontal: 75 },
  text: {
    color: "#212121",
    fontFamily: "Roboto",
    fontWeight: "500",
    fontSize: 17,
    letterSpacing: -0.408,
    padding: 11,
  },
});
