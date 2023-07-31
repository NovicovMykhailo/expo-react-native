import {
  View,
  StyleSheet,
  ImageBackground,
  SafeAreaView,
  StatusBar,
  ScrollView,
  Text,
  TouchableOpacity,
} from "react-native";
import { Feather } from "@expo/vector-icons";

import image from "../assets/Photo_BG2x.png";
import UserPhoto from "../components/UserPhoto";
import StoryCard from "../components/StoryCard";

import { reverseData } from "../utils/formating";
import { useNavigation } from "@react-navigation/native";
//redux
import { useSelector, useDispatch } from "react-redux";
import { refreshUser } from "../redux/auth/slice";
//selectors
import { selectUser } from "../redux/auth/selectors";
import { selectAllPosts } from "../redux/selectors";
import { useEffect } from "react";

// import { posts, Auth } from "../store/test/StoreSampleTest.json";

export default ProfileScreen = () => {

  const dispatch = useDispatch();
  const user = useSelector(selectUser);

  useEffect(() => {

    ///dispatch on init thunk
    (async () => {
      await dispatch(refreshUser());
    })();
  }, []);


  const { name, user_photo, _id } = user;

  const userPosts = useSelector(selectAllPosts).filter(posts => posts.owner === _id);
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar hidden={true} />
      <ImageBackground source={image} style={styles.image} />
      <View>
        <ScrollView>
          <View style={styles.view}>
            <View>
              <UserPhoto photo={user_photo} />
              <ExitBtn />
              <Text style={styles.Name}>{name}</Text>
            </View>

            {reverseData(userPosts).map(item => (
              <StoryCard key={item.id} item={item} userId={_id} />
            ))}
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

function ExitBtn() {
  const navigation = useNavigation();
  return (
    <TouchableOpacity>
      <Feather name="log-out" size={24} style={styles.exitBtn} onPress={() => navigation.navigate("Login")} />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },

  image: {
    resizeMode: "cover",
    height: 900,
    flex: 1,
  },
  Name: {
    fontFamily: "Roboto",
    fontWeight: 500,
    fontSize: 30,
    lineHeight: 35,
    textAlign: "center",
    letterSpacing: 0.01,
    color: "#212121",

    marginTop: -32,
  },
  view: {
    marginTop: 163,
    minHeight: 450,

    backgroundColor: "#ffffff",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    paddingTop: 0,
    paddingHorizontal: 16,
    paddingBottom: 43,
    gap: 32,
  },
  exitBtn: {
    position: "absolute",
    right: 0,
    top: -100,
    color: "#BDBDBD",
  },
});
