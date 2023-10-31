// postSlice.js
import { createSlice } from "@reduxjs/toolkit";
import {
  createPost,
  getLikes,
  getRecentPost,
  likeOnAPost,
} from "./postsAction";

const initialState = {
  loading: false,
  posts: [],
  likes: [],
  message: "",
  errorMessage: "",
  error: false,
  createLoading: false,
};

const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {},
  extraReducers: {
    // create post
    [createPost.pending]: (state) => {
      state.createLoading = true;
    },
    [createPost.fulfilled]: (state, { payload }) => {
      state.createLoading = false;
      state.posts = payload;
    },
    [createPost.rejected]: (state, { payload }) => {
      state.createLoading = false;
      state.errorMessage = payload;
      state.error = true;
    },
    // get new post, both user and following posts
    [getRecentPost.pending]: (state) => {
      state.loading = true;
    },
    [getRecentPost.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.posts = payload;
    },
    [getRecentPost.rejected]: (state, { payload }) => {
      state.loading = false;
      state.errorMessage = payload;
      state.error = true;
    },
    // get likes
    [likeOnAPost.pending]: (state) => {
      state.loading = true;
    },
    [likeOnAPost.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.likes = payload;
    },
    [likeOnAPost.rejected]: (state, { payload }) => {
      state.loading = false;
      state.errorMessage = payload;
      state.error = true;
    },
    // get likes
    [getLikes.pending]: (state) => {
      state.loading = true;
    },
    [getLikes.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.likes = payload;
    },
    [getLikes.rejected]: (state, { payload }) => {
      state.loading = false;
      state.errorMessage = payload;
      state.error = true;
    },
  },
});

export default postSlice.reducer;
