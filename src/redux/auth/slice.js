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
        state.token = payload._tokenResponse.idToken;
        state.error = null;
        state.isLoading = false;
        state.isRefreshing = false;
      })
      .addCase(logIn.fulfilled, (state, {payload}) => {

        state.token = payload._tokenResponse.idToken;
        state.isRefreshing = false;
        state.error = null;
      })
      .addCase(logOut.fulfilled, state => {
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
