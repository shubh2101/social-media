import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getUserData } from "../../firebase-calls";

const initialState = {
  userData: {
    firstname: "",
    lastname: "",
    email: "",
    dob: "",
    country: "",
    username: "",
    userId: "",
    followers: [],
    following: [],
  },
  userId: "",
};
export const fetchUserData = createAsyncThunk(
  "userData/fetchUserData",
  async (userId) => {
    const data = await getUserData(userId);
    return data;
  }
);

const userDataSlice = createSlice({
  name: "userData",
  initialState,
  reducers: {
    setUserId: (state, action) => {
      state.userId = action.payload;
    },
    follow: (state, action) => {
      state.userData.following = [...state.userData.following, action.payload];
    },
    unfollow: (state, action) => {
      state.userData.following = state.userData.following.filter(
        (user) => user !== action.payload
      );
    },
  },
  extraReducers: {
    [fetchUserData.fulfilled]: (state, action) => {
      state.userData = action.payload;
    },
  },
});

export const userActions = userDataSlice.actions;
export default userDataSlice.reducer;
