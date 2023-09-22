import { getStorage, ref, getDownloadURL } from "firebase/storage";// firebase
const storage = getStorage();

// Link Url from Firebase converter
export default async function getImageUrl(url) {
  const imageUrl = await getDownloadURL(ref(storage, url));
  return imageUrl;
}
