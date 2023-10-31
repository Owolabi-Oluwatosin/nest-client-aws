import { combineReducers } from "@reduxjs/toolkit";
import userReducer from "../features/user/userSlice";
import postReducer from "../features/post/postSlice";

const rootReducer = combineReducers({
  user: userReducer,
  posts: postReducer,
});

export default rootReducer;
