import { initializeApp } from "firebase/app"; // firebase init
import { getFirestore } from "firebase/firestore"; // firebase DB
import { getStorage } from "firebase/storage";  // firebase Storage
import { getAuth } from "firebase/auth"; // firebase auth


const firebaseConfig = {
  apiKey: "AIzaSyAkybaMWEsyem5AtqnIjWGkNTIGqQfUeYk",
  authDomain: "phonywebapp.firebaseapp.com",
  projectId: "phonywebapp",
  storageBucket: "phonywebapp.appspot.com",
  messagingSenderId: "340816934486",
  appId: "1:340816934486:web:e9f986bbd80edcc1d7adf7",
  measurementId: "G-4RJHXG43V7"
  
};



const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);





