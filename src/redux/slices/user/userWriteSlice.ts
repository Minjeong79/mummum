import { createSlice } from "@reduxjs/toolkit";

interface IDType {
  dbId: number[];
  selectId: number;
}
const initialState: IDType = {
  dbId: [],
  selectId: 0,
};

const userWriteIdDbSlice = createSlice({
  name: "writeId",
  initialState,
  reducers: {
    userWirteId: (state, action) => {
      const id = action.payload;
      state.dbId.push(id);
    },
    userSelectId: (state, action) => {
      const id = action.payload;
      state.selectId = id;
    },
  },
});

export const { userWirteId, userSelectId } = userWriteIdDbSlice.actions;
export default userWriteIdDbSlice.reducer;
