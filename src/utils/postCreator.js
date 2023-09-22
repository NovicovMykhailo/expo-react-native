import { Timestamp } from "firebase/firestore"; // firebase


//Post Model Generator
export default function postCreator(data) {
  const { title, location, coords, image, owner } = data;
  const post = {
    createdAt: Timestamp.now().toDate(),
    title,
    location,
    coords,
    image,
    owner,
    likes: [],
    comments: [],
  };

  return post;
}
