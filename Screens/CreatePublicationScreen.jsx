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
  Image,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

import * as Location from "expo-location";

import { Feather } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { Camera } from "expo-camera";
import * as MediaLibrary from "expo-media-library";

import PhotoPicker from "../Components/PhotoPicker";

export default CreatePublicationScreen = () => {
  const [isBtnDisabled, setIsBtnDisabled] = useState(true);
  const [photo, setPhoto] = useState(null);
  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("");
  const [geoposition, setGoposition] = useState("");
  const [modalVisible, setModalVisible] = useState(false);

  const [hasPermission, setHasPermission] = useState(null);
  const [cameraRef, setCameraRef] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);

  const [presed, setPresed] = useState(false);

  const navigation = useNavigation();

  //disabling button on empty lines
  useEffect(() => {
    if (title !== "" && location !== "") {
      setIsBtnDisabled(false);
    } else {
      setIsBtnDisabled(true);
    }
  }, [title, location]);
  //camera init
  useEffect(() => {
    setPhoto(null);

    (async () => {
      try {
        checkCameraPermission();
      } catch (error) {
        console.log(error);
        setHasPermission(null);
        Alert.alert(`${error}`);
      }
    })();
  }, []);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.log("Permission to access location was denied");
      }

      let location = await Location.getCurrentPositionAsync({});
      const coords = {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      };
      setGoposition(coords);
    })();
  }, []);
  //ask 4 camera permissions
  async function checkCameraPermission() {
    const { status } = await Camera.requestCameraPermissionsAsync();
    await MediaLibrary.requestPermissionsAsync().then(permission => {
      if (!permission.granted) {
        Alert.alert("Attantion", "No access to camera", [
          {
            text: "Allow Permission",
            onPress: () => checkCameraPermission,
          },
        ]);
      }
    });
    setHasPermission(status === "granted");
  }
  //showModal
  const showModal = () => {
    setModalVisible(prev => !prev);
  };

  //submit
  const HandleSubmit = async () => {

    Alert.alert(
      "FormData: ",
      `• Title:  ${title};\n• Location:  ${location};\n• Photo: ${
        photo ? `[object]` : "none"
      };\n• Goposition:\n    - Latitude: ${geoposition.latitude},\n    - Longitude: ${geoposition.longitude} `,
      [
        {
          text: "OK",
          onPress: () => navigation.navigate("Publications"),
        },
      ],
    );
    console.log({ title, location, photo, geoposition });

    setPresed(prev => !prev);
    setTitle("");
    setLocation("");
  };

  //delete publication
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
        <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContainer}>
          <View style={styles.inner}>
            {hasPermission ? (
              !photo && (
                <View style={styles.photoBar}>
                  <Camera style={styles.camera} type={type} ref={setCameraRef}>
                    <TouchableOpacity
                      style={[styles.PhotoButton, styles.light]}
                      onPress={async () => {
                        if (cameraRef) {
                          const { uri } = await cameraRef.takePictureAsync();
                          const asset = await MediaLibrary.createAssetAsync(uri);
                          setPhoto(asset);
                        }
                      }}
                    >
                      <Ionicons name="md-camera-sharp" size={24} style={styles.photoIcon} />
                    </TouchableOpacity>
                  </Camera>
                </View>
              )
            ) : (
              <View style={styles.photoBar}>
                <View style={styles.PhotoButton}>
                  <Ionicons name="md-camera-sharp" size={24} style={styles.photoIcon} />
                </View>
              </View>
            )}

            {photo && (
              <View style={styles.photoBar}>
                <Image source={photo} style={styles.photo} />
              </View>
            )}
            <TouchableOpacity style={styles.decription} onPress={() => showModal()}>
              {photo ? <Text>Редагувати фото</Text> : <Text>Завантажте фото</Text>}
            </TouchableOpacity>
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
          {modalVisible && <PhotoPicker showModal={showModal} setPhoto={setPhoto} />}
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
    paddingHorizontal: 16,
    paddingTop: 32,
    flexGrow: 1,
    backgroundColor: "#FFFFFF",
  },
  scrollView: {
    width: "100%",
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
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
    overflow: "hidden",
  },
  camera: {
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: "#E8E8E8",
    overflow: "hidden",
    width: "100%",
    aspectRatio: "3/4",
  },
  photo: {
    width: "100%",
    height: 240,
    resizeMode: "cover",
  },

  PhotoButton: {
    borderRadius: 30,
    width: 60,
    height: 60,
    backgroundColor: "#ffffff",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  light: {
    backgroundColor: "#ffffff55",
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
