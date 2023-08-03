import { View, Text, TouchableOpacity, Image, StyleSheet } from "react-native";
import { useCallback, useState } from "react"; //react
import { useFocusEffect } from "@react-navigation/native"; //react-navigation

import getImageUrl from "../utils/getImageUrl";
import { auth } from "../../config";

export default function UserTab() {
  const [image, setImage] = useState();
  const user = auth.currentUser;
  if (user === null) {
    const name = "";
    const email = "";

  }


  const name = user.displayName;
  const email = user.email;



  useFocusEffect(
    useCallback(() => {

      if (user.photoURL) {
        (async function () {
          try {
            const url = await getImageUrl(user.photoURL);
            setImage(url);
          } catch (e) {
            console.error(e);
          }
        })();
      }
    }),
  );

  return (
    <TouchableOpacity style={styles.container}>
      <Image source={{ uri: `${image}` }} style={styles.photo} />
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
