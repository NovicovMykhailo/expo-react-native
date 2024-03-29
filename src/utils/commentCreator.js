import { Timestamp } from "firebase/firestore";// firebase

const shortid = require("shortid");

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
