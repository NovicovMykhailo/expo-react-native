import { getStorage, ref, uploadBytes } from "firebase/storage"; // firebase
import { updateProfile } from "firebase/auth"; // firebase
import { getAuth } from "firebase/auth"; // firebase
import getImageUrl from "./getImageUrl"; // utils
import img2Blob from "./img2Blob"; // utils

const updateUserPhotoUrl = async photo => {
  const auth = getAuth();
  const storage = getStorage();
  img2Blob(photo);
  const [blob, filename] = await img2Blob(photo);
  const storageRef = ref(storage, `userphoto/${auth.currentUser.uid}_${filename}`);
  await uploadBytes(storageRef, blob, { contentType: "image/jpeg" });
  const url = await getImageUrl(storageRef);
  await updateProfile(auth.currentUser, { photoURL: `${url}` });

  return url;
};

export default updateUserPhotoUrl;
