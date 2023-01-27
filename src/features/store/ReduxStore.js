import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import userReducer from "./userDataSlice";
import postReducer from "./postSlice";
import usersReducer from "../Users/usersSlice";
import activePageReducer from "./activePageSlice"

const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer,
    post: postReducer,
    users: usersReducer,
    activePage : activePageReducer,
  },
});

export default store;
