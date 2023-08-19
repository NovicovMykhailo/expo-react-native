import { getAuth } from "firebase/auth";
import img2Blob from "./img2Blob"
import getImageUrl from "./getImageUrl";
import { getStorage, ref, uploadBytes } from "firebase/storage";
import { updateProfile } from "firebase/auth"

const updateUserPhotoUrl = async photo => {
  const auth = getAuth()
  const storage = getStorage();
  img2Blob(photo)
  const [blob, filename] = await img2Blob(photo);
  const storageRef = ref(storage, `userphoto/${auth.currentUser.uid}_${filename}`);
  await uploadBytes(storageRef, blob, { contentType: "image/jpeg" });
  const url = await getImageUrl(storageRef);
  await updateProfile(auth.currentUser, { photoURL: `${url}` })

  return url;
};

export default updateUserPhotoUrl;
