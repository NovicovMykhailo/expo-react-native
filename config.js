// Для роботи із firebase обовʼязково треба ініціалізувати проект
import { initializeApp } from "firebase/app";
// Функція для підключення авторизації в проект
import { getAuth } from "firebase/auth";
// Функція для підключення бази даних у проект
import { getFirestore } from "firebase/firestore";
// Функція для підключення сховища файлів в проект
import { getStorage } from "firebase/storage";


const firebaseConfig = {
  apiKey: "AIzaSyAD6ffoRa7NDaOfD7RtLQldRMnskCGUjsg",
  authDomain: "phonygram-f6e99.firebaseapp.com",
  projectId: "phonygram-f6e99",
  storageBucket: "phonygram-f6e99.appspot.com",
  messagingSenderId: "261519130527",
  appId: "1:261519130527:web:500af69da63c20ca29c7aa",
  measurementId: "G-33EM1B535S"
};



const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);




