import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cName: "",
};

const mainCitySlice = createSlice({
  name: "mainCity",
  initialState,
  reducers: {
    mainCity: (state, action) => {
      const name = action.payload;
      state.cName = name;
    },
  },
});

export const { mainCity } = mainCitySlice.actions;
export default mainCitySlice.reducer;
