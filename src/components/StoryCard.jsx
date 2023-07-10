import { View, Image, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Feather } from "@expo/vector-icons";

export default function StoryCard({ item }) {
  const { image, title, location, comments, coords, likes } = item;
  const navigation = useNavigation();
  return (
    <TouchableOpacity style={styles.container} disabled={true}>
      <View>
        <Image source={{ uri: `${image}` }} style={styles.photo} />
        <Text style={styles.title}>{title}</Text>
      </View>

      <View style={styles.bottomContainer}>
        <View style={styles.leftSideIcons}>
          <TouchableOpacity style={styles.barLeft} onPress={() => navigation.navigate("Comments", { comments, image })}>
            <Feather
              name="message-circle"
              size={24}
              style={[styles.messageIcon, comments.length > 0 && styles.activeIcon]}
            />
            <Text style={styles.barLeftText}>{comments.length}</Text>
          </TouchableOpacity>
          <View style={styles.barLeft}>
            <TouchableOpacity>
              <Feather name="thumbs-up" size={24} style={[styles.thumbUpIcon, likes > 0 && styles.activeIcon]} />
            </TouchableOpacity>

            <Text style={styles.barLeftText}>{likes}</Text>
          </View>
        </View>

        <TouchableOpacity
          style={styles.barRight}
          onPress={() => navigation.navigate("Map", { coords, location, title })}
        >
          <Feather name="map-pin" size={24} style={styles.pinIcon} />
          <Text style={styles.barRightText} numberOfLines={1}>
            {location}
          </Text>
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
    textAlign: "right",
  },
  messageIcon: {
    marginRight: 4,
    color: "#BDBDBD",
    transform: [{ rotateY: "-180deg" }],
  },
  thumbUpIcon: {
    marginRight: 6,
    color: "#BDBDBD",
  },
  pinIcon: {
    marginRight: 6,
    color: "#BDBDBD",
  },
  activeIcon: { color: "#FF6C00" },
});
