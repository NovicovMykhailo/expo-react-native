import {
  View,
  StyleSheet,
  ImageBackground,
  SafeAreaView,
  StatusBar,
  ScrollView,
  Text,
  TouchableOpacity,
} from "react-native";
import { Feather } from "@expo/vector-icons";

import image from "../assets/Photo_BG2x.png";
import UserPhoto from "../components/UserPhoto";
import StoryCard from "../components/StoryCard";
import { useNavigation } from "@react-navigation/native";

import { UserData, Auth } from "../store/test/StoreSampleTest.json";
const DATA = UserData.posts;
const { name, avatar } = Auth;

export default ProfileScreen = () => {
  return (
    <SafeAreaView>
      <StatusBar hidden={true} />
      <ImageBackground source={image} style={styles.image} />
      <View>
        <ScrollView>
          <View style={styles.view}>
            <View>
              <UserPhoto photo={avatar} />
              <ExitBtn />
              <Text style={styles.Name}>{name}</Text>
            </View>
            {DATA.map(item => (
              <StoryCard key={item.id} item={item} />
            ))}
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

function ExitBtn() {
  const navigation = useNavigation();
  return (
    <TouchableOpacity>
      <Feather name="log-out" size={24} style={styles.exitBtn} onPress={() => navigation.navigate("Login")} />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  image: {
    resizeMode: "cover",
    height: 900,
    flex: 1,
  },
  Name: {
    fontFamily: "Roboto",
    fontWeight: 500,
    fontSize: 30,
    lineHeight: 35,
    textAlign: "center",
    letterSpacing: 0.01,
    color: "#212121",

    marginTop: -32,
  },
  view: {
    marginTop: 163,
    minHeight: 450,
    backgroundColor: "#ffffff",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    paddingTop: 0,
    paddingHorizontal: 16,
    paddingBottom: 43,
    gap: 32,
  },
  exitBtn: {
    position: "absolute",
    right: 0,
    top: -100,
    color: "#BDBDBD",
  },
});
