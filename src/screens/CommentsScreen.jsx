import { View, StyleSheet, SafeAreaView, TextInput, Image, TouchableOpacity, FlatList } from "react-native"; //native
import { Feather } from "@expo/vector-icons"; //native
import { useState, useEffect } from "react"; //react

import * as DB_API from "../db/api";

import toast from "../utils/toast";

import commentCreator from "../utils/commentCreator"; //utils
import CommentCard from "../components/CommentCard"; //components
import { auth } from "../../config";

export default function CommentsScreen(data) {
  const [comment, setComment] = useState(null);
  const [commentsList, setCommentsList] = useState(null);
  const [isFocused, setIsFocused] = useState(false);
  const { params } = data.route;
  const photo = params.image;
  const postId = params.postId;
  const user = auth.currentUser;

  useEffect(() => {
    setCommentsList(params.comments);
  }, []);



  async function handleAddComment() {
    const commentItem = commentCreator({ comment, ...user });
    await DB_API.addComment({ commentItem, postId });
    const res = await DB_API.getComments(postId);
    toast.info({ message: "comment added" });
    setComment("");
    setCommentsList(res);
  }


  return (
    <SafeAreaView style={styles.box}>
      <FlatList
        ListHeaderComponent={<Image source={{ uri: `${photo}` }} style={styles.photo} />}
        ListHeaderComponentStyle={styles.hedder}
        data={commentsList}
        renderItem={({ item }) => <CommentCard data={item} />}
        keyExtractor={item => item.id}
        ref={ref => this.flatList = ref}
        onContentSizeChange={() => {
          if(commentsList?.length > 0) this.flatList.scrollToEnd({animated: true})          
        }}
        ListEmptyComponent={<View/>}
  

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
