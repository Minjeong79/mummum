import { createSlice } from "@reduxjs/toolkit";


interface IdType{
  userId:string;
  userIds:string[];
}
const initialState:IdType = {
  userId: "",
  userIds:[]
};

const userLoginSlice = createSlice({
  name: "userUid",
  initialState,
  reducers: {
    userLogin: (state, action) => {
      const user = action.payload;
      state.userId = user;
      state.userIds = [...state.userIds , user];
    },
    userLogout: (state, action) => {
     const userOut = action.payload;
     state.userId=userOut;
    },
  },
});

export const { userLogin, userLogout } = userLoginSlice.actions;
export default userLoginSlice.reducer;
