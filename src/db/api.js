import { db } from "../../config"; // firebase
import {
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
  deleteDoc,
} from "firebase/firestore"; // firebase

// Get All
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

// Add Post
export const addPost = async data => {
  try {
    const res = await addDoc(collection(db, "posts"), { ...data });
    return res;
  } catch (error) {
    console.log(error.message);
  }
};

// Add Comment
export const addComment = async ({ postId, commentItem }) => {
  try {
    const Ref = doc(db, "posts", `${postId}`);
    await updateDoc(Ref, {
      comments: arrayUnion(commentItem),
    });
  } catch (error) {
    console.log(error.message);
  }
};

// Add Like
export const addLike = async ({ postId, userId: uid }) => {
  try {
    const Ref = doc(db, "posts", `${postId}`);
    await updateDoc(Ref, {
      likes: arrayUnion(uid),
    });
    return true;
  } catch (error) {
    console.log(error.message);
  }
};

// Remove Like
export const removeLike = async ({ postId, userId: uid }) => {
  try {
    const Ref = doc(db, "posts", `${postId}`);
    await updateDoc(Ref, {
      likes: arrayRemove(uid),
    });
    return true;
  } catch (error) {
    console.log(error.message);
  }
};

// Get Likes by post Id
export const getLikes = async postId => {
  const Ref = doc(db, "posts", `${postId}`);
  const docSnap = await getDoc(Ref);
  const likes = docSnap.data().likes;
  return likes;
};

// Get comments by post Id
export const getComments = async postId => {
  const Ref = doc(db, "posts", `${postId}`);
  const docSnap = await getDoc(Ref);
  const posts = docSnap.data().comments;

  return posts;
};

// Get posts by user Id
export const getUserPosts = async userId => {
  const q = query(collection(db, "posts"), where("owner", "==", userId));
  const snapshot = await getDocs(q);
  const userPosts = snapshot.docs.map(doc => {
    return { ...doc.data(), id: doc.id };
  });
  const sortedPosts = userPosts.sort((a, b) => b.createdAt - a.createdAt);
  return sortedPosts;
};

// Get posts by user Id
export const geletePostById = async (postId) => {
await deleteDoc(doc(db, "posts", `${postId}`));

  return true;
};
