import AsyncStorage from "@react-native-async-storage/async-storage"; // async-storage
import { persistStore, persistReducer } from "redux-persist"; // persist

import { configureStore } from "@reduxjs/toolkit"; // redux
import authReducer from "../redux/auth/slice"; // redux
import { postsApi } from "../redux/posts/posts"; // redux

const authConfig = {
  key: "token",
  storage: AsyncStorage,
};

export const store = configureStore({
  reducer: {
    auth: persistReducer(authConfig, authReducer),
    [postsApi.reducerPath]: postsApi.reducer,
  },

  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(postsApi.middleware),
});

export const persistor = persistStore(store);
