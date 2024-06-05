import { createSlice } from "@reduxjs/toolkit";
import addDogSelect from "../../thunks/dogthunk/addDogThunk";

interface userDogData {
  userUid:string;
  dogSelect:string;
}

const initialState:userDogData = {
  userUid:"",
  dogSelect:"",
};

const addDogSlice = createSlice({
  name: "addDog",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addDogSelect.pending, (state, action) => {
        console.log(`비동기 요청 중`);
      })
      .addCase(addDogSelect.fulfilled, (state, action) => {
        console.log(`비동기 요청 성공`);
      })
      .addCase(addDogSelect.rejected, (state, action) => {
        console.log(`비동기 요청 실패`);
      });
  },
});
export default addDogSlice.reducer;
