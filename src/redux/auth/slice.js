import { createSlice } from "@reduxjs/toolkit";
import { register, logIn, logOut} from "./thunks";
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
        state.token = payload._tokenResponse.idToken;
        state.isLoading = false;
        state.error = null;
      })
      .addCase(logIn.fulfilled, (state, {payload}) => {
        state.token = payload._tokenResponse.idToken;
        state.isLoading = false;
        state.error = null;
      })
      .addCase(logOut.fulfilled, state => {
        state.token = null;
        state.error = null;
        state.isLoading = false;
      })
      .addMatcher(({ type }) => type.endsWith("/pending"), handlePending)
      .addMatcher(({ type }) => type.endsWith("/rejected"), handleRejected);
  },
});

export default authSlice.reducer;
