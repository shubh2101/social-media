import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  postData: {
    dateCreated: "",
    postText: "",
    firstname: "",
    lastname: "",
    username: "",
    postId: "",
    userId: "",
    postPicUrl : "",
    likes: [],
    comments: [],
    bookmark: false,
  },
};

const postSlice = createSlice({
  name: "postData",
  initialState,
  reducers: {
    setPostData: (state, action) => {
      state.userData = action.payload;
    },
  },
});

export const postActions = postSlice.actions;
export default postSlice.reducer;
