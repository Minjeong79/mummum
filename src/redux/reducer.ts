import { combineReducers } from "@reduxjs/toolkit";
import addDogReducer from "./slices/dogSlice/addDogSlice";
import userLoginReducer from "./slices/loginSlice/userLoginSlice";
import addDogThemaReducer from "./slices/dogSlice/addDogSelectSlice";
import addDogNameSlice from "./slices/dogSlice/addDogNameSlice";
import userWirteIdReducer from "./slices/user/userWriteSlice";
import userSelectIdReducer from "./slices/user/userWriteSlice";
import mainDustReducer from "./slices/mainSlice/mainPageSlice";
const rootReducer = combineReducers({
  userLogin: userLoginReducer,
  dogBoard: addDogReducer,
  dogThema: addDogThemaReducer,
  dogName: addDogNameSlice,
  userWriteId: userWirteIdReducer,
  userSelectId: userSelectIdReducer,
  mainDust:mainDustReducer,

});

export default rootReducer;
