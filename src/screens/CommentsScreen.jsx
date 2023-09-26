import { View, StyleSheet, SafeAreaView, TextInput, Image, TouchableOpacity, FlatList, Keyboard } from "react-native"; //native
import { useFetchCommentsQuery, useAddCommentMutation } from "../redux/posts/posts";//redux
import { useState, useEffect } from "react"; //react

import CommentCard from "../components/CommentCard"; //components
import  showToast  from "../utils/showToast";// toast
import { Feather } from "@expo/vector-icons"; //icons

import commentCreator from "../utils/commentCreator"; //utils
import { auth } from "../../config";//firebase

 const  CommentsScreen = (data) => {
  const { params } = data.route;
  const photo = params.image;
  const postId = params.postId;
  const user = auth.currentUser;
  const { data: comments, refetch, isFetching } = useFetchCommentsQuery(postId);
  const [addComment, { isSuccess}] = useAddCommentMutation();

  const [comment, setComment] = useState(null);
  const [commentsList, setCommentsList] = useState(params.comments);
  const [isFocused, setIsFocused] = useState(false);

  useEffect(() => {
    isSuccess && comments && setCommentsList(comments);
  }, [comments, isSuccess]);

  const handleAddComment = async () => {
    Keyboard.dismiss();
    const commentItem = commentCreator({ comment, ...user });
    await addComment({ commentItem, postId });
    refetch();
    setComment("");
    showToast({type: "info", message: "comment successfully added"})
  };

  return (
    <SafeAreaView style={styles.box}>
      <FlatList
        ListHeaderComponent={<Image source={{ uri: `${photo}` }} style={styles.photo} />}
        ListHeaderComponentStyle={styles.hedder}
        data={commentsList}
        renderItem={({ item }) => <CommentCard data={item} />}
        keyExtractor={item => item.id}
        ref={ref => (this.flatList = ref)}
        onContentSizeChange={() => {
          if (commentsList?.length > 0) this.flatList.scrollToEnd({ animated: true });
        }}
        ListEmptyComponent={<View />}
        refreshing={isFetching}
        onRefresh={refetch}
        showsVerticalScrollIndicator ={false}
        showsHorizontalScrollIndicator={false}
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

export default CommentsScreen;

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
