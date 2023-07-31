import { createSlice } from "@reduxjs/toolkit";

// import { register, logIn, logOut, refreshUser } from "./operations";

const initialState = {
  user: { name: null, email: null, user_photo: null, id: "e7b46283-070d-4545-be03-230225e9c400" },
  token: null,
  isLoggedIn: false,
  isRefreshing: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    refreshUser: (state, action) => {
      state.user = {
        token: "token",
        _id: "e7b46283-070d-4545-be03-230225e9c400",
        IsAuth: true,
        name: "Natali Romanova",
        email: "email@example.com",
        user_photo: "https://i.ibb.co/Xzfkqyt/user-Photo.png",
      };
    },
  },
  //   extraReducers: builder => {
  //     builder
  //       .addCase(register.fulfilled, (state, action) => {
  //         state.user = action.payload.user;
  //         state.token = action.payload.token;
  //         state.isLoggedIn = true;
  //         state.error = null;
  //       })
  //       .addCase(register.rejected, (state, action) => {
  //         state.isLoggedIn = false;
  //         state.error = action.payload;
  //       })
  //       .addCase(logIn.fulfilled, (state, action) => {
  //         state.user = action.payload.user;
  //         state.token = action.payload.token;
  //         state.isLoggedIn = true;
  //         state.error = null;
  //       })
  //       .addCase(logOut.fulfilled, state => {
  //         state.user = { name: null, email: null };
  //         state.token = null;
  //         state.isLoggedIn = false;
  //         state.error = null;
  //       })
  //       .addCase(refreshUser.pending, state => {
  //         state.isRefreshing = true;
  //         state.error = null;
  //       })
  //       .addCase(refreshUser.fulfilled, (state, action) => {
  //         state.user = action.payload;
  //         state.isLoggedIn = true;
  //         state.isRefreshing = false;
  //         state.error = null;
  //       })
  //       .addCase(refreshUser.rejected, state => {
  //         state.isRefreshing = false;
  //         state.error = null;
  //       })
  //       .addCase(logIn.rejected, (state, action) => {
  //         state.isRefreshing = false;
  //         state.error = action.payload;
  //       });
  //   },
});


export const { refreshUser } = authSlice.actions;
export default authSlice.reducer;
