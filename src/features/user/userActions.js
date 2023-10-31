import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { api } from "../../urlConfig";

//register userAction.js
export const registerUser = createAsyncThunk(
  // action type string
  "api/auth/signup",
  // callback function
  async ({ firstName, lastName, email, password }, { rejectWithValue }) => {
    try {
      // make request to backend
      const config = {
        headers: {
          "content-type": "application/x-www-form-urlencoded",
        },
      };
      const { data } = await axios.post(
        `${api}/api/auth/signup`,
        {
          firstName,
          lastName,
          email,
          password,
        },
        config,
      );
      //console.log(data)
      return data;
    } catch (error) {
      // return custom error message from API if any
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.response.data.error);
      }
    }
  },
);

//login userActions.js
export const userLogin = createAsyncThunk(
  "api/auth/signin",
  async ({ email, password }, { rejectWithValue }) => {
    console.log(email, password);
    try {
      // login user and getting user details and token
      const config = {
        headers: {
          "content-type": "application/x-www-form-urlencoded",
        },
      };
      const { data } = await axios.post(
        `${api}/api/auth/signin`,
        {
          email,
          password,
        },
        config,
      );
      console.log(data);
      // store user's token and user in local storage
      if (data.access_token) {
        localStorage.setItem("token", data.access_token);
        localStorage.setItem("user", JSON.stringify(data.user));
      }
      return data;
    } catch (error) {
      //console.log(error)
      // return custom error message from API if any
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.response.data.error);
      }
    }
  },
);

//update user actions
export const updateUser = createAsyncThunk(
  "api/users/:userId",
  async ({ userId, userData }, { getState, rejectWithValue }) => {
    //get token from localStorage
    //console.log(followId)
    const { token } = getState().user;
    try {
      // configure header's Content-Type as JSON
      const config = {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization: token ? `Bearer ${token}` : "",
        },
      };
      // sending request to the backend with token
      const { data } = await axios.patch(
        `${api}/api/users/${userId}`,
        userData,
        config,
      );
      //console.log(data.user)
      return data;
    } catch (error) {
      // return custom error message from API if any
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.response.data.error);
      }
    }
  },
);

//update user actions
export const deleteUser = createAsyncThunk(
  "api/users/:userId",
  async (userId, { getState, rejectWithValue }) => {
    //get token from localStorage
    //console.log(followId)
    const { token } = getState().user;
    try {
      // configure header's Content-Type as JSON
      const config = {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization: token ? `Bearer ${token}` : "",
        },
      };
      // sending request to the backend with token
      const { data } = await axios.delete(`${api}/api/users/${userId}`, config);
      if (data.message === "User deleted successfully") {
        window.localStorage.clear();
        window.location.replace("/signin");
      }
    } catch (error) {
      // return custom error message from API if any
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  },
);
