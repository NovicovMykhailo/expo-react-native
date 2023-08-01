import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from "redux-persist";

import AsyncStorage from "@react-native-async-storage/async-storage";


import authReducer from "./auth/slice";
import postsReducer from "./postsSlice";

const persistConfig = {
  key: "token",
  storage: AsyncStorage,
  whitelist: ["token"],
};

const postConfig = {
  key: "posts",
  storage: AsyncStorage,
};

export const store = configureStore(
  {
    reducer: {
      auth: persistReducer(persistConfig, authReducer),
      posts: persistReducer(postConfig, postsReducer),
    },

    middleware: getDefaultMiddleware =>
      getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
      }),
  },

);

export const persistor = persistStore(store);
