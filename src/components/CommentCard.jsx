import { View, Text, Image, StyleSheet } from "react-native";
import { dateFormat } from "../utils/formating";
// import { Auth } from "./../store/test/StoreSampleTest.json";
import { auth } from "../../config";

export default function CommentCard({ data }) {
  const { user_id, photoURL, comment, createdAt } = data;

const user = auth.currentUser;
const userUid = user.uid;
console.log(data)



  return (
    <View style={[styles.container, user_id === userUid && styles.containerLeft]}>
      <View>
        <Image source={{ uri: `${photoURL}` }} style={styles.photo} />
      </View>

      <View style={[styles.commentContainer, user_id === userUid && styles.commentRight]}>
        <Text style={styles.comment}>{comment}</Text>

        <Text style={[styles.date, user_id === userUid && styles.dateLeft]}>{dateFormat(createdAt)}</Text>
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
