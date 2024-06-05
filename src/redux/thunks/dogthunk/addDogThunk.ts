import { createAsyncThunk } from "@reduxjs/toolkit";
import supabase from "../../../store";

const addDogSelect = createAsyncThunk(
  "user/addDog",
  async (iddata: { userUid: string; dogUrl: string }) => {
    try {
      const { userUid, dogUrl } = iddata;
      console.log(iddata);
      const { error } = await supabase
        .from("userdb_0")
        .insert({ uuid: userUid, dogurl: dogUrl });
      console.log(error);
      const user = {
        userUid,
        dogUrl,
      };
      return user;
    } catch (error) {
      console.log(error);
    }
  }
);

export default addDogSelect;
