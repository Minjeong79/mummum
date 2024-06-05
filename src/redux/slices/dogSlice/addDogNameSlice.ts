import { createSlice } from "@reduxjs/toolkit";
import addDogNameTHunk from "../../thunks/dogthunk/addDogNameThunk";

const initialState = {
  dogName: "",
};

const addDogNameSlice = createSlice({
  name: "dogName",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addDogNameTHunk.pending, (state, action) => {
        console.log(`비동기 이름 요청 중`);
      })
      .addCase(addDogNameTHunk.fulfilled, (state, action) => {
        console.log(`비동기 이름 성공`);
      })
      .addCase(addDogNameTHunk.rejected, (state, action) => {
        console.log(`비동기 이름 요청 실패`);
      });
  },
});

export default addDogNameSlice.reducer;
