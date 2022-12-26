import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  token: localStorage.getItem("token"),
  isLoggedIn: !!localStorage.getItem("token"),
  userId: "",
};
const API_KEY = process.env.REACT_APP_apiKey;

export const validateToken = createAsyncThunk(
  "authentication/validateToken",
  async (currentToken) => {
    const response = await fetch(
      `https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=${API_KEY}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          idToken: currentToken,
        }),
      }
    );
    const data = await response.json();
    console.log(data.users[0].localId);
    return data.users[0].localId;
  }
);

const authSlice = createSlice({
  name: "authentication",
  initialState,
  reducers: {
    loggedOut: (state) => {
      state.token = null;
      localStorage.removeItem("token");
    },
    loggedIn: (state, action) => {
      state.token = action.payload;
      localStorage.setItem("token", action.payload);
    },
    userLoggedIn: (state) => {
      state.isLoggedIn = !!state.token;
    },
  },
  extraReducers: {
    [validateToken.rejected]: (state) => {
      state.token = null;
      localStorage.removeItem("token");
    },
    [validateToken.fulfilled]: (state, action) => {
      state.userId = action.payload;
    },
  },
});
export const authActions = authSlice.actions;
export default authSlice.reducer;
