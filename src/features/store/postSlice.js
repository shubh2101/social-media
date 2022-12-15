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
export const fetchPosts = createAsyncThunk(
  "postData/fetchPosts",
  async (ids) => {
    const { following, userId } = ids;
    const data = await getPosts();
    const postsByUser = data.filter((post) => post.data.userId === userId);
    const postsFollowing = data
      .filter((post) => {
        return following.includes(post.data.userId);
      })
      .concat(postsByUser);
    return postsFollowing;
  }
);

const postSlice = createSlice({
  name: "postData",
  initialState,
  reducers: {
    bookmark: (state, action) => {
      const { postId, bookmarkId } = action.payload;
      state.bookmarks = [...state.bookmarks, { postId, bookmarkId }];
    },
    deleteBookmark: (state, action) => {
      state.bookmarks = state.bookmarks.filter(
        (bm) => bm.bookmarkId !== action.payload
      );
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
