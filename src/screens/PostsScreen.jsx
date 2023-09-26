import { SafeAreaView, StyleSheet, FlatList, ScrollView } from "react-native"; //react-native
import { useFetchPostsQuery } from "../redux/posts/posts"; // redux
import { useFocusEffect } from "@react-navigation/native";//native
import { useCallback } from "react";//react

import PostsPlaceholder, { Spacer } from "../components/PlaceHolders/PostsPlaceholder"; // Components
import UserBarPlaceholder from "../components/PlaceHolders/UserBarPlaceholder"; // Components
import UserTab from "../components/UserTab"; // Components
import Card from "../components/Card"; // Components
import showToast from "../utils/showToast"; // toast


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
          renderItem={({ item }) => <Card item={item} />}
          keyExtractor={item => item.id}
          onRefresh={refetch}
          refreshing={isLoading}
          showsVerticalScrollIndicator ={false}
          showsHorizontalScrollIndicator={false}
        />
      )}
      { error && showToast({type: "error", message:`${error}`})}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    gap: 32,
    paddingHorizontal: 16,
    paddingTop: 32,
    backgroundColor: "#FFFFFF",
  },
  hedder: {
    marginBottom: 32,
  },
});
