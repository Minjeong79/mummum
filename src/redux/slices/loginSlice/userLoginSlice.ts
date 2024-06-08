import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userId: "",
};

const userLoginSlice = createSlice({
  name: "userUid",
  initialState,
  reducers: {
    userLogin: (state, action) => {
      const user = action.payload;
      state.userId = user;
    },
    userLogout: (state, action) => {
      console.log(state, action);
      return initialState;
    },
  },
});

export const { userLogin, userLogout } = userLoginSlice.actions;
export default userLoginSlice.reducer;
