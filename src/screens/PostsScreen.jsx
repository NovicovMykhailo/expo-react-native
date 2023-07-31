import { SafeAreaView, StyleSheet, FlatList } from "react-native";

import UserTab from "../components/UserTab";
import Card from "../components/Card";

import { reverseData } from "../utils/formating";

import { useSelector, useDispatch } from "react-redux"; //redux
import { getAllPosts } from "../redux/postsSlice";
import { selectAllPosts } from "../redux/selectors";
import { useEffect } from "react";

import { Auth } from "../store/test/StoreSampleTest.json";

export default PostsScreen = () => {
  const dispatch = useDispatch();
  const data = useSelector(selectAllPosts);

  useEffect(() => {
    if (data.length === 0) {
      dispatch(getAllPosts());
    }
  }, []);


  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        ListHeaderComponent={<UserTab data={Auth} />}
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
