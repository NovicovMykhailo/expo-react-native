import { View, Image, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Feather } from "@expo/vector-icons";

export default function StoryCard() {
  const navigation = useNavigation();
  return (
    <TouchableOpacity style={styles.container} disabled={true}>
      <View>
        <Image source={require("../assets/UserRect1.png")} style={styles.photo} />
        <Text style={styles.title}>Ліс</Text>
      </View>

      <View style={styles.bottomContainer}>
        <View style={styles.leftSideIcons}>
          <TouchableOpacity style={styles.barLeft} onPress={() => navigation.navigate("Comments")}>
            <Feather name="message-circle" size={24} style={styles.messageIcon} />
            <Text style={styles.barLeftText}>6</Text>
          </TouchableOpacity>
          <View style={styles.barLeft}>
            <Feather name="thumbs-up" size={24} style={styles.thumbUpIcon} />
            <Text style={styles.barLeftText}>26</Text>
          </View>
        </View>

        <TouchableOpacity style={styles.barRight} onPress={() => navigation.navigate("Map")}>
          <Feather name="map-pin" size={24} style={styles.pinIcon} />
          <Text style={styles.barRightText}>Ukraine</Text>
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
  leftSideIcons: {
    disply: "flex",
    flexDirection: "row",
    gap: 24,
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
  messageIcon: {
    marginRight: 4,
    color: "#FF6C00",
    transform: [{ rotateY: "-180deg" }],
  },
  thumbUpIcon: {
    marginRight: 6,
    color: "#FF6C00",
  },
  pinIcon: {
    marginRight: 6,
    color: "#BDBDBD",
  },
});
