import { getStorage, ref, getDownloadURL } from "firebase/storage";
const storage = getStorage();

export default async function getImageUrl(url) {
  const imageUrl = await getDownloadURL(ref(storage, url));
  return imageUrl;
}
