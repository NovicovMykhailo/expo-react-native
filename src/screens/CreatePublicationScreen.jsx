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
} from "react-native"; // native
import { useNavigation } from "@react-navigation/native"; // native
import Spinner from "../components/Loaders/Spinner"; //Component
import Loader from "../components/Loaders/Loader"; //Component
import { Ionicons } from "@expo/vector-icons"; // icon
import { EvilIcons } from "@expo/vector-icons"; // icon
import { Feather } from "@expo/vector-icons"; // icon

import * as MediaLibrary from "expo-media-library"; //expo
import * as Location from "expo-location"; // expo
import { Camera } from "expo-camera"; // expo

import { useAddPostMutation } from "../redux/posts/posts"; //redux
import { useEffect, useState } from "react"; // react
import { auth } from "../../config";// firebase

import imageUploadUtil from "../utils/imageUploadUtil"; //util
import postCreator from "../utils/postCreator"; //utils
import showToast from "../utils/showToast"; //utils


export default CreatePublicationScreen = () => {
  // teck states
  const [loadingStatus, setLoadingStatus] = useState("idle");
  const [geoposition, setGeoposition] = useState("");
  const [isFocused, setIsFocused] = useState(null);
  const [location, setLocation] = useState("");
  const [photo, setPhoto] = useState(null);
  const [title, setTitle] = useState("");
  //camera states
  const [hasPermission, setHasPermission] = useState(null);
  const [type, _] = useState(Camera.Constants.Type.back);
  const [cameraRef, setCameraRef] = useState(null);
  const [isVisible, setIsVisible] = useState(false);

  const [addPost] = useAddPostMutation();
  const navigation = useNavigation();

  const isBtnDisabled = !photo;
  const isActive = Boolean(title || location || photo);

  //camera init
  useEffect(() => {
    setPhoto(null);
    (async () => {
      try {
        checkCameraPermission();
      } catch (error) {
        setHasPermission(null);
        showToast({ type: "error", message: `${error.message}` });
      }
    })();
    return () => setPhoto(null);
  }, []);

  //Search for geolocation
  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        showToast({ type: "error", message: "Permission to access location was denied" });
      }
      let foundLocation = await Location.getCurrentPositionAsync();

      const coords = {
        latitude: foundLocation.coords.latitude,
        longitude: foundLocation.coords.longitude,
      };
      setGeoposition(coords);
      setIsVisible(false);
    })();
  }, []);

  //ask 4 camera permissions
  async function checkCameraPermission() {
    const { status } = await Camera.requestCameraPermissionsAsync();

    await MediaLibrary.requestPermissionsAsync().then(permission => {
      if (!permission.granted) {
        Alert.alert("Attantion", "No access to camera", [{ 
          text: "Allow Permission",
          onPress: () => checkCameraPermission 
        }])}
    });
    setHasPermission(status === "granted");
  }

  //submiting
  const HandleSubmit = async () => {
    //make post
    if (!geoposition) setIsVisible(true);
    else if (photo && geoposition) {
      setIsVisible(false);
      // uploadPhoto and get url
      const url = await imageUploadUtil(photo);
      //create post
      const post = {
        title: title ? title : null,
        location: location ? location : null,
        image: url,
        coords: geoposition,
        owner: auth?.currentUser.uid,
      };
      // add post to db
      try {
        await addPost(postCreator(post))
        showToast({ type: "info", message: "Post created successfully" });
        navigation.navigate("Publications");
      } catch (error) {
        showToast({ type: "error", message:"oops, somthing went wrong"})

      }
      // reseting Form fields
      onDelete()
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
      {isVisible && (
        <Loader setVisible={() => setIsVisible(false)}>
          <>
            <Spinner />
            <Text style={styles.message}>Waiting for coords...</Text>
          </>
        </Loader>
      )}

      <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContainer}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.inner}>
            {/* photoBar */}
            {hasPermission ? (
              !photo && (
                <View style={styles.photoBar}>
                  <Camera style={styles.camera} type={type} ref={setCameraRef}>
                    <TouchableOpacity
                      disabled={loadingStatus === "pending" ? true : false}
                      style={[styles.photoButton, styles.light]}
                      onPress={async () => {
                        setLoadingStatus("pending");
                        if (cameraRef) {
                          const { uri } = await cameraRef.takePictureAsync();
                          const asset = await MediaLibrary.createAssetAsync(uri);
                          setPhoto(asset);
                          setLoadingStatus("fullfield");
                          showToast({ type: "info", message: "Photo added successfully" });

                        }
                      }}
                    >
                      {loadingStatus === "idle" && (
                        <Ionicons name="md-camera-sharp" size={24} style={styles.photoIcon} />
                      )}
                      {loadingStatus === "pending" && <Spinner />}
                      {loadingStatus === "fullfield" && (
                        <Ionicons name="md-camera-sharp" size={24} style={styles.photoIcon} />
                      )}
                    </TouchableOpacity>
                  </Camera>
                </View>
              )
            ) : (
              <View style={styles.photoBar}>
                <Ionicons name="md-camera-sharp" size={24} style={styles.photoIcon} />
              </View>
            )}

            {photo && (
              <View style={styles.photoBar}>
                <ImageBackground source={photo} style={styles.photo}>
                  <TouchableOpacity
                    style={[styles.photoButton, styles.light]}
                    onPress={() => {
                      setPhoto(null);
                      setLoadingStatus("idle");
                    }}
                  >
                    <EvilIcons name="redo" size={60} style={styles.redoIcon} />
                  </TouchableOpacity>
                </ImageBackground>
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
        </TouchableWithoutFeedback>
      </ScrollView>

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
    // stretched: "false",
    height: 240,
    resizeMode: "cover",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
  },

  photoButton: {
    borderRadius: 30,
    width: 60,
    height: 60,
    backgroundColor: "#ffffff",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
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
  redoIcon: {
    color: "#BDBDBD",
    transform: [{ rotate: "-230deg" }],
  },
  activeField: {
    borderColor: "#FF6C00",
    color: "#212121",
  },
  activeIcon: { color: "#FF6C00" },
  message: {
    fontSize: 24,
    color: "black",
    marginBottom: "50%",
  },
});
