import { getHeaderTitle } from "@react-navigation/elements"; // native
import { View, Text, StyleSheet } from "react-native";// native
import { Feather } from "@expo/vector-icons"; // icons

import { logOut } from "../redux/auth/thunks";// redux action
import { useDispatch } from "react-redux"; //redux

export function CreateHedder({ navigation, route, options, to }) {
  const title = getHeaderTitle(options, route.name);
  return (
    <View style={styles.hedder}>
      <Feather name="arrow-left" size={24} style={styles.icon} onPress={() => onNavigate(navigation, to)} />
      <Text style={styles.title}>{title}</Text>
    </View>
  );
}

export function PublicationsHedder({ route, options }) {
  const dispatch = useDispatch();
  const title = getHeaderTitle(options, route.name);

  return (
    <View style={styles.hedder}>
      <Text style={styles.title}>{title}</Text>
      <Feather
        name="log-out"
        size={24}
        color="#BDBDBD"
        onPress={() => {
          dispatch(logOut())
        }}
        style={styles.exitBtn}
      />
    </View>
  );
}

function onNavigate(navigation, to) {
  if (to === "User") return navigation.navigate("User");
  if (to === "back") return navigation.goBack();
  else return navigation.navigate("Publications");
}

const styles = StyleSheet.create({
  hedder: {
    backgroundColor: "#ffffff",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    height: 80,
    position: "relative",
    paddingTop: 30,
    borderBottomWidth: 1,
    borderBottomColor: "#b3b3b3",
  },
  icon: {
    marginLeft: 16,
    color: "#212121",
    position: "absolute",
    left: 8,
    bottom: 12,
  },
  title: {
    fontFamily: "Roboto",
    fontWeight: 500,
    fontSize: 20,
    lineHeight: 22,
    textAlign: "center",
    letterSpacing: -0.408,
    color: "#212121",
  },
  exitBtn: {
    marginLeft: 16,
    color: "#BDBDBD",
    position: "absolute",
    right: 16,
    bottom: 12,
  },
});
