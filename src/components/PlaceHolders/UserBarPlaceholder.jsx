import { StyleSheet, View } from "react-native";// native
import { Skeleton } from "moti/skeleton"; //Moti
import { MotiView } from "moti"; // Moti


const colorMode = "light";
const colors = [ "#dbdbdb", "#ece9dfab"]

const UserBar = () => (
  <MotiView style={styles.userBar}>
    <Skeleton colorMode={colorMode} radius={16} height={60} width={60} colors={colors}/>
    <View style={styles.userBarTextContainer}>
      <Skeleton colorMode={colorMode} width={150} height={15} styles={{ marginBottom: 15 }} radius={4} colors={colors}/>
      <Skeleton colorMode={colorMode} width={100} height={15} radius={4} colors={colors}/>
    </View>
  </MotiView>
);

const UserBarPlaceholder = () => {
  return (
    <MotiView style={{width:"100%"}}>
      <UserBar />
    </MotiView>
  );
};

export default UserBarPlaceholder;

const styles = StyleSheet.create({
  userBar: {
    width: 300,
    height: 20,
    display: "flex",
    flexDirection: "row",
    gap: 8,
    alignItems: "center",
  },
  userBarTextContainer: {
    width: 300,
    display: "flex",
    flexDirection: "column",
    gap: 8,
    alignItems: "flex-start",
  },
});
