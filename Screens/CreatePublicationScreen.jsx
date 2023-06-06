import {
  View,
  Text,
  TouchableWithoutFeedback,
  Keyboard,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";

export default CreatePublicationScreen = () => {
  const [isBtnDisabled, setIsBtnDisabled] = useState(true);
  const [photo, setPhoto] = useState(null);
  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("");

  const [presed, setPresed] = useState(false);

  const navigation = useNavigation();

  useEffect(() => {
    if (title !== "" && location !== "") {
      setIsBtnDisabled(false);
    } else {
      setIsBtnDisabled(true);
    }
  }, [title, location]);

  const HandleSubmit = () => {
    Alert.alert("FormData: ", `title:  ${title};  location:  ${location}; photo: ${photo}`, [
      {
        text: "OK",
        onPress: () => navigation.navigate("Publications"),
      },
    ]);
    setPresed(prev => !prev);
    setTitle("");
    setLocation("");
  };

  const onDelete = () => {
    Alert.alert("Deleted", "", [{ text: "OK", onPress: () => navigation.navigate("Publications") }]);

    setPresed(prev => !prev);
    setTimeout(() => {
      setPresed(false);
    }, 200);
  };

  return (
    <View style={styles.container}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView style={styles.scrollView}>
          <View style={styles.inner}>
            <View style={styles.photoBar}>
              <TouchableOpacity style={styles.PhotoButton}>
                <Ionicons name="md-camera-sharp" size={24} style={styles.photoIcon} />
              </TouchableOpacity>
            </View>
            <Text style={styles.decription}>Завантажте фото</Text>
            <TextInput
              style={styles.title}
              placeholder="Назва..."
              placeholderTextColor="#BDBDBD"
              value={title}
              onChangeText={setTitle}
            />
            <View style={styles.location}>
              <Feather name="map-pin" size={24} style={styles.pinIcon} />
              <TextInput
                placeholder="Місцевість..."
                placeholderTextColor="#BDBDBD"
                style={styles.locationIn}
                value={location}
                onChangeText={setLocation}
              />
            </View>
            <TouchableOpacity
              style={[styles.btn, isBtnDisabled && styles.active]}
              disabled={isBtnDisabled}
              onPress={HandleSubmit}
            >
              <Text style={[styles.btnText, isBtnDisabled && styles.btnTextActive]}>Опубліковати</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </TouchableWithoutFeedback>
      <View style={styles.trashBtnContainer}>
        <TouchableOpacity style={[styles.trashBtn, presed && styles.trashBtnPresed]} onPress={onDelete}>
          <Feather name="trash-2" size={24} style={[styles.icon, presed && styles.iconPresed]} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-between",
  },
  inner: {
    height: "100%",
    width: "100%",
    paddingHorizontal: 16,
    paddingTop: 32,
    flex: 1,

    backgroundColor: "#FFFFFF",
  },
  scrollView: {
    width: "100%",
  },
  photoBar: {
    width: "100%",
    height: 240,
    backgroundColor: "#F6F6F6",
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: "#E8E8E8",
  },
  PhotoButton: {
    borderRadius: 30,
    width: 60,
    height: 60,
    backgroundColor: "#ffffff4d",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  decription: {
    fontSize: 16,
    lineHeight: 19,
    fontFamily: "Roboto",
    color: "#BDBDBD",
    marginTop: 8,
  },
  title: {
    height: 50,
    fontFamily: "Roboto",
    fontWeight: "400",
    fontSize: 16,
    lineHeight: 19,
    borderBottomWidth: 1,
    borderColor: "#E8E8E8",
    paddingVertical: 16,
    marginTop: 32,
  },
  location: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    height: 50,
    borderBottomWidth: 1,
    borderColor: "#E8E8E8",

    marginTop: 32,
  },
  locationIn: {
    fontFamily: "Roboto",
    fontWeight: "400",
    fontSize: 16,
    lineHeight: 19,
    paddingVertical: 16,
    marginBottom: -4,
  },
  btn: {
    backgroundColor: "#FF6C00",

    borderRadius: 100,
    paddingTop: 16,
    paddingBottom: 16,
    paddingLeft: 32,
    paddingRight: 32,
    marginTop: 32,
    display: "flex",
    alignItems: "center",
  },
  active: { backgroundColor: "#E8E8E8" },
  btnText: {
    fontWeight: "400",
    fontSize: 16,
    lineHeight: 19,
    color: "#FFFFFF",
  },
  btnTextActive: {
    color: "#BDBDBD",
  },
  trashBtnContainer: {
    display: "flex",
    justifyContent: "center",
    overflow: "hidden",
    backgroundColor: "white",
    alignItems: "center",
    width: "100%",
    paddingTop: 10,
    paddingBottom: 10,
  },
  trashBtn: {
    width: 70,
    height: 40,
    backgroundColor: "#F6F6F6",
    borderRadius: 20,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  icon: {
    color: "#BDBDBD",
  },
  trashBtnPresed: {
    backgroundColor: "#FF6C00",
  },
  iconPresed: {
    color: "white",
  },
  pinIcon: { marginRight: 10, color: "#BDBDBD" },
  photoIcon: { color: "#BDBDBD" },
});
