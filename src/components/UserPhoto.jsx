import { View, StyleSheet, ImageBackground, Pressable } from "react-native"; //native

import { useState, useEffect } from "react"; //react
import { getAuth } from "firebase/auth";
import updateUserPhotoUrl from "../utils/updateUserPhotoUrl"; //utils

import PlusStyledButton from "./PlusStyledButton"; //Components
import PhotoPicker from "./PhotoPicker"; //Components
import Spinner from "../components/Spinner";
import { useSelector, useDispatch  } from "react-redux";
import { refreshUserPhoto } from "../redux/auth/thunks";
import { selectUserPhoto } from "../redux/auth/selectors";

export default function UserPhoto() {
  const [isBtnActive, setIsBtnActive] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [image, setImage] = useState();

  const userPhoto = useSelector(selectUserPhoto);
  const dispatch = useDispatch()


  useEffect(() => {
    setImage(userPhoto);
    setTimeout(() => {
      const auth = getAuth();
      const user = auth.currentUser;
      if (user) {
        setImage(user.photoURL);
      }
    }, 2000);
  }, []);

  useEffect(() => {
    if (image) setIsBtnActive(true);
    else setIsBtnActive(false);
  }, [image]);

  const showModal = () => {
    setModalVisible(prev => !prev);
  };

  const updatePhoto = async data => {
    setIsUpdating(true);
    const url = await updateUserPhotoUrl(data);
    setImage(url);
    setIsUpdating(false);
  };

  return (
    <>
      {modalVisible && <PhotoPicker showModal={showModal} setPhoto={updatePhoto} />}
      <View style={styles.userPhoto}>
        {isUpdating ? <Spinner /> : <ImageBackground source={{ uri: `${image}` }} style={styles.photo} />}
        <PlusStyledButton isActive={isBtnActive} onPress={() => (image ? setImage(null) : showModal())} />
        {/* <Pressable style={{width: 30, height: 30, backgroundColor: "red"}} onPress={()=>dispatch(refreshUserPhoto())}/> */}
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
