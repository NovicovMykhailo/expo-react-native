import { SafeAreaView, StyleSheet, FlatList, ScrollView, View } from "react-native"; //react-native
import { useState, useEffect } from "react"; //react

import toast from "../utils/toast";

import UserTab from "../components/UserTab"; // Components
import Card from "../components/Card"; // Components
import PostsPlaceholder, { Spacer } from "../components/PlaceHolders/PostsPlaceholder"; // Components
import UserBarPlaceholder from "../components/PlaceHolders/UserBarPlaceholder"; // Components

import * as DB_API from "../db/api"; // POSTS_DB_API
import { useFocusEffect } from "@react-navigation/native";
import { useCallback } from "react";

export default PostsScreen = data => {
  const [posts, setPosts] = useState([]);
  const [isFetching, setIsFetching] = useState(false);

  useFocusEffect(
    useCallback(() => {
      (async () => {
         await GetPosts();
      })();
    }, []),
  );

  const GetPosts = async () => {
    const data = await DB_API.getPosts();
    if (posts !== data) setPosts(data);
  };



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
          onRefresh={GetPosts}
          refreshing={isFetching}
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
