import { StyleSheet, View } from "react-native";
import { MotiView } from "moti";
import { Skeleton } from "moti/skeleton";

const colorMode = "light";
const colors = ["#dbdbdb", "#ece9dfab"];

export const Spacer = ({ height = 32 }) => <MotiView style={{ height }} />;

const PostCard = () => (
  <MotiView style={styles.container}>
    <Skeleton colorMode={colorMode} width={"100%"} height={240} colors={colors} />
    <Spacer height={91}/>
  </MotiView>
);
const UserBarPlaceholder = () => {
  return (
    <MotiView style={styles.fullView}>
      <PostCard />
      <PostCard />
      <PostCard />
      <PostCard />
    </MotiView>
  );
};

export default UserBarPlaceholder;

const styles = StyleSheet.create({
  container: {
    justifyContent: "flex-start",
    paddingHorisontal: 16,
  },
  fullView: {
    flex: 1,
  },
  flexCentered: {
    display: "flex",
    flexDirection: "row",
    gap: 4,
    alignItems: "flex-end",
  },
  bottomContainer: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    gap: 8,
    alignItems: "flex-start",
    justifyContent: "space-between",
  },
  userBar: {
    width: 300,
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
