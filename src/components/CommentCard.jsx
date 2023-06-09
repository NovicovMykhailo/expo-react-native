import { View, Text, Image, StyleSheet } from "react-native";
import { dateFormat } from "../utils/formating";
import { Auth } from "./../store/test/StoreSampleTest.json";

export default function CommentCard({ data }) {
  const { name, user_photo, comment, date } = data;
  let currentName = Auth.name;

  return (
    <View style={[styles.container, name === currentName && styles.containerLeft]}>
      <View>
        <Image source={{ uri: `${user_photo}` }} style={styles.photo} />
      </View>

      <View style={[styles.commentContainer, name === currentName && styles.commentRight]}>
        <Text style={styles.comment}>{comment}</Text>

        <Text style={[styles.date, name === currentName && styles.dateLeft]}>{dateFormat(date)}</Text>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    gap: 16,
    justifyContent: "space-between",
    marginBottom: 24,
  },
  containerLeft: {
    flexDirection: "row-reverse",
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
    borderTopRightRadius: 6,
  },
  commentRight: {
    borderTopRightRadius: 0,
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
    textAlign: "right",
    fontFamily: "Roboto",
    fontWeight: "400",
    fontSize: 10,
    lineHeight: 12,
    color: "#BDBDBD",
  },
  dateLeft: {
    textAlign: "left",
  },
});
