import { View, Text, Image, StyleSheet } from "react-native";

export default function CommentCardUser() {
  return (
    <View style={styles.container}>
      <View >
        <Image source={require("../assets/userPhoto.png")} style={styles.photo} />
      </View>

      <View style={styles.commentContainer}>
        <Text style={styles.comment}>
          Really love your most recent photo. I’ve been trying to capture the same thing for a few months and would love
          some tips!
        </Text>
        <Text style={styles.date}>09 червня, 2020 | 08:40</Text>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row-reverse",
    gap: 16,
    justifyContent: "space-between",
  },
  photo: {
    width: 28,
    height: 28,
    borderRadius: 14,
  },
  commentContainer: {
    flex: 1,
    padding: 16,
    backgroundColor: "#00000008",
    display: "flex",
    gap: 8,
    borderBottomLeftRadius: 6,
    borderBottomRightRadius: 6,
    borderTopLeftRadius: 6,

  },
  comment: {
    fontFamily: "Roboto",
    fontWeight: "400",
    fontSize: 13,
    lineHeight: 18,
    color: "#212121",
    textAlign: "left",
  },
  date: {
    textAlign: "left",
    fontFamily: "Roboto",
    fontWeight: "400",
    fontSize: 10,
    lineHeight: 12,
    color: "#BDBDBD",
  },
});
