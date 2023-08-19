import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  updateProfile,
  signOut,
  getAuth,
} from "firebase/auth";
import { auth } from "../../../config";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { getStorage, ref, uploadBytes } from "firebase/storage";
import getImageUrl from "../../utils/getImageUrl";

const storage = getStorage();

//register
export const register = createAsyncThunk("auth/register", async (credentials, thunkAPI) => {
  const { email, password, photo, login } = credentials;

  try {
    const res = await createUserWithEmailAndPassword(auth, email, password); // register new Firebase  User
    await updateProfile(auth.currentUser, { displayName: login }); // update currentUser Name

    //loading photo to Firebase Storage and updating current user userPhoto

    if (photo) {
      //(if Photo exists)
      const [blob, filename] = await img2Blob(photo); // photo to blob (util)
      const storageRef = ref(storage, `userphoto/${res.user.uid}_${filename}`); //make starage url
      const metadata = { contentType: "image/jpeg" }; //metadata to jpg
      const url = await getImageUrl(storageRef);
      await uploadBytes(storageRef, blob, metadata); //write file to storage
      await updateProfile(auth.currentUser, { photoURL: `${url}` }); //update profile photo
    } else {
      //(if Photo not exists) save base avatar url from storage

      const storageRef = ref(storage, `userphoto/base_avatar.jpg`);
      const url = await getImageUrl(storageRef);
      await updateProfile(auth.currentUser, { photoURL: `${url}` });
    }

    return res;
  } catch (error) {
    // return thunkAPI.rejectWithValue(error.message)
    return thunkAPI.rejectWithValue("Oops, a User with this username or email exists");
  }
});

//login
export const logIn = createAsyncThunk("auth/login", async (credentials, thunkAPI) => {
  const { email, password } = credentials;
  try {
    const res = await signInWithEmailAndPassword(auth, email, password);
    return res;
  } catch (error) {
    return thunkAPI.rejectWithValue("Ooops, E-mail or password is incorrect");
  }
});

//logout
export const logOut = createAsyncThunk("auth/logout", async (_, thunkAPI) => {
  try {
    await signOut(auth);
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
});

// refresh
export const refreshUserPhoto = createAsyncThunk("auth/refresh", async (_, thunkAPI) => {
  try {
    const auth = getAuth();
    return auth.currentUser;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
});

//show Loader
export const showLoaderPage = createAsyncThunk("auth/showLoader", (credentials, thunkAPI) => {
  try {
    const showLoader = Boolean(credentials);
    return showLoader;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
});
