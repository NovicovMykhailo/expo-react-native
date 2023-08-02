import { View, StyleSheet, ImageBackground } from "react-native";//native

import { useState, useEffect } from "react";//react
import { auth, storage } from "../../config";//firebase
import { ref, uploadBytes } from "firebase/storage";//firebase
import { updateProfile } from "firebase/auth";//firebase
import img2Blob from "../utils/img2Blob";//utils
import getImageUrl from "../utils/getImageUrl";//utils

import PlusStyledButton from "./PlusStyledButton";//Components
import PhotoPicker from "./PhotoPicker";//Components


// avatarSkeleton

export default function UserPhoto({ photo }) {
  const [isBtnActive, setIsBtnActive] = useState(false);

  const [modalVisible, setModalVisible] = useState(false);
  const [image, setImage] = useState();

  const user = auth.currentUser;

  if (user === null) {
    const user_photo = null;
  }
  const user_photo = user.photoURL;

  useEffect(() => {
    if (user_photo) {
      (async function () {
        try {
          const url = await getImageUrl(user_photo);
          setImage(url);
        } catch (e) {
          console.error(e);
        }
      })();
    } else {
      setImage(null);
    }
  },[image]);

  useEffect(() => {
    if (image) setIsBtnActive(true);
    else setIsBtnActive(false);
  }, [image]);

  const showModal = () => {
    setModalVisible(prev => !prev);
  };

  const updatePhoto = async uri => {
    const [blob, filename] = await img2Blob(uri); // photo to blob (util)
    const storageRef = ref(storage, `userphoto/${user.uid}_${filename}`); //make starage url

    await uploadBytes(storageRef, blob); //write file to storage
    await updateProfile(auth.currentUser, {//update profile photo
      photoURL: `${storageRef}`,
    });
  };

  return (
    <>
      {modalVisible && <PhotoPicker showModal={showModal} setPhoto={updatePhoto} />}
      <View style={styles.userPhoto}>
        <ImageBackground source={{ uri: `${image}` }} style={styles.photo} />
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
