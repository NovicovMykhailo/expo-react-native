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
  onSnapshot,
} from "firebase/firestore";


export const getPosts = async () => {
  try {
    const snapshot = await getDocs(query(collection(db, "posts"), orderBy("createdAt", "desc")));

    /// add snapshotListener for not refetching manually

    // const q = query(collection(db, "cities"), orderBy("createdAt", "desc"))
    // const unsubscribe = onSnapshot(q, (querySnapshot) => {
    //   const cities = [];
    //   querySnapshot.forEach((doc) => {
    //       cities.push(doc.data().name);
    //   });
    //   console.log("Current cities in CA: ", cities.join(", "));
    // });
    console.log("fetching posts");
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
    console.log("adding comment");
    await updateDoc(Ref, {
      comments: arrayUnion(commentItem),
    });
  } catch (error) {
    console.log(error.message);
  }
};

export const addLike = async ({ postId, uid }) => {
  try {
    const Ref = doc(db, "posts", `${postId}`);
    console.log("adding Like");

    await updateDoc(Ref, {
      likes: arrayUnion(uid),
    });
  } catch (error) {
    console.log(error.message);
  }
};

export const removeLike = async ({ postId, uid }) => {
  try {
    const Ref = doc(db, "posts", `${postId}`);
    console.log("removing Like");
    await updateDoc(Ref, {
      likes: arrayRemove(uid),
    });
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
  console.log("getting Comments");
  const posts = docSnap.data().comments;


  return posts;
};

export const getPostsLength = async () => {
  const coll = collection(db, "posts");
  const snapshot = await getCountFromServer(coll);
  const length = snapshot.data().count;
  return length;
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
