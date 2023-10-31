// userSlice.js
import { createSlice } from "@reduxjs/toolkit";
import { registerUser, updateUser, userLogin } from "./userActions";

// initialize userToken and userInfo from local storage
const token = localStorage.getItem("token")
  ? localStorage.getItem("token")
  : null;
const userInfo = localStorage.getItem("user")
  ? localStorage.getItem("user")
  : null;

const initialState = {
  loading: false,
  userInfo,
  token,
  error: false,
  message: null,
  errorMessage: null,
  logoutMessage: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: {
    // register user
    [registerUser.pending]: (state) => {
      state.loading = true;
      state.error = false;
      state.errorMessage = null;
      state.logoutMessage = null;
      state.message = null;
    },
    [registerUser.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.message = payload.message; // registration successful
    },
    [registerUser.rejected]: (state, { payload }) => {
      state.loading = false;
      state.errorMessage = payload;
      state.logoutMessage = null;
      state.message = null;
      state.error = true;
    },

    // login user
    [userLogin.pending]: (state) => {
      state.loading = true;
      state.error = false;
      state.errorMessage = null;
      state.logoutMessage = null;
      state.message = null;
    },
    [userLogin.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.message = payload.message;
      state.userInfo = payload.user;
      state.token = payload.token;
    },
    [userLogin.rejected]: (state, { payload }) => {
      state.loading = false;
      state.message = null;
      state.logoutMessage = null;
      state.errorMessage = payload;
      state.error = true;
    },

    // update user
    [updateUser.pending]: (state) => {
      state.loading = true;
      state.error = false;
      state.errorMessage = null;
      state.logoutMessage = null;
      state.message = null;
    },
    [updateUser.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.userInfo = payload.user;
    },
    [updateUser.rejected]: (state, { payload }) => {
      state.errorMessage = payload;
      state.error = true;
    },
  },
});

// export actions
// export const { logout } = userSlice.actions

export default userSlice.reducer;
