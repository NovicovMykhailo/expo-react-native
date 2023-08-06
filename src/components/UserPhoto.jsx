import { View, StyleSheet, ImageBackground } from "react-native"; //native

import { useState, useEffect } from "react"; //react
import { auth, storage } from "../../config"; //firebase
import { ref, uploadBytes } from "firebase/storage"; //firebase
import { updateProfile } from "firebase/auth"; //firebase
import img2Blob from "../utils/img2Blob"; //utils
import getImageUrl from "../utils/getImageUrl"; //utils
import toast from "../utils/toast";//utils

import PlusStyledButton from "./PlusStyledButton"; //Components
import PhotoPicker from "./PhotoPicker"; //Components
import Spinner from "../components/Spinner";

export default function UserPhoto() {
  const [isBtnActive, setIsBtnActive] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);

  const [modalVisible, setModalVisible] = useState(false);
  const [image, setImage] = useState();

  const user = auth.currentUser;

  useEffect(() => {
    if (user.photoURL) {
      (async function () {
        try {
          const url = await getImageUrl(user.photoURL);
          setImage(url);
        } catch (e) {
          toast.error({message: `${e.message}`});
        }
      })();
    } else {
      setImage(null);
    }
  }, []);

  useEffect(() => {
    if (image) setIsBtnActive(true);
    else setIsBtnActive(false);
  }, [image]);

  const showModal = () => {
    setModalVisible(prev => !prev);
  };

  const updatePhoto = async uri => {
    setIsUpdating(true);
    const [blob, filename] = await img2Blob(uri); // photo to blob (util)
    const storageRef = ref(storage, `userphoto/${user.uid}_${filename}`); //make starage url
    await uploadBytes(storageRef, blob); //write file to storage
    await updateProfile(auth.currentUser, { photoURL: `${storageRef}` }); //update profile photo
    const url = await getImageUrl(storageRef);
    setImage(url);
    setIsUpdating(false);
  };

  return (
    <>
      {modalVisible && <PhotoPicker showModal={showModal} setPhoto={updatePhoto} />}
      <View style={styles.userPhoto}>
        {isUpdating ? <Spinner /> : <ImageBackground source={{ uri: `${image}` }} style={styles.photo} />}
        <PlusStyledButton isActive={isBtnActive} onPress={() => (image ? setImage(null) : showModal())} />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  userPhoto: {
    width: 120,
    height: 120,
    borderRadius: 16,
    backgroundColor: "#F6F6F6",
    position: "relative",
    top: -62,
    left: "46%",
    transform: [{ translateX: -50 }],
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  photo: {
    height: 120,
    width: 120,
    borderRadius: 16,
    overflow: "hidden",
  },
});
