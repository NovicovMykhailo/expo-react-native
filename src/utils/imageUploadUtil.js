import { getStorage, ref, uploadBytes } from "firebase/storage"; // firebase
import { auth } from "../../config"; // firebase
import getImageUrl from "./getImageUrl"; // util
import img2Blob from "./img2Blob"; // util

// upload image to DB and get URL from storage
const imageUploadUtil = async photo => {
  const storage = getStorage();

  const [blob, filename] = await img2Blob(photo);
  const storageRef = ref(storage, `posts_photo/${auth.currentUser.uid}_${filename}`);
  await uploadBytes(storageRef, blob, { contentType: "image/jpeg" });
  const url = await getImageUrl(storageRef);
  return url;
};

export default imageUploadUtil;
