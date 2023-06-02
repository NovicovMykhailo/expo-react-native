import {
  View,
  Text,
  TouchableWithoutFeedback,
  Keyboard,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { useEffect, useState } from "react";

export default CreatePublication = () => {
  const [isBtnDisabled, setIsBtnDisabled] = useState(true);
  const [photo, setPhoto] = useState(null);
  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("");

  const [presed, setPresed] = useState(false);

  useEffect(() => {
    if ((title && location !== "") || photo !== null) setIsBtnDisabled(prev => !prev);
    setIsBtnDisabled(true);
  }, [title, location, photo]);

  return (
    <View style={styles.container}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView style={{ width: "100%" }}>
          <View style={styles.inner}>
            <View style={styles.photoBar}>
              <TouchableOpacity style={styles.PhotoButton}>
                <Ionicons name="md-camera-sharp" size={24} color="#BDBDBD" />
              </TouchableOpacity>
            </View>
            <Text style={styles.decription}>Завантажте фото</Text>
            <TextInput
              style={styles.title}
              placeholder="Назва..."
              placeholderTextColor="#BDBDBD"
              value={title}
              onTextInput={setTitle}
            />
            <View style={styles.location}>
              <Feather name="map-pin" size={24} color="#BDBDBD" style={{ marginRight: 10 }} />
              <TextInput
                placeholder="Місцевість..."
                placeholderTextColor="#BDBDBD"
                style={styles.locationIn}
                value={location}
                onTextInput={setLocation}
              />
            </View>
            <TouchableOpacity style={isBtnDisabled ? styles.btn : styles.btnEnabled} disabled={isBtnDisabled}>
              <Text style={isBtnDisabled ? styles.btnText : styles.btnTextEnabled}>Опубліковати</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </TouchableWithoutFeedback>
      <View style={styles.trashBtnContainer}>
        <TouchableOpacity
          style={presed ? styles.trashBtn : styles.trashBtnPresed}
          onPress={() => setPresed(prev => !prev)}
        >
          <Feather name="trash-2" size={24} style={presed ? styles.icon : styles.iconPresed} />
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
    backgroundColor: "#E8E8E8",
    borderRadius: 100,
    paddingTop: 16,
    paddingBottom: 16,
    paddingLeft: 32,
    paddingRight: 32,
    marginTop: 32,
    display: "flex",
    alignItems: "center",
  },
  btnEnabled: {
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
  btnText: {
    fontWeight: "400",
    fontSize: 16,
    lineHeight: 19,
    color: "#BDBDBD",
  },
  btnTextEnabled: {
    fontWeight: "400",
    fontSize: 16,
    lineHeight: 19,
    color: "#FFFFFF",
  },
  trashBtnContainer: {
    display: "flex",
    justifyContent: "center",
    overflow: "hidden",
    backgroundColor: "white",
    alignItems: "center",
    width: "100%",
    paddingTop: 20,
    paddingBottom: 20,
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
    width: 70,
    height: 40,
    backgroundColor: "#FF6C00",
    borderRadius: 20,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  iconPresed: {
    color: "white",
  },
});
