import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  response: [],
};

const mainPageSlice = createSlice({
  name: "mainAreaZone",
  initialState,
  reducers: {
    mainDust: (state, action) => {
      const dust = action.payload;
      state.response = dust;
    },
  },
});
export const { mainDust } = mainPageSlice.actions;
export default mainPageSlice.reducer;
