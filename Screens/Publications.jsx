import { ScrollView, View, StyleSheet } from "react-native";
import UserTab from "../Components/UserTab";
import Card from "../Components/Card";

export default Publications = () => {
  return (
    <ScrollView vertical={true} automaticallyAdjustContentInsets={false}>
      <View style={styles.container}>
        <UserTab />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    flex: 1,
    display: "flex",
    alignItems: "flex-start",
    paddingHorizontal: 16,
    paddingVertical: 32,
    gap: 16,
    backgroundColor: "#FFFFFF",
  },
});
