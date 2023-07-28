import { View, Text, TouchableOpacity, Image, StyleSheet } from "react-native";

export default function UserTab({ data }) {
  const { name, email, user_photo } = data;

  return (
    <TouchableOpacity style={styles.container}>
      <Image source={{ uri: `${user_photo}` }} style={styles.photo} />
      <View style={styles.textContainer}>
        <Text style={styles.title}>{name}</Text>
        <Text style={styles.email}>{email}</Text>
      </View>
    </TouchableOpacity>
  );
}
const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    flex: 1,
    height: 60,

    backgroundColor: "#FFFFFF",
  },
  textContainer: { width: "80%" },
  photo: {
    width: 60,
    height: 60,
    borderRadius: 16,
  },
  title: {
    color: "#212121",
    fontFamily: "Roboto",
    fontWeight: "700",
    fontSize: 13,
    lineHeight: 15,
  },
  email: {
    // marginTop: -4,
    color: "#212121cc",
    fontFamily: "Roboto",
    fontWeight: "400",
    fontSize: 11,
    lineHeight: 13,
  },
});
