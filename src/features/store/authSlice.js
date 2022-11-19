import { createSlice } from "@reduxjs/toolkit";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase-config";

const initialState = {
  token: localStorage.getItem("token"),
  isLoggedIn: false,
};

const authSlice = createSlice({
  name: "authentication",
  initialState,
  reducers: {
    loggedOut: (state) => {
      state.token = null;
      localStorage.removeItem("token");
      signOut(auth);
    },
    loggedIn: (state, action) => {
      state.token = action.payload;
      localStorage.setItem("token", action.payload);
    },
    userLoggedIn: (state) => {
      state.isLoggedIn = !!state.token;
    },
  },
});
export const authActions = authSlice.actions;
export default authSlice.reducer;
