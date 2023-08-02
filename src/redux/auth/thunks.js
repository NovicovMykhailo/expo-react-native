// import axios from "axios";

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  updateProfile,
  signOut
} from "firebase/auth";
import { auth, db } from "../../../config";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { collection, addDoc } from "firebase/firestore";
import { getStorage, ref, uploadBytes } from "firebase/storage";
import img2Blob from "../../utils/img2Blob";

const storage = getStorage();

/**

- onAuthStateChanged - метод вішає слухач на зміну стану аутентифікації, приймає коллбек,
          який першим аргументов містить об'єкт користувача або null за відсутності даних



а
 */

////////////////////////////////////////////////////////////////////////////////

/*
 const registerDB = async ({ email, password }) => {
  try {
    await createUserWithEmailAndPassword(auth, email, password);
  } catch (error) {
    throw error;
  }
};

// або більш короткий запис цієї функції
const registerDB = ({ email, password }) => 
        createUserWithEmailAndPassword(auth, email, password);

const authStateChanged = async (onChange = () => {}) => {
        onAuthStateChanged((user) => {
                onChange(user);
        });
};

const loginDB = async ({ email, password }) => {
  try {
    const credentials = await signInWithEmailAndPassword(auth, email, password);
        return credentials.user;
  } catch (error) {
    throw error;
  }
};

const updateUserProfile = async (update) => {

  const user = auth.currentUser;

  // якщо такий користувач знайдений
  if (user) {

  // оновлюємо його профайл
        try {
            await updateProfile(user, update);
        } catch(error) {
            throw error
        }
  }
};
 */

// axios.defaults.baseURL = "https://connections-api.herokuapp.com/";

// const setAuthHeader = token => {
//   axios.defaults.headers.common.Authorization = `Bearer ${token}`;
// };

// await addDoc(collection(db, "users"), { // user to Firebase  DB // users
//   email: email,
//   name: login,
//   id: res.user.uid,
//   user_photo: storageRef._location.path,
// });

// const clearAuthHeader = () => {
//   axios.defaults.headers.common.Authorization = "";
// };

export const register = createAsyncThunk("auth/register", async (credentials, thunkAPI) => {
  const { email, password, photo, login } = credentials;

  try {
    // register new Firebase  User
    const res = await createUserWithEmailAndPassword(auth, email, password);
   // update currentUser Name
    await updateProfile(auth.currentUser, {
      displayName: login,
    });
      //loading photo to Firebase Storage and updating current user userPhoto
    if (photo) { //(if Photo exists)
      const [blob, filename] = await img2Blob(photo);// photo to blob (util)
      const storageRef = ref(storage, `userphoto/${res.user.uid}_${filename}`); //make starage url

      await uploadBytes(storageRef, blob); //write file to storage
      await updateProfile(auth.currentUser, {//update profile photo
        photoURL: `${storageRef}`,
      });
    } else {//(if Photo not exists) save base avatar url from storage
      const storageRef = ref(storage, `userphoto/base_avatar.jpg`);

      await updateProfile(auth.currentUser, {
        photoURL: `${storageRef}`,
      });
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
    return thunkAPI.rejectWithValue("Ooops, You are not registered yet");
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
  const registeredUser = await onAuthStateChanged(auth, authState)
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
