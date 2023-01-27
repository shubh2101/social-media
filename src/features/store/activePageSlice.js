import { createSlice } from "@reduxjs/toolkit";

const activePageSlice = createSlice({
  name: "activePage",
  initialState: { selectedIndex: localStorage.getItem("selectedIndex") || 0 },
  reducers: {
    selectIndex: (state, action) => {
      state.selectedIndex = action.payload;
      localStorage.setItem("selectedIndex", action.payload);
    },
    removeIndex: (state) => {
      state.selectedIndex = 0;
      localStorage.removeItem("selectedIndex");
    },
  },
});

export const activeAction = activePageSlice.actions;
export default activePageSlice.reducer;
