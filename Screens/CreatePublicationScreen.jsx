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
  ImageBackground,
  Image,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

import * as Location from "expo-location";

import { Feather } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { Camera } from "expo-camera";
import Spinner from "../Components/Spinner";
import * as MediaLibrary from "expo-media-library";

export default CreatePublicationScreen = () => {
  const [photo, setPhoto] = useState(null);
  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("");
  const [geoposition, setGeoposition] = useState("");

  const [hasPermission, setHasPermission] = useState(null);
  const [cameraRef, setCameraRef] = useState(null);
  const [type, _] = useState(Camera.Constants.Type.back);

  const [showLoader, setShowLoader] = useState(false);

  const navigation = useNavigation();

  const isBtnDisabled = !(!!title && !!location && !!photo);
  const isActive = Boolean(title || location || photo);

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

    return () => setPhoto(null);
  }, []);
  //find geolication
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
      setGeoposition(coords);
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

  const rePhoto = () => {
    setPhoto(null);
  };

  const makePhoto = async () => {
    setShowLoader(true);
    const { uri } = await cameraRef.takePictureAsync();
    const asset = await MediaLibrary.createAssetAsync(uri);
    setPhoto(asset);
    setShowLoader(false);
  };

  //submiting
  const HandleSubmit = async () => {
    if (title && location && photo) {
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
      // console.log({ title, location, photo, geoposition });
      setPhoto(null);
      setTitle("");
      setLocation("");
    }
  };
  //deleating
  const onDelete = () => {
    setPhoto(null);
    setTitle("");
    setLocation("");
  };

  return (
    <View style={styles.container}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContainer}>
          <View style={styles.inner}>
            {!hasPermission && !photo && (
              <View style={styles.photoBar}>
                <View style={styles.PhotoButton}>
                  <Ionicons name="md-camera-sharp" size={24} style={styles.photoIcon} />
                </View>
              </View>
            )}
            {hasPermission && (
              <View style={styles.photoBar}>
                {!photo && (
                  <Camera style={styles.camera} type={type} ref={setCameraRef}>
                    {showLoader && <Spinner />}
                    {!showLoader && (
                      <TouchableOpacity
                        style={[styles.PhotoButton, styles.light]}
                        onPress={async () => {
                          if (cameraRef) makePhoto();
                        }}
                      >
                        <Ionicons name="md-camera-sharp" size={24} style={styles.photoIcon} />
                      </TouchableOpacity>
                    )}
                  </Camera>
                )}
                {photo && (
                  <View style={styles.photoBar}>
                    <ImageBackground source={photo} style={styles.photo}>
                      <TouchableOpacity
                        style={[styles.PhotoButton, styles.light]}
                        onPress={async () => {
                          if (cameraRef) makePhoto();
                        }}
                      >
                        <Ionicons name="md-camera-sharp" size={24} style={styles.photoIcon} />
                      </TouchableOpacity>
                    </ImageBackground>
                  </View>
                )}
              </View>
            )}

            <View style={styles.decriptionContainer} onPress={rePhoto}>
              <Text style={styles.decriptionText}>{photo ? "Редагувати фото" : "Завантажте фото"}</Text>
            </View>
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
                requiered
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
        <TouchableOpacity style={[styles.trashBtn, isActive && styles.trashBtnPresed]} onPress={onDelete}>
          <Feather name="trash-2" size={24} style={[styles.icon, isActive && styles.iconPresed]} />
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
    alignItems: "center",
    justifyContent: "center",
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
  decriptionContainer: {
    marginTop: 8,
  },
  decriptionText: {
    fontSize: 16,
    lineHeight: 19,
    fontFamily: "Roboto",
    color: "#BDBDBD",
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
