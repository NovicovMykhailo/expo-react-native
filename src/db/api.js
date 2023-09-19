import { db } from "../../config";
import {
  getCountFromServer,
  collection,
  addDoc,
  getDocs,
  orderBy,
  query,
  updateDoc,
  arrayRemove,
  doc,
  arrayUnion,
  getDoc,
  where,
} from "firebase/firestore";

export const getPosts = async () => {
  try {
    const snapshot = await getDocs(query(collection(db, "posts"), orderBy("createdAt", "desc")));
    const posts = snapshot.docs.map(doc => {
      return { ...doc.data(), id: doc.id };
    });

    return posts;
  } catch (error) {
    console.log(error.message);
  } finally {
  }
};

export const addPost = async data => {
  try {
    const res = await addDoc(collection(db, "posts"), { ...data });
    console.log("adding posts");
    return res;
  } catch (error) {
    console.log(error.message);
  }
};

export const addComment = async ({ postId, commentItem }) => {
  try {
    const Ref = doc(db, "posts", `${postId}`);
    // console.log("adding comment");
    await updateDoc(Ref, {
      comments: arrayUnion(commentItem),
    });
  } catch (error) {
    console.log(error.message);
  }
};

export const addLike = async ({ postId, userId: uid }) => {


  try {
    const Ref = doc(db, "posts", `${postId}`);
    console.log("adding Like");

   await updateDoc(Ref, {
      likes: arrayUnion(uid),
    });
    return true
  } catch (error) {
    console.log(error.message);
  }
};

export const removeLike = async ({ postId, userId: uid }) => {
  
  try {
    const Ref = doc(db, "posts", `${postId}`);
    console.log("removing Like");
    await updateDoc(Ref, {
      likes: arrayRemove(uid),
    });
    return true
  } catch (error) {
    console.log(error.message);
  }
};

export const getLikes = async postId => {
  const Ref = doc(db, "posts", `${postId}`);

  const docSnap = await getDoc(Ref);
  console.log("getting Likes");
  const likes = docSnap.data().likes;
  return likes;
};

export const getComments = async postId => {
  const Ref = doc(db, "posts", `${postId}`);
  const docSnap = await getDoc(Ref);
  // console.log("getting Comments");
  const posts = docSnap.data().comments;

  return posts;
};

export const getUserPosts = async userId => {
  const q = query(collection(db, "posts"), where("owner", "==", userId));
  const snapshot = await getDocs(q);
  const userPosts = snapshot.docs.map(doc => {
    return { ...doc.data(), id: doc.id };
  });
  const sortedPosts = userPosts.sort((a, b) => b.createdAt - a.createdAt);
  return sortedPosts;
};
