import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  posts: [],
};

const postSlice = createSlice({
  name: "postData",
  initialState,
  reducers: {
    setPosts: (state, action) => {
      state.posts = action.payload;
    },
  },
});

export const postActions = postSlice.actions;
export default postSlice.reducer;
