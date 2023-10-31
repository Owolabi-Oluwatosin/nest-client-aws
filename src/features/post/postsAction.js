import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { api } from "../../urlConfig";

//register userAction.js
export const createPost = createAsyncThunk(
  // action type string
  "api/posts/create",
  // callback function
  async (data, { rejectWithValue }) => {
    //get token from localStorage
    const token = window.localStorage.getItem("token");
    //console.log(token)
    try {
      // configure header's Content-Type as JSON
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: token ? `Bearer ${token}` : "",
        },
        credentails: "include",
      };
      // make request to backend
      await axios.post(`${api}/api/posts/create`, data, config);
      //console.log(data)
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

export const getRecentPost = createAsyncThunk(
  // action type string
  "api/posts",
  // callback function
  async (arg, { rejectWithValue }) => {
    // get token from the state
    const token = window.localStorage.getItem("token");
    try {
      // configure header's Content-Type as JSON
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: token ? `Bearer ${token}` : "",
        },
        credentials: "include",
      };
      // make request to the backend
      const { data } = await axios.get(`${api}/api/posts`, config);
      //console.log(data);
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

// like on a post action
export const likeOnAPost = createAsyncThunk(
  "api/likes/create",
  async (postId, { rejectWithValue }) => {
    // get token from the state
    const token = window.localStorage.getItem("token");
    try {
      // configure header's Content-Type as JSON
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: token ? `Bearer ${token}` : "",
        },
      };
      // sending request to the backend with token
      const { data } = await axios.post(
        `${api}/api/likes/create`,
        postId,
        config,
      );
      console.log(data);
      return data;
    } catch (error) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.response.data.error);
      }
    }
  },
);

//get user profile userActions.js
export const getLikes = createAsyncThunk(
  "api/likes",
  async (arg, { rejectWithValue }) => {
    //get token from localStorage
    const token = window.localStorage.getItem("token");
    //console.log(token)
    try {
      // configure header's Content-Type as JSON
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: token ? `Bearer ${token}` : "",
        },
      };
      // sending request to the backend with token
      const { data } = await axios.get(`${api}/api/likes`, config);
      //console.log(data)
      return data;
    } catch (error) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.response.data.error);
      }
    }
  },
);
