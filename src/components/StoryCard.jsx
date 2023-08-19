import { View, Image, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Feather } from "@expo/vector-icons";
import { useState, useEffect } from "react";
import * as DB_API from "../db/api";

import { getAuth } from "firebase/auth";

//redux

export default function StoryCard({ item }) {
  const { image, title, location, comments, coords, likes: likesProps, id: postId } = item;
  const [wasLiked, setWasLiked] = useState(true);
  const [likes, setLikes] = useState(likesProps);

  const navigation = useNavigation();
  const auth = getAuth();
 

  useEffect(() => {
    const { uid } = auth.currentUser;

    const liked = likes.find(like => like === uid);
    setWasLiked(Boolean(liked));
  }, [likes, handleLikes]);

  async function handleLikes() {
    const { uid } = auth.currentUser;
    
    let refreshedLikes;

    const index = likes.indexOf(uid);
    if (index === -1) {
      DB_API.addLike({ postId, uid });
      refreshedLikes = await DB_API.getLikes(postId);
      setLikes(refreshedLikes);
    } else {
      DB_API.removeLike({ postId, uid });
      refreshedLikes = await DB_API.getLikes(postId);
      setLikes(refreshedLikes);
    }
  }

  return (
    <TouchableOpacity style={styles.container} disabled={true}>
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
            <TouchableOpacity style={styles.isRelative} onPress={() => handleLikes()}>
              {wasLiked && likes.length > 0 && (
                <Image source={require("./../assets/thumbsUpGg.png")} style={styles.thumbFill} />
              )}
              <Feather name="thumbs-up" size={24} style={[styles.thumbUpIcon, likes.length > 0 && styles.activeIcon]} />
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
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
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
});
