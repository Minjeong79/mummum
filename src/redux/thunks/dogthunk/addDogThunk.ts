import { createAsyncThunk } from "@reduxjs/toolkit";
import supabase from "../../../store";

const addDogSelect = createAsyncThunk(
  "user/addDog",
  async (iddata: { userUid: string; name: string }) => {
    try {
      const { userUid, name } = iddata;
      console.log(iddata);
      const { error } = await supabase
        .from("userdb_0")
        .insert({ uuid: userUid, name: name });
      console.log(error);
      const user = {
        userUid,
        name,
      };
      return user;
    } catch (error) {
      console.log(error);
    }
  }
);

export default addDogSelect;
