import {
  View,
  StyleSheet,
  ImageBackground,
  SafeAreaView,
  StatusBar,
  ScrollView,
  Text,
  TouchableOpacity,
  RefreshControl,
} from "react-native"; // native
import { useFetchUserPostsQuery } from "../redux/posts/posts"; // redux
import { logOut } from "../redux/auth/thunks"; // redux action
import { useDispatch } from "react-redux"; // redux

import { useEffect, useState } from "react"; //react
import { auth } from "../../config"; //firebase

import PostsPlaceholder from "../components/PlaceHolders/PostsPlaceholder"; //Components
import UserPhoto from "../components/UserPhoto"; //Components
import StoryCard from "../components/StoryCard"; // Components
import imageBg from "../assets/Photo_BG2x.png"; //bg image
import { Feather } from "@expo/vector-icons"; // icons

import getImageUrl from "../utils/getImageUrl"; //utils
import showToast from "../utils/showToast"; // toast

export default ProfileScreen = () => {
  const user = auth.currentUser;
  const name = user.displayName;

  const [userImage, setUserImage] = useState(null);
  const { isLoading, refetch, data: posts, error } = useFetchUserPostsQuery(user?.uid);

  useEffect(() => {
    if (user.photoURL) {
      (async function () {
        try {
          const url = await getImageUrl(user.photoURL);
          setUserImage(url);
        } catch (e) {
          showToast({ type: "error", message: `${e}` });
        }
      })();
    }
  });

  error && showToast({ type: "error", message: `${error}` });

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar hidden={true} />
      <ImageBackground source={imageBg} style={styles.image} />
      <View>
        <ScrollView
          refreshControl={<RefreshControl refreshing={isLoading} onRefresh={refetch} horizontal={false} />}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
        >
          <View style={styles.view}>
            <View style={styles.userbar}>
              <UserPhoto photo={{ uri: `${userImage}` }} />
              <ExitBtn />
              <Text style={styles.Name}>{name}</Text>
            </View>
            {isLoading && <PostsPlaceholder />}
            {!isLoading && posts?.map(item => <StoryCard key={item.id} item={item} userId={user.uid} />)}
            {error && showToast({ type: "error", message: `${error}` })}
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
  userbar: {
    marginBottom: 32,
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
  },
  exitBtn: {
    position: "absolute",
    right: 0,
    top: -100,
    color: "#BDBDBD",
  },
});
