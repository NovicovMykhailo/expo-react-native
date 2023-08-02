import { View, Text, TouchableOpacity, Image, StyleSheet } from "react-native";
import { useState, useEffect } from "react";
import getImageUrl from "../utils/getImageUrl";
import {auth} from "../../config"


export default function UserTab() {
  const [image, setImage] = useState();

  const user = auth.currentUser

  if(user === null){
    const name = ''
    const email = ''
    const user_photo = null
  }

  const name = user.displayName
  const email = user.email
  const user_photo = user.photoURL

  
  useEffect(() => {
    if (user_photo) {
      (async function () {
        try {
          const url = await getImageUrl(user_photo);
          setImage(url);
        } catch (e) {
          console.error(e);
        }
      })();
    }
  },[user_photo]);



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
