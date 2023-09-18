import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";

import AsyncStorage from "@react-native-async-storage/async-storage";

import authReducer from "../redux/auth/slice";
import { postsApi } from "../services/posts";

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
