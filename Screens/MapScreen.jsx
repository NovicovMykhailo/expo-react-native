import { View, Text, StyleSheet } from "react-native";
import { Feather } from "@expo/vector-icons";

export default MapScreen = () => {
  return (
    <View style={styles.container}>
      <View style={styles.map}></View>
      <View style={styles.barRight}>
        <Feather name="map-pin" size={24} style={styles.pinIcon} />
        <Text style={styles.barRightText}>Ukraine</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    alignItems: "flex-start",
    justifyContent: "center",
    backgroundColor: "white",
  },
  map: {
    width: "100%",
    minHeight: "70%",
    display: "flex",
    borderWidth: 1,
    borderColor: "grey",
    paddingTop: "50%",
    borderRadius: 16,
    justifyContent: "center",
    textAlign: "center",
    alignItems: "center",
    backgroundColor: "#E8E8E8",

    fontSize: 24,
  },

    barRight: {
      marginTop: 16,
    display: "flex",
    flexDirection: "row",
    alignItems: "flex-end",
  },
  barRightText: {
    color: "#212121",
    fontFamily: "Roboto",
    fontWeight: "400",
    fontSize: 16,
    lineHeight: 19,
    textDecorationLine: "underline",
  },
  pinIcon: {
    marginRight: 6,
    color: "#BDBDBD",
  },
});
