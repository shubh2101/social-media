import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getBookmarks, getPosts } from "../../firebase-calls";

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
export const fetchPosts = createAsyncThunk("postData/fetchPosts", async () => {
  const data = await getPosts();
  return data;
});

const postSlice = createSlice({
  name: "postData",
  initialState,
  reducers: {
    setPosts: (state, action) => {
      state.posts = action.payload;
    },
    bookmark: (state, action) => {
      state.bookmarks = [...state.bookmarks, { postId: action.payload }];
    },
  },
  extraReducers: {
    [fetchBookmarksData.fulfilled]: (state, action) => {
      state.bookmarks = action.payload;
    },
    [fetchPosts.fulfilled]: (state, action) => {
      state.posts = action.payload;
    },
  },
});

export const postActions = postSlice.actions;
export default postSlice.reducer;
