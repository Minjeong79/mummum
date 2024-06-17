import { createSlice } from "@reduxjs/toolkit";


interface IdType{
  userId:string;
}
const initialState:IdType = {
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
     const userOut = action.payload;
     state.userId=userOut;
    },
  },
});

export const { userLogin, userLogout } = userLoginSlice.actions;
export default userLoginSlice.reducer;
