import { useAnimatedReaction } from "react-native-reanimated";

const shortid = require("shortid");

export default function commentCreator(data) {
  const {photoURL, comment, uid } = data;

  const obj = {
    id: shortid.generate(),
    createdAt: `${new Date()}`,
    owner: uid,
    photoURL,
    comment,
  };

  return obj;
}
