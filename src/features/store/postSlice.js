import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getBookmarks } from "../../firebase-calls";

const initialState = {
  posts: [],
  bookmarks: [],
};
export const fetchBookmarksData = createAsyncThunk(
  "postData/fetchBookmarks",
  async (userId) => {
    const data = await getBookmarks(userId);
    return data;
  }
);

const postSlice = createSlice({
  name: "postData",
  initialState,
  reducers: {
    setPosts: (state, action) => {
      state.posts = action.payload;
    },
  },
  extraReducers: {
    [fetchBookmarksData.fulfilled]: (state, action) => {
      state.bookmarks = action.payload;
    },
  },
});

export const postActions = postSlice.actions;
export default postSlice.reducer;
