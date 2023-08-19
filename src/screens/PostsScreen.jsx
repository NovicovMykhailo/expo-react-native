import { SafeAreaView, StyleSheet, FlatList, ScrollView, View } from "react-native"; //react-native
import { useState, useCallback } from "react"; //react
import { useFocusEffect } from "@react-navigation/native"; //react-navigation'

import toast from "../utils/toast";

import UserTab from "../components/UserTab"; // Components
import Card from "../components/Card"; // Components
import PostsPlaceholder, { Spacer } from "../components/PlaceHolders/PostsPlaceholder"; // Components
import UserBarPlaceholder from "../components/PlaceHolders/UserBarPlaceholder"; // Components

import * as DB_API from "../db/api"; // POSTS_DB_API

export default PostsScreen = () => {
  const [posts, setPosts] = useState([]);
  const [isFetching, setIsFetching] = useState(true);

  useFocusEffect(
    useCallback(() => {
      (async () => {
        if (posts.length === 0) setIsFetching(true);
        const data = await DB_API.getPosts();
        // как то сравнить массивы
        if (posts !== data) setPosts(data);
        if (posts) setIsFetching(false);
      })();
    }, []),
  );

  return (
    <SafeAreaView style={styles.container}>
      {isFetching && (
        <ScrollView>
          <Spacer height={32} />
          <UserBarPlaceholder />
          <Spacer />
          <Spacer />
          <PostsPlaceholder />
        </ScrollView>
      )}
      {!isFetching && (
        <FlatList
          ListHeaderComponent={<UserTab />}
          ListHeaderComponentStyle={styles.hedder}
          data={posts}
          renderItem={({ item }) => <Card data={item} />}
          keyExtractor={item => item.id}
        />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    paddingHorizontal: 16,
    paddingTop: 32,
    backgroundColor: "#FFFFFF",
  },
  hedder: {
    marginBottom: 32,
  },
});
