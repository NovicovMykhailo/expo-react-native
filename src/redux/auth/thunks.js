// import axios from "axios";

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  updateProfile,
} from "firebase/auth";
import { auth, db } from "../../../config";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { collection, addDoc } from "firebase/firestore";
import { getStorage, ref, uploadBytes } from "firebase/storage";
import img2Blob from "../../utils/img2Blob";

const storage = getStorage();

/**
 використовуючи вже готове налаштування Firebase, ми додамо можливість входу за допомогою email.

- createUserWithEmailAndPassword - метод приймає email та password у вигляді рядків і
         повертає promise про успішну реєстрацію або відмову через помилку (має вбудований валідатор, який перевіряє на мінімальну довжину пароля).

- onAuthStateChanged - метод вішає слухач на зміну стану аутентифікації, приймає коллбек,
          який першим аргументов містить об'єкт користувача або null за відсутності даних

- signInWithEmailAndPassword - метод для входу у вже існуючий акаунт, повертає promise

- auth().currentUser - за допомогою цього методу можна отримати та оновити профайл користувача
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

// const clearAuthHeader = () => {
//   axios.defaults.headers.common.Authorization = "";
// };

export const register = createAsyncThunk("auth/register", async (credentials, thunkAPI) => {
  const { email, password, photo, login } = credentials;
  const [blob, filename] = await img2Blob(photo);

  try {
    const res = await createUserWithEmailAndPassword(auth, email, password);  // register new Firebase  User
  
    const storageRef = ref(storage, `userphoto/${res.user.uid}_${filename}`); //loading userPhoto to Firebase Storage
    await uploadBytes(storageRef, blob);                                      //
  
    await addDoc(collection(db, "users"), { // user to Firebase  DB // users
      email: email,
      name: login,
      id: res.user.uid,
      user_photo: storageRef._location.path,
    });

    await updateProfile(auth.currentUser, { // update userPhoto and Name
      displayName: login,
      photoURL: `${storageRef}`,
    });

    // setAuthHeader(res.data.token);

    return res; /// вернуть не весть response? а только юзер и токен
  } catch (error) {
    // return thunkAPI.rejectWithValue("Oops, a User with this username or email exists");
    return thunkAPI.rejectWithValue(error.message);
  }
});

export const logIn = createAsyncThunk("auth/login", async (credentials, thunkAPI) => {
  try {
    const res = await signInWithEmailAndPassword(credentials);
    // setAuthHeader(res.data.token);
    return res.data;
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
  const state = thunkAPI.getState();
  const userInfo = state.auth.user;
  try {
    onAuthStateChanged(userInfo);
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }

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
