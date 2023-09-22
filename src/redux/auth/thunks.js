import { getStorage, ref} from "firebase/storage"; // firebase
import { auth } from "../../../config"; // firebase
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  signOut,
  getAuth,
} from "firebase/auth"; // firebase


import { createAsyncThunk } from "@reduxjs/toolkit"; // redux
import updateUserPhotoUrl from "../../utils/updateUserPhotoUrl"; // util
import getImageUrl from "../../utils/getImageUrl"; // util

const storage = getStorage();

//register
export const register = createAsyncThunk("auth/register", async (credentials, thunkAPI) => {
  const { email, password, photo, login } = credentials;

  try {
    const res = await createUserWithEmailAndPassword(auth, email, password); // register new Firebase  User
    await updateProfile(auth.currentUser, { displayName: login }); // update currentUser Name
    if (photo) {
        await updateUserPhotoUrl(photo);
    } else {

      const storageRef = ref(storage, `userphoto/base_avatar.jpg`);
      const url = await getImageUrl(storageRef);
      await updateProfile(auth.currentUser, { photoURL: `${url}` });
    }
    return res;
  } catch (error) {
    return thunkAPI.rejectWithValue("Oops, a User with this email exists");
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
