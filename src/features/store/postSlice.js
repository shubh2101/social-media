import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { deleteBookmark, getBookmarks, getPosts } from "../../firebase-calls";

const initialState = {
  posts: [],
  status: "idle",
  bookmarks: [],
};

export const fetchBookmarksData = createAsyncThunk(
  "postData/fetchBookmarks",
  async (userId) => {
    const data = await getBookmarks(userId);
    return data;
  }
);
export const deleteBookmarkdata = createAsyncThunk(
  "postData/deleteBookmarks",
  async (payload) => {
    const { postId, userId } = payload;
    const deleteBookmarkId = await deleteBookmark(postId, userId);
    return deleteBookmarkId;
  }
);

export const fetchPosts = createAsyncThunk(
  "postData/fetchPosts",
  async (ids) => {
    const { following, userId } = ids;
    const data = await getPosts();

    const postsTimeline = data.filter((post) => {
      return (
        following.includes(post.data.userId) || post.data.userId === userId
      );
    });
    return [...new Set([...postsTimeline])];
  }
);

const postSlice = createSlice({
  name: "postData",
  initialState,
  reducers: {
    setBookmark: (state, action) => {
      const { postId, bookmarkId } = action.payload;
      state.bookmarks.push({ postId, bookmarkId });
    },
    addComment: (state, action) => {
      state.posts = state.posts.map((post) => {
        if (post.id === action.payload.id) {
          return {
            ...post,
            data: {
              ...post.data,
              comments: [...post.data.comments, action.payload.commentData],
            },
          };
        }
        return post;
      });
    },
  },
  extraReducers: {
    [fetchBookmarksData.fulfilled]: (state, action) => {
      state.bookmarks = action.payload;
    },
    [deleteBookmarkdata.fulfilled]: (state, action) => {
      state.bookmarks.filter((bm) => bm.bookmarkId !== action.payload);
    },
    [fetchPosts.pending]: (state) => {
      state.status = "loading";
    },
    [fetchPosts.fulfilled]: (state, action) => {
      state.status = "succeeded";
      state.posts = action.payload;
    },
  },
});

export const postActions = postSlice.actions;
export default postSlice.reducer;
