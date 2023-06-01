import { View, Text } from "react-native";
import { useFonts } from "expo-font";
export default function HeaderTitle({ title }) {
  const [fontsLoaded] = useFonts({
    Roboto: require("../assets/fonts/Roboto-Regular.ttf"),
  });
  if (!fontsLoaded) {
    return null;
  }
  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        flexDirection: "row",

        paddingLeft: 75,
        paddingRight: 75,
      }}
    >
      <Text
        style={{
          color: "#212121",
          fontFamily: "Roboto",
          fontWeight: "500",
          fontSize: 17,
          letterSpacing: -0.408,
          padding: 11,
        }}
      >
        {title}
      </Text>
    </View>
  );
}
