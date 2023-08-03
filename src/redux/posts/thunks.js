// import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";



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


