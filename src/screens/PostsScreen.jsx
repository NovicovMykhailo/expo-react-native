import { SafeAreaView, StyleSheet, FlatList } from "react-native";

import UserTab from "../components/UserTab";
import Card from "../components/Card";

import { UserData, Auth } from "../store/test/StoreSampleTest.json";


export default PostsScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        ListHeaderComponent={<UserTab data={Auth} />}
        ListHeaderComponentStyle={styles.hedder}
        data={UserData.posts}
        renderItem={({ item }) => (
          <Card
            title={item.title}
            image={item.image}
            location={item.location}
            comments={item.comments}
            coords={item.coords}
          />
        )}
        keyExtractor={item => item.id}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    paddingHorizontal: 16,
    paddingTop: 32,
    backgroundColor: "#FFFFFF",
  },
  hedder: {
    marginBottom: 32,
  },
});
