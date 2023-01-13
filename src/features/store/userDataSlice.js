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
    profilePicURL: "",
    coverPicURL: "",
    bio: "",
  },

  profileData: {
    firstname: "",
    lastname: "",
    email: "",
    dob: "",
    country: "",
    username: "",
    userId: "",
    followers: [],
    following: [],
    profilePicURL: "",
    coverPicURL: "",
    bio: "",
  },
};
export const fetchUserData = createAsyncThunk(
  "userData/fetchUserData",
  async (userId) => {
    const data = await getUserData(userId);
    return data;
  }
);
export const fetchProfileData = createAsyncThunk(
  "userData/fetchProfileData",
  async (userId) => {
    const data = await getUserData(userId);
    return data;
  }
);

const userDataSlice = createSlice({
  name: "userData",
  initialState,
  reducers: {
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
    [fetchProfileData.fulfilled]: (state, action) => {
      state.profileData = action.payload;
    },
  },
});

export const userActions = userDataSlice.actions;
export default userDataSlice.reducer;
