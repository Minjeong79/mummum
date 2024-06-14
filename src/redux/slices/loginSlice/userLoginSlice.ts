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
      state.userIds = [...user, user];
    },
    userLogout: (state, action) => {
      console.log(state, action);
      return initialState;
    },
  },
});

export const { userLogin, userLogout } = userLoginSlice.actions;
export default userLoginSlice.reducer;
