import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getAllUsers } from "../../firebase-calls";

const initialState = {
  users: [],
};
export const fetchUsers = createAsyncThunk(
  "users/fetchUsers",
  async (userId) => {
    const data = await getAllUsers(userId);
    return data;
  }
);

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    // setUsers: (state, action) => {
    //   ;
    // },
  },
  extraReducers : {
    [fetchUsers.fulfilled] : (state, action) => {
      state.users = action.payload
    }
  }
});

export const usersActions = usersSlice.actions;
export default usersSlice.reducer;