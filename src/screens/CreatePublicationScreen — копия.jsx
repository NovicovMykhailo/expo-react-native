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
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

import * as Location from "expo-location";

import { Feather } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { Camera } from "expo-camera";
import Spinner from "../components/Spinner";
import * as MediaLibrary from "expo-media-library";

export default CreatePublicationScreen = () => {
  const [photo, setPhoto] = useState(null);
  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("");
  const [geoposition, setGeoposition] = useState("");
  const [isFocused, setIsFocused] = useState(null);
  const [showLoader, setShowLoader] = useState(false);

  const [hasPermission, setHasPermission] = useState(null);
  const [cameraRef, setCameraRef] = useState(null);
  const [type, _] = useState(Camera.Constants.Type.back);

  const navigation = useNavigation();
  const isBtnDisabled = !!!photo;
  const isActive = Boolean(title || location || photo);

  //camera init
  useEffect(() => {
    setPhoto(null);

    (async () => {
      try {
        checkCameraPermission();
      } catch (error) {
        setHasPermission(null);
        Alert.alert(`${error}`);
      }
    })();

    return () => setPhoto(null);
  }, []);
  //Search for  geolication
  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        Alert.error("Message: ", "Permission to access location was denied");
      }
      let foundLocation = await Location.getCurrentPositionAsync();

      const coords = {
        latitude: foundLocation.coords.latitude,
        longitude: foundLocation.coords.longitude,
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
  //Make Photo

  const makePhoto = async () => {
    setShowLoader(true);

    try {
      const { uri } = await cameraRef.takePictureAsync();
      const asset = await MediaLibrary.createAssetAsync(uri);
      setPhoto(asset);
    } catch (error) {
      Alert.alert("Attantion", `${error.message}`);
      setShowLoader(false);
    } finally {
      setShowLoader(false);
    }
  };
  //submiting
  const HandleSubmit = async () => {
    if (photo) {
      Alert.alert(
        "FormData: ",
        `• Title:  ${title ? title : null};\n• Location:  ${location ? location : null};\n• Photo: ${
          photo ? `[object]` : "none"
        };\n• Geoposition:\n    - Latitude: ${geoposition.latitude},\n    - Longitude: ${geoposition.longitude} `,
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
            {/* photoBar */}
            {!hasPermission && (
              <View style={styles.photoBar}>
                <View style={styles.photoButton}>
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
                        style={[styles.photoButton, styles.light]}
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
                  <ImageBackground source={photo} style={styles.photo}>
                    <TouchableOpacity
                      style={[styles.photoButton, styles.light]}
                      onPress={() => {
                        setPhoto(null);
                      }}
                    >
                      <Ionicons name="md-camera-sharp" size={24} style={styles.photoIcon} />
                    </TouchableOpacity>
                  </ImageBackground>
                )}
              </View>
            )}
            {/* photobar description */}
            <View style={styles.decriptionContainer}>
              <Text style={styles.decriptionText}>{photo ? "Редагувати фото" : "Завантажте фото"}</Text>
            </View>
            {/* inputs */}
            <TextInput
              style={[styles.title, isFocused === "name" && styles.activeField]}
              placeholder="Назва..."
              placeholderTextColor="#BDBDBD"
              value={title}
              onChangeText={setTitle}
              onFocus={() => setIsFocused("name")}
              onBlur={() => setIsFocused(null)}
            />
            <View style={[styles.location, isFocused === "location" && styles.activeField]}>
              <Feather
                name="map-pin"
                size={24}
                style={[styles.pinIcon, isFocused === "location" && styles.activeIcon]}
              />
              <TextInput
                style={styles.locationIn}
                placeholder="Місцевість..."
                placeholderTextColor="#BDBDBD"
                value={location}
                onChangeText={setLocation}
                onFocus={() => setIsFocused("location")}
                onBlur={() => setIsFocused(null)}
              />
            </View>
            {/* buttons */}
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
    width: "100%",
    aspectRatio: "3/4",
  },
  photo: {
    width: "100%",
    stretched: "false",
    height: 240,
    resizeMode: "cover",
    alignItems: "center",
    justifyContent: "center",
  },

  photoButton: {
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
    paddingVertical: 16,
    paddingHorizontal: 32,
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
  activeField: {
    borderColor: "#FF6C00",
    color: "#212121",
  },
  activeIcon: { color: "#FF6C00" },
});
