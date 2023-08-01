import { createSlice } from "@reduxjs/toolkit";
import { register, logIn, logOut, refreshUser } from "./thunks";
import initialState from "./initialState";

const handlePending = state => {
  state.isLoading = true;
  state.isRefreshing = true;
  state.error = "";
};

const handleRejected = (state, { error, payload }) => {
  state.isLoading = false;
  state.isRefreshing = false;
  state.error = payload ?? error.message;
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  // reducers: {
  //   refreshUser: (state, action) => {
  //     state.user = {
  //       token: "token",
  //       _id: "e7b46283-070d-4545-be03-230225e9c400",
  //       IsAuth: true,
  //       name: "Natali Romanova",
  //       email: "email@example.com",
  //       user_photo: "https://i.ibb.co/Xzfkqyt/user-Photo.png",
  //     };
  //   },
  // },
  extraReducers: builder => {
    builder

      .addCase(register.fulfilled, (state, action) => {
        const { displayName, uid, photoURL, email } = action.payload.user;
        const user = { email, id: uid, name: displayName, user_photo: photoURL };
        state.user = user;
        state.token = action.payload.token;
        state.isLoggedIn = true;
        state.error = null;
      })
      .addCase(logIn.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isLoggedIn = true;
        state.error = null;
      })
      .addCase(logOut.fulfilled, state => {
        state.user = { name: null, email: null };
        state.token = null;
        state.isLoggedIn = false;
        state.error = null;
      })
      .addCase(refreshUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isLoggedIn = true;
        state.isRefreshing = false;
        state.error = null;
      })
      .addMatcher(({ type }) => type.endsWith("/pending"), handlePending)
      .addMatcher(({ type }) => type.endsWith("/rejected"), handleRejected);
  },
});

// export const { refreshUser } = authSlice.actions;
export default authSlice.reducer;
