import { SafeAreaView, StyleSheet, FlatList } from "react-native";//react-native
import { useCallback } from "react";//react
import { useFocusEffect} from '@react-navigation/native'//react-navigation

import UserTab from "../components/UserTab";// Components
import Card from "../components/Card";// Components

import { reverseData } from "../utils/formating";//utils

import { useSelector, useDispatch } from "react-redux"; //redux
import { getAllPosts } from "../redux/posts/postsSlice";//redux
import { selectAllPosts } from "../redux/posts/selectors";//redux


import { Auth } from "../store/test/StoreSampleTest.json";//demo data

export default PostsScreen = () => {
  const dispatch = useDispatch();
  const data = useSelector(selectAllPosts);


  useFocusEffect(useCallback(() => {
    if (data.length === 0) {
      dispatch(getAllPosts());
    }
  }));




  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        ListHeaderComponent={<UserTab/>}
        ListHeaderComponentStyle={styles.hedder}
        data={reverseData(data)}
        renderItem={({ item }) => <Card data={item} />}
        keyExtractor={item => item.id}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex:1,
    width: "100%",
    paddingHorizontal: 16,
    paddingTop: 32,
    backgroundColor: "#FFFFFF",
  },
  hedder: {
    marginBottom: 32,
  },
});
