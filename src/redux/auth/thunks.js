// import axios from "axios";

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  updateProfile,
  signOut,
} from "firebase/auth";
import { auth, db } from "../../../config";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { collection, addDoc } from "firebase/firestore";
import { getStorage, ref, uploadBytes } from "firebase/storage";
import img2Blob from "../../utils/img2Blob";

const storage = getStorage();

/*

- onAuthStateChanged - метод вішає слухач на зміну стану аутентифікації, приймає коллбек,
          який першим аргументов містить об'єкт користувача або null за відсутності дани

const authStateChanged = async (onChange = () => {}) => {
        onAuthStateChanged((user) => {
                onChange(user);
        });
};
*/

export const register = createAsyncThunk("auth/register", async (credentials, thunkAPI) => {
  const { email, password, photo, login } = credentials;

  try {
    const res = await createUserWithEmailAndPassword(auth, email, password); // register new Firebase  User
    await updateProfile(auth.currentUser, { displayName: login }); // update currentUser Name

    //loading photo to Firebase Storage and updating current user userPhoto

    if (photo) {      //(if Photo exists)

      const [blob, filename] = await img2Blob(photo); // photo to blob (util)
      const storageRef = ref(storage, `userphoto/${res.user.uid}_${filename}`); //make starage url
      const metadata = { contentType: "image/jpeg" }; //metadata to jpg
      await uploadBytes(storageRef, blob, metadata); //write file to storage
      await updateProfile(auth.currentUser, { photoURL: `${storageRef}` }); //update profile photo

    } else {  //(if Photo not exists) save base avatar url from storage
     
      const storageRef = ref(storage, `userphoto/base_avatar.jpg`);
      await updateProfile(auth.currentUser, { photoURL: `${storageRef}` });
    }

    return res;
  } catch (error) {
    return thunkAPI.rejectWithValue("Oops, a User with this username or email exists");
  }
});

export const logIn = createAsyncThunk("auth/login", async (credentials, thunkAPI) => {
  const { email, password } = credentials;
  try {
    const res = await signInWithEmailAndPassword(auth, email, password);
    return res;
  } catch (error) {
    return thunkAPI.rejectWithValue("Ooops, E-mail or password is incorrect");
  }
});

export const logOut = createAsyncThunk("auth/logout", async (_, thunkAPI) => {
  try {
    await signOut(auth);
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
});

export const refreshUser = createAsyncThunk("auth/refresh", async (_, thunkAPI) => {
  const registeredUser = await onAuthStateChanged(auth, authState);
  // const state = thunkAPI.getState();
  // const userInfo = state.auth.user;
  // try {
  //   onAuthStateChanged(userInfo);
  // } catch (error) {
  //   return thunkAPI.rejectWithValue(error.message);
  // }

  //   if (persistedToken === null) {
  //     return thunkAPI.rejectWithValue("Ooops, You are not registered yet");
  //   }

  //   try {
  //     setAuthHeader(persistedToken);
  //     const res = await axios.get("/users/current");
  //     return res.data;
  //   } catch (error) {
  //     return thunkAPI.rejectWithValue(error.message);
  //   }
});
