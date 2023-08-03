import { createSlice } from "@reduxjs/toolkit";
import { register, logIn, logOut, refreshUser } from "./thunks";
import initialState from "./initialState";




const handlePending = state => {
  state.isLoading = true;
  state.isRefreshing = true;
  state.error = null;
};



const handleRejected = (state, { error, payload }) => {
  state.isLoading = false;
  state.isRefreshing = false;
  state.error = payload ?? error.message;
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(register.fulfilled, (state, { payload }) => {
        // const { user, _tokenResponse } = payload;
        // const { displayName, uid, photoURL, email } = user;
        // const userTarget = { name: displayName, _id: uid, user_photo: photoURL, email };
        // state.user = userTarget;
        state.token = payload._tokenResponse.refreshToken;
        // state.isLoggedIn = true;
        state.error = null;
        state.isLoading = false;
        state.isRefreshing = false;
      })
      .addCase(logIn.fulfilled, (state, {payload}) => {
        // const { user, _tokenResponse } = payload;
        // const { displayName, uid, photoURL, email } = user;
        // const userTarget = { name: displayName, _id: uid, user_photo: photoURL, email };
        // state.user = userTarget;
        // state.isLoggedIn = true;
        state.token = payload._tokenResponse.refreshToken;
        state.isRefreshing = false;
        state.error = null;
      })
      .addCase(logOut.fulfilled, state => {
        // state.user = { name: null, email: null, _id: null, user_photo: null };
        state.token = null;
        state.isLoggedIn = false;
        state.error = null;
        state.isLoading = false;
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
