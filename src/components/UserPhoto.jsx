import { View, StyleSheet, ImageBackground } from "react-native";

import PlusStyledButton from "./PlusStyledButton";
import PhotoPicker from "./PhotoPicker";
import { useState, useEffect } from "react";

export default function UserPhoto({ photo }) {
  const [isBtnActive, setIsBtnActive] = useState(false);
  const [userPhoto, setUserPhoto] = useState({uri: `${photo}`} || null);
  const [modalVisible, setModalVisible] = useState(false);



  useEffect(() => {
    if (userPhoto) setIsBtnActive(true);
    else setIsBtnActive(false);
  }, [userPhoto]);

  const showModal = () => {
    setModalVisible(prev => !prev);
  };

  return (
    <>
      {modalVisible && <PhotoPicker showModal={showModal} setPhoto={setUserPhoto} />}
      <View style={styles.userPhoto}>
        <ImageBackground source={userPhoto} style={styles.photo} />
        <PlusStyledButton isActive={isBtnActive} onPress={() => (userPhoto ? setUserPhoto(null) : showModal())} />
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
