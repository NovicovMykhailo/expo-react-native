import { View, Text, Image, StyleSheet } from "react-native";
import { useCallback, useState, useEffect } from "react"; //react
import { useFocusEffect } from "@react-navigation/native"; //react-navigation
import { getAuth } from "firebase/auth";
import UserBarPlaceholder from "./PlaceHolders/UserBarPlaceholder";
import { useSelector } from "react-redux";
import { selectUserPhoto, selectUser } from "../redux/auth/selectors";

export default function UserTab() {
  const [image, setImage] = useState();
  const [user, setUser] = useState();
  const [isRefreshing, setIsRefreshing] = useState(false);
  const userInfo = useSelector(selectUser);

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
      const auth = getAuth();
      if (userInfo && auth?.currentUser.photoURL !== userInfo?.photoURL) {
        setImage(auth.currentUser.photoURL);
      }
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
