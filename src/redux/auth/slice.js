import { createSlice } from "@reduxjs/toolkit";
import { register, logIn, logOut, refreshUserPhoto, showLoaderPage } from "./thunks";
import initialState from "./initialState";

const handlePending = state => {
  state.isLoading = true;
  state.error = null;
};

const handleRejected = (state, { error, payload }) => {
  state.isLoading = false;
  state.error = payload ?? error.message;
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(register.fulfilled, (state, { payload }) => {
        const { displayName, email, photoURL } = payload.user;
        state.user = { displayName, email, photoURL };
        state.token = payload._tokenResponse.idToken;
        state.isLoading = false;
        state.error = null;
      })
      .addCase(logIn.fulfilled, (state, { payload }) => {
        const { displayName, email, photoURL } = payload.user;

        state.user = { displayName, email, photoURL };
        state.token = payload._tokenResponse.idToken;
        state.isLoading = false;
        state.error = null;
      })
      .addCase(logOut.fulfilled, state => {
        state.user = []
        state.token = null;
        state.error = null;
        state.isLoading = false;
      })
      .addCase(refreshUserPhoto.fulfilled, (state, { payload }) => {
        const { photoURL } = payload;
        if (state.user.photoURL !== photoURL) state.user.photoURL = photoURL;
        state.error = null;
        state.isLoading = false;
      })
      .addCase(showLoaderPage.fulfilled, (state, { payload }) => {
        state.isLoading = payload;
        state.error = null;
      })
      .addMatcher(({ type }) => type.endsWith("/pending"), handlePending)
      .addMatcher(({ type }) => type.endsWith("/rejected"), handleRejected);
  },
});

export default authSlice.reducer;
