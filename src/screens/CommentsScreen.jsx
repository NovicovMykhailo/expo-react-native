import { View, StyleSheet, SafeAreaView, TextInput, Image, TouchableOpacity, FlatList } from "react-native";
import { Feather } from "@expo/vector-icons";

import CommentCard from "../components/CommentCard";
import commentCreator from "../utils/commentCreator";
import { useState, useEffect } from "react";

//redux
import { useDispatch, useSelector } from "react-redux";
import { addComment } from "../redux/postsSlice";
import { selectUser } from "../redux/auth/selectors";
import { refreshUser } from "../redux/auth/slice";

export default function CommentsScreen(data) {
  const user = useSelector(selectUser);

  const [comment, setComment] = useState(null);
  const [commentsList, setCommentsList] = useState(null);
  const [isFocused, setIsFocused] = useState(false);
  const dispatch = useDispatch();
  const { params } = data.route;

  useEffect(() => {
    if (!user.name) {
      dispatch(refreshUser());
    }
    setCommentsList(params.comments);
  }, []);

  const photo = params.image;
  const postId = params.id;

  function handleAddComment() {
    const commentItem = commentCreator({ comment, ...user });
    dispatch(addComment({ commentItem, postId }));
    setCommentsList(prev => [...prev, commentItem]);
  }

  return (
    <SafeAreaView style={styles.box}>
      <FlatList
        ListHeaderComponent={<Image source={{ uri: `${photo}` }} style={styles.photo} />}
        ListHeaderComponentStyle={styles.hedder}
        data={commentsList}
        renderItem={({ item }) => <CommentCard data={item} />}
        keyExtractor={item => item.id}
      />
      <View style={styles.footer}>
        <TextInput
          placeholder="Коментувати..."
          style={[styles.input, isFocused && styles.active]}
          value={comment}
          onChangeText={setComment}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
        />
        <TouchableOpacity style={styles.upBtn} onPress={handleAddComment}>
          <Feather name="arrow-up" size={26} style={styles.icon} />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  box: {
    flex: 1,
    backgroundColor: "white",
    paddingHorizontal: 16,
    paddingTop: 32,
  },
  hedder: {
    marginBottom: 32,
  },

  photo: {
    width: "100%",
    height: 240,
    borderRadius: 8,
  },

  footer: {
    paddingVertical: 16,
    position: "relative",
  },
  input: {
    borderRadius: 100,
    borderWidth: 1,
    borderColor: "#E8E8E8",
    backgroundColor: "#F6F6F6",
    height: 50,
    padding: 16,
  },
  upBtn: {
    position: "absolute",
    bottom: 24,
    right: 8,
    backgroundColor: "tomato",
    width: 34,
    height: 34,
    borderRadius: 17,
    justifyContent: "center",
    alignItems: "center",
  },
  icon: {
    color: "white",
  },
  active: {
    backgroundColor: "#FFFFFF",
    borderColor: "#FF6C00",
    color: "#212121",
  },
});
