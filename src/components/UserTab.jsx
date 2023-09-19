import { View, Text, Image, StyleSheet } from "react-native";// native
import { useCallback, useState, useEffect } from "react"; //react
import { useFocusEffect } from "@react-navigation/native"; //react-navigation
import { getAuth } from "firebase/auth";

import { useSelector, useDispatch } from "react-redux";//redux
import { selectUser } from "../redux/auth/selectors";//redux
import {refreshUserPhoto}from '../redux/auth/thunks'
import UserBarPlaceholder from "./PlaceHolders/UserBarPlaceholder";//component

export default function UserTab() {
  const dispatch = useDispatch()
  const userInfo = useSelector(selectUser);
  const [image, setImage] = useState();
  const [user, setUser] = useState(userInfo);
  const [isRefreshing, setIsRefreshing] = useState(false);


  useEffect(() => {
    if (!userInfo) {
      setIsRefreshing(true);
      const auth = getAuth();
      const user = auth.currentUser;
      const photo = auth.currentUser.photoURL;
      setUser(user);
      setImage(photo);
      setIsRefreshing(false);
    } else {
      setImage(userInfo.photoURL);
      setUser(userInfo);
      setIsRefreshing(false);
    }
  }, []);

  useFocusEffect(
    useCallback(() => {
      setTimeout(() => {
        const auth = getAuth();
        const serverUserPhoto = auth.currentUser.photoURL;
        if (userInfo && userInfo.photoURL !== serverUserPhoto) {
          setImage(serverUserPhoto);
          dispatch(refreshUserPhoto())
        }
      }, 1500);
    }, []),
  );

  return (
    <View style={styles.container}>
      {isRefreshing && <UserBarPlaceholder />}
      {!isRefreshing && user && (
        <>
          <Image source={{ uri: `${image}` }} style={styles.photo} />
          <View style={styles.textContainer}>
            <Text style={styles.title}>{user.displayName}</Text>
            <Text style={styles.email}>{user.email}</Text>
          </View>
        </>
      )}
    </View>
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
