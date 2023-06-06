import { View, TouchableOpacity, StyleSheet, ImageBackground } from "react-native";
import { AntDesign } from "@expo/vector-icons";

export default function UserPhoto() {
  return (
    <View style={styles.userPhoto}>
      <ImageBackground source={require("../assets/userPhoto.png")} style={styles.photo} />
      <TouchableOpacity style={styles.Btn}>
        <AntDesign name="plus" size={19} style={styles.BtnIcon} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  userPhoto: {
    width: 120,
    height: 120,
    borderRadius: 16,
    backgroundColor: "#F6F6F6",
    position: "relative",
    top: -62,
    left: "46%",
    transform: [{ translateX: -50 }],
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  photo: {
    height: 120,
    width: 120,
    borderRadius: 16,
    overflow: "hidden",
  },
  Btn: {
    position: "absolute",
    right: -11,
    top: 81,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: 25,
    height: 25,
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: "#E8E8E8",
    backgroundColor: "#FFFFFF",
    borderRadius: 50,
  },
  BtnIcon: {
    transform: [{ rotate: "45deg" }],
    color: "#E8E8E8",
  },
});
