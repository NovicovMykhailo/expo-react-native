import { View, StyleSheet, SafeAreaView, TextInput, Image, TouchableOpacity, FlatList } from "react-native";
import { Feather } from "@expo/vector-icons";

import CommentCard from "../components/CommentCard";

export default function CommentsScreen(data) {
  const { params } = data.route;
  const photo = params.image;
  const comments = params.comments;

  return (
    <SafeAreaView style={styles.box}>
      <FlatList
        ListHeaderComponent={<Image source={{ uri: `${photo}` }} style={styles.photo} />}
        ListHeaderComponentStyle={styles.hedder}
        data={comments}
        renderItem={({ item }) => (
          <CommentCard data={item} />
        )}
        keyExtractor={item => item.id}
      />
      <View style={styles.footer}>
        <TextInput placeholder="Коментувати..." style={styles.input} />
        <TouchableOpacity style={styles.upBtn}>
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
});
