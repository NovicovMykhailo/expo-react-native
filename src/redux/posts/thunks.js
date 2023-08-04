// import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

// import { storage } from "../../config"; //firebase
// import { ref } from "firebase/storage"; //firebase



/* WORK WITH DB

 const registerDB = async ({ email, password }) => {
  try {
    await createUserWithEmailAndPassword(auth, email, password);
  } catch (error) {
    throw error;
  }
};

const loginDB = async ({ email, password }) => {
  try {
    const credentials = await signInWithEmailAndPassword(auth, email, password);
        return credentials.user;
  } catch (error) {
    throw error;
  }
};


// await addDoc(collection(db, "users"), { // user to Firebase  DB // users
//   email: email,
//   name: login,
//   id: res.user.uid,
//   user_photo: storageRef._location.path,
// });


///add photo to db and get storage

import { getStorage, ref } from "firebase/storage";

// Create a reference with an initial file path and name
const storage = getStorage();
const pathReference = ref(storage, 'images/stars.jpg');

// Create a reference from a Google Cloud Storage URI
const gsReference = ref(storage, 'gs://bucket/images/stars.jpg');

// Create a reference from an HTTPS URL
// Note that in the URL, characters are URL escaped!
const httpsReference = ref(storage, 'https://firebasestorage.googleapis.com/b/bucket/o/images%20stars.jpg');  

 */








export const fetchAll = createAsyncThunk(
  "posts/getAllPosts",

  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get("/posts");
      return response.data;
    } catch (e) {
      return rejectWithValue(e.message);
    }
  },
);

export const addContact = createAsyncThunk(
  "posts/addPost",

  async (obj, { rejectWithValue }) => {
    try {
      const response = await axios.post("/posts", obj);
      return response.data;
    } catch (e) {
      return rejectWithValue(e.message);
    }
  },
);


