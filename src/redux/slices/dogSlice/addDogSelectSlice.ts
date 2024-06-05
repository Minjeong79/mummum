import { createSlice } from "@reduxjs/toolkit";
import addDogSelectTHunk from "../../thunks/dogthunk/addDogSelectThunk";

interface themaSelect {
  userUid: string;
  dogThemaSelect: string;
}

const initialState: themaSelect = {
  userUid: "",
  dogThemaSelect: "",
};

const addDogThemaSlice = createSlice({
  name: "thema",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addDogSelectTHunk.pending, () => {
        console.log(`비동기 테마 요청 중`);
      })
      .addCase(addDogSelectTHunk.fulfilled, () => {
        console.log(`비동기 테마 성공`);
      })
      .addCase(addDogSelectTHunk.rejected, () => {
        console.log(`비동기 테마 요청 실패`);
      });
  },
});

export default addDogThemaSlice.reducer;
