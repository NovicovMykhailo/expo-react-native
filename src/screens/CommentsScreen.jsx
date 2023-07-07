import { View, StyleSheet, ScrollView, TextInput, Image, TouchableOpacity } from "react-native";
import { Feather } from "@expo/vector-icons";

import CommentCard from "../components/CommentCard";

export default function CommentsScreen() {
  return (
    <View style={styles.box}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.container}>
          <Image source={require("../assets/UserRect1.png")} style={styles.photo} />
          <View style={styles.commentsContainer}>
            <CommentCard name={'a'}/>
            <CommentCard name={'b'}/>
            <CommentCard name={'a'}/>
            <CommentCard name={'b'}/>
            <CommentCard name={'a'}/>
            <CommentCard name={'b'}/>
            <CommentCard name={'a'}/>
            <CommentCard name={'b'}/>
          </View>
        </View>
      </ScrollView>
      <View style={styles.footer}>
        <TextInput placeholder="Коментувати..." style={styles.input} />
        <TouchableOpacity style={styles.upBtn}>
          <Feather name="arrow-up" size={26} style={styles.icon} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  box: {
    flex: 1,
    backgroundColor: "white",
  },
  container: {
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 32,
    gap: 32,
  },
  scrollView: {
    width: "100%",
  },
  photo: {
    width: "100%",
    borderRadius: 8,
  },
  commentsContainer: {
    width: "100%",
    gap: 24,
    flex: 1,
  },
  footer: {
    padding: 16,
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
    right: 24,
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
});
