

const shortid = require("shortid");
import { Timestamp } from "firebase/firestore";

export default function commentCreator(data) {
  const {photoURL, comment, uid } = data;

  const obj = {
    id: shortid.generate(),
    createdAt: Timestamp.now().toDate(),
    owner: uid,
    photoURL,
    comment,
  };

  return obj;
}
