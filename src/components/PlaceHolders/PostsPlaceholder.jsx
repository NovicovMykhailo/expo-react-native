import { StyleSheet, View } from "react-native";
import { MotiView } from "moti";
import { Skeleton } from "moti/skeleton";

const colorMode = "light";

const Spacer = ({ height = 32 }) => <MotiView style={{ height }} />;
const UserBar = () => (
  <MotiView style={styles.userBar}>
    <Skeleton colorMode={colorMode} radius={16} height={60} width={60} />
    <View style={styles.userBarTextContainer}>
      <Skeleton colorMode={colorMode} width={150} height={15} styles={{ marginBottom: 15 }} radius={4} />
      <Skeleton colorMode={colorMode} width={100} height={15} radius={4} />
    </View>
  </MotiView>
);
const PostCard = () => (
  <MotiView style={styles.container}>
    <Spacer />
    <Skeleton colorMode={colorMode} width={"100%"} height={240} />
    <Spacer height={8} />
    <Skeleton colorMode={colorMode} width={172} height={18} radius={4} />
    <Spacer height={8} />
    <View style={styles.bottomContainer}>
      <View style={styles.flexCentered}>
        <Skeleton colorMode={colorMode} width={24} height={24} radius={"round"} />
        <Skeleton colorMode={colorMode} width={24} height={16} radius={4} />
      </View>
      <View style={styles.flexCentered}>
        <Skeleton colorMode={colorMode} width={24} height={24} radius={"round"} />
        <Skeleton colorMode={colorMode} width={200} height={16} radius={4} />
      </View>
    </View>
  </MotiView>
);

const UserBarPlaceholder = () => {
  return (
    <MotiView style={styles.fullView}>
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
