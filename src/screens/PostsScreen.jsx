import { SafeAreaView, StyleSheet, FlatList, ScrollView } from "react-native"; //react-native
import { useFetchPostsQuery } from "../services/posts";

import toast from "../utils/toast";

import UserTab from "../components/UserTab"; // Components
import Card from "../components/Card"; // Components
import PostsPlaceholder, { Spacer } from "../components/PlaceHolders/PostsPlaceholder"; // Components
import UserBarPlaceholder from "../components/PlaceHolders/UserBarPlaceholder"; // Components

import { useFocusEffect } from "@react-navigation/native";
import { useCallback } from "react";

export default PostsScreen = () => {
  const { data, error, refetch, isLoading } = useFetchPostsQuery();
  useFocusEffect(useCallback(() => () => !isLoading && refetch(), []));

  return (
    <SafeAreaView style={styles.container}>
      {isLoading && (
        <ScrollView>
          <Spacer height={32} />
          <UserBarPlaceholder />
          <Spacer />
          <Spacer />
          <PostsPlaceholder />
        </ScrollView>
      )}
      {!isLoading && (
        <FlatList
          ListHeaderComponent={<UserTab />}
          ListHeaderComponentStyle={styles.hedder}
          data={data}
          renderItem={({ item }) => <Card data={item} />}
          keyExtractor={item => item.id}
          onRefresh={refetch}
          refreshing={isLoading}
        />
      )}
      { error && toast.error({ message: `${error}` })}
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
