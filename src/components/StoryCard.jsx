import { View, Image, Text, TouchableOpacity, StyleSheet, Alert } from "react-native"; // native
import { useRemoveLikeMutation, useAddLikeMutation, useRemovePostMutation } from "../redux/posts/posts"; // redux
import { useState, useEffect } from "react"; //react
import { useNavigation } from "@react-navigation/native"; //react-native
import { Feather } from "@expo/vector-icons"; //icon
import { getLikes } from "../db/api"; // api fetching
import { getAuth } from "firebase/auth"; // firebase

import LoadingScreen from "../components/Loaders/LoadingScreen";


//redux

export default function StoryCard({ item }) {
  const { image, title, location, comments, coords, likes: likesProps, id: postId } = item;

  const auth = getAuth();
  const { uid } = auth.currentUser;

  const [userId, _] = useState(uid);
  const [wasLiked, setWasLiked] = useState();
  const [likes, setLikes] = useState(likesProps);
  const [isDeleating, setIsDeleating] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  const [addLike] = useAddLikeMutation();
  const [removeLike] = useRemoveLikeMutation();
  const [removePost, { isSuccess }] = useRemovePostMutation();

  const navigation = useNavigation();

  useEffect(() => {
    const liked = likes.find(like => like === userId);
    setWasLiked(Boolean(liked));
  }, [likes]);

  const handleLikes = async () => {
    const index = likes.indexOf(userId);
    let refreshedLikes;

    if (index === -1) {
      await addLike({ postId, userId });
      refreshedLikes = await getLikes(postId);
      setLikes(refreshedLikes);
    } else {
      await removeLike({ postId, userId });
      refreshedLikes = await getLikes(postId);
      setLikes(refreshedLikes);
    }
  };

  const askForDeleating = () => {
    Alert.alert('Oh damn', 'Are you shure, you want to delete post?', [
      {
        text: 'Cancel',
        style: 'cancel',
      },
      {text: 'Delete', onPress: () => handleDelete(), style: 'default',},
    ]);
  };

  const handleDelete = async () => {
    setIsDeleating(true);
    await removePost(postId);
    isSuccess && setIsDeleating(false);
  };

  const showModal = () => {
    setModalVisible(prev => !prev);
  };

  return isDeleating ? (
    <LoadingScreen />
  ) : (
    <>
      <TouchableOpacity
        style={styles.container}
        disabled={false}
        onLongPress={askForDeleating}
        onPress={() => navigation.navigate("Comments", { comments, image, postId })}
      >
        <View>
          <Image source={{ uri: `${image}` }} style={styles.photo} />
          <Text style={styles.title}>{title}</Text>
        </View>

        <View style={styles.bottomContainer}>
          <View style={styles.leftSideIcons}>
            <TouchableOpacity
              style={styles.barLeft}
              onPress={() => navigation.navigate("Comments", { comments, image, postId })}
            >
              <Feather
                name="message-circle"
                size={24}
                style={[styles.messageIcon, comments.length > 0 && styles.activeIcon]}
              />
              <Text style={styles.barLeftText}>{comments.length}</Text>
            </TouchableOpacity>
            <View style={styles.barLeft}>
              <TouchableOpacity style={styles.isRelative} onPress={handleLikes}>
                {wasLiked && likes.length > 0 && (
                  <Image source={require("./../assets/thumbsUpGg.png")} style={styles.thumbFill} />
                )}
                <Feather
                  name="thumbs-up"
                  size={24}
                  style={[styles.thumbUpIcon, likes.length > 0 && styles.activeIcon]}
                />
              </TouchableOpacity>

              <Text style={styles.barLeftText}>{likes.length}</Text>
            </View>
          </View>

          <TouchableOpacity
            style={styles.barRight}
            onPress={() => navigation.navigate("Map", { coords, location, title })}
          >
            <Feather name="map-pin" size={24} style={styles.pinIcon} />
            <Text style={styles.barRightText} numberOfLines={1}>
              {location}
            </Text>
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
      {modalVisible && (
        <ModalWindow setVisible={showModal}>
          <View style={styles.modal}>
            <Text> Are you shure, you want to delete post?</Text>
            <TouchableOpacity><Text>Yes</Text></TouchableOpacity>
            <TouchableOpacity><Text>No</Text></TouchableOpacity>
          </View>
        </ModalWindow>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    marginBottom: 32,
  },

  photo: {
    borderRadius: 8,
    width: "100%",
    height: 240,
  },
  title: {
    marginTop: 8,
    fontWeight: "500",
    fontSize: 16,
    lineHeight: 19,
    color: "#212121",
  },
  leftSideIcons: {
    disply: "flex",
    flexDirection: "row",
    gap: 24,
  },

  bottomContainer: {
    marginTop: 8,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  barLeft: {
    display: "flex",
    flexDirection: "row",
    alignItems: "flex-end",
  },
  barLeftText: {
    color: "#BDBDBD",
    fontFamily: "Roboto",
    fontWeight: "400",
    fontSize: 16,
    lineHeight: 19,
  },
  barRight: {
    display: "flex",
    flexDirection: "row",
    alignItems: "flex-end",
  },
  barRightText: {
    color: "#212121",
    fontFamily: "Roboto",
    fontWeight: "400",
    fontSize: 16,
    lineHeight: 19,
    textDecorationLine: "underline",
    textAlign: "right",
  },
  messageIcon: {
    marginRight: 4,
    color: "#BDBDBD",
    transform: [{ rotateY: "-180deg" }],
  },
  thumbUpIcon: {
    marginRight: 6,
    color: "#BDBDBD",
  },
  pinIcon: {
    marginRight: 6,
    color: "#BDBDBD",
  },
  isRelative: {
    position: "relative",
  },
  thumbFill: { width: 24, height: 24, position: "absolute", top: 0, left: 0 },
  activeIcon: {
    color: "#FF6C00",
  },
  button: {
    width: "90%",
    position: "relative",
    top: 0,
    left: 20,
    marginVertical: 20,
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  cancel: {
    backgroundColor: "#F194FF",
  },
  delete: {
    backgroundColor: "#FF6C00",
  },
 
});
