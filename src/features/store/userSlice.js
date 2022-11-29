import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userData: {
    firstname: "",
    lastname: "",
    email: "",
    dob: "",
    country: "",
    username: "",
    userId: "",
  },
  userId: "",
};

const userSlice = createSlice({
  name: "userData",
  initialState,
  reducers: {
    setUserData: (state, action) => {
      state.userData = action.payload;
    },
    setUserId: (state, action) => {
      state.userId = action.payload;
    },
  },
});

export const userActions = userSlice.actions;
export default userSlice.reducer;
