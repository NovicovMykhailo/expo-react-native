import { View, Text, TouchableOpacity, Image, StyleSheet } from "react-native";

export default function UserTab({ email, name, photo }) {
  return (
    <TouchableOpacity style={styles.container}>
      <Image source={require("../assets/userPhoto.png")} style={styles.photo} />
      <View>
        <Text style={styles.title}>Natali Romanova</Text>
        <Text style={styles.email}>email@example.com</Text>
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
    width: 171,
    height: 60,
  },
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
    marginTop: -4,
    color: "#212121cc",
    fontFamily: "Roboto",
    fontWeight: "400",
    fontSize: 11,
    lineHeight: 13,
  },
});
