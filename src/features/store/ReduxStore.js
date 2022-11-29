import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import userReducer from "./userSlice";
import postReducer from "./postSlice";

const store = configureStore({
  reducer: { auth: authReducer, user: userReducer, post: postReducer },
});

export default store;
