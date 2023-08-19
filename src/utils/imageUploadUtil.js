import { auth } from "../../config";
import img2Blob from "./img2Blob";
import getImageUrl from "./getImageUrl";
import { getStorage, ref, uploadBytes } from "firebase/storage";

const imageUploadUtil = async photo => {
  const storage = getStorage();

  const [blob, filename] = await img2Blob(photo);
  const storageRef = ref(storage, `posts_photo/${auth.currentUser.uid}_${filename}`);
  await uploadBytes(storageRef, blob, { contentType: "image/jpeg" });
  const url = await getImageUrl(storageRef);
  return url;
};

export default imageUploadUtil;
