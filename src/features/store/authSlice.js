import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  token: localStorage.getItem("token"),
  isAuthenticated: false,
};

const authSlice = createSlice({
  name: "authentication",
  initialState,
  reducers: {
    loggedOut: (state) => {
      state.isAuthenticated = false;
      state.token = null;
    },
    loggedIn: (state, action) => {
      state.token = action.payload;
      state.isAuthenticated = true;
      localStorage.setItem("token", action.payload);
    },
  },
});
export const authActions = authSlice.actions;
export default authSlice.reducer;
