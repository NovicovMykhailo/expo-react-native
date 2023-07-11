import { View, Image, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

export default function Card({ image, title, location, comments, coords }) {


  const navigation = useNavigation();


  return (
    <TouchableOpacity style={styles.container} disabled={true}>
      <View>
        <Image source={{ uri: `${image}` }} style={styles.photo} />
        <Text style={styles.title}>{title}</Text>
      </View>

      <View style={styles.bottomContainer}>
        <TouchableOpacity style={styles.barLeft} onPress={() => navigation.navigate("Comments", { comments, image })}>
          <Feather
            name="message-circle"
            size={24}
            style={[styles.messageIcon, comments.length > 0 && styles.activeIcon]}
          />

          <Text style={[styles.barLeftText]}>{comments.length}</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.barRight}
          onPress={() => navigation.navigate("Map", { coords, location, title })}
        >
          <Feather name="map-pin" size={24} style={styles.pinIcon} />

          <Text style={styles.barRightText}>{location}</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    marginBottom: 32,
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
  activeIcon: { color: "#FF6C00", tintColor: "#FF6C00" },
});
