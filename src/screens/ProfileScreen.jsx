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
import { Feather } from "@expo/vector-icons"; // icons

import { useDispatch } from "react-redux"; // redux
import { logOut } from "../redux/auth/thunks"; // redux action
import { useCallback, useEffect, useState } from "react"; //react
import { auth } from "../../config"; //firebase

import UserPhoto from "../components/UserPhoto"; //Components
import StoryCard from "../components/StoryCard"; //Components
import PostsPlaceholder from "../components/PlaceHolders/PostsPlaceholder"; //Components

import getImageUrl from "../utils/getImageUrl"; //utils
import toast from "../utils/toast";
import imageBg from "../assets/Photo_BG2x.png"; //bg image

import * as DB_API from "../db/api";
import { useFocusEffect } from "@react-navigation/native";

export default ProfileScreen = () => {
  const [userImage, setUserImage] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [posts, setPosts] = useState(null);

  const user = auth.currentUser;
  const name = user.displayName;

  useFocusEffect(
    useCallback(() => {
      setIsLoading(true);
      (async () => {
        const res = await DB_API.getUserPosts(user.uid);
        if (res !== posts) {
          setPosts(res);
          setIsLoading(false);
        } else {
          return;
        }
      })();
    }, []),
  );

  useEffect(() => {
    if (user.photoURL) {
      (async function () {
        try {
          const url = await getImageUrl(user.photoURL);
          setUserImage(url);
        } catch (e) {
          toast.error({ message: e });
        }
      })();
    }
  });

  useEffect(() => {
    setIsLoading(true);
    (async () => {
      const data = await DB_API.getUserPosts(user.uid);
      setPosts(data);
      setIsLoading(false);
    })();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar hidden={true} />
      <ImageBackground source={imageBg} style={styles.image} />
      <View>
        <ScrollView>
          <View style={styles.view}>
            <View>
              <UserPhoto photo={{ uri: `${userImage}` }} />
              <ExitBtn />
              <Text style={styles.Name}>{name}</Text>
            </View>
            {isLoading && <PostsPlaceholder />}
            {!isLoading && posts?.map(item => <StoryCard key={item.id} item={item} userId={user.uid} />)}
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

function ExitBtn() {
  const dispatch = useDispatch();
  return (
    <TouchableOpacity>
      <Feather name="log-out" size={24} style={styles.exitBtn} onPress={() => dispatch(logOut())} />
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
