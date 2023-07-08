import { View, Image, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";



export default function Card() {
  const navigation = useNavigation()

  return (
    <TouchableOpacity style={styles.container} disabled={true}>
      <View>
        <Image source={require("../assets/UserRect1.png")} style={styles.photo} />
        <Text style={styles.title}>Ліс</Text>
      </View>

      <View style={styles.bottomContainer}>
        <TouchableOpacity style={styles.barLeft} onPress={() => navigation.navigate("Comments")}>
          <Feather name="message-circle" size={24} style={styles.messageIcon} />
          <Text style={styles.barLeftText}>0</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.barRight} onPress={() => navigation.navigate("Map")}>
          <Feather name="map-pin" size={24} style={styles.pinIcon} />
          <Text style={styles.barRightText}>Ivano-Frankivs'k Region, Ukraine</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
  },

  photo: {
    borderRadius: 8,
    width: "100%",
    height: 240,
  },
  title: {
    marginTop: 8,
    fontWeight: "500",
    fontSize: 16,
    lineHeight: 19,
    color: "#212121",
  },

  bottomContainer: {
    marginTop: 8,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  barLeft: {
    display: "flex",
    flexDirection: "row",
    alignItems: "flex-end",
  },
  barLeftText: {
    color: "#BDBDBD",
    fontFamily: "Roboto",
    fontWeight: "400",
    fontSize: 16,
    lineHeight: 19,
  },
  barRight: {
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
  messageIcon: {
    marginRight: 4,
    transform: [{ rotateY: "-180deg" }],
    color: "#BDBDBD",
  },
});
