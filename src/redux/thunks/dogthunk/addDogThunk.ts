import { createAsyncThunk } from "@reduxjs/toolkit";
import supabase from "../../../store";

const addDogSelect = createAsyncThunk(
  "user/addDog",
  async (iddata: { uuid: string; dogurl: string }) => {
    try {
      const { uuid, dogurl } = iddata;
      console.log(iddata);
      const { error } = await supabase
        .from("userdb_0")
        .insert({ uuid: uuid, dogurl: dogurl });
      console.log(error);
      const user = {
        uuid,
        dogurl,
      };
      return user;
    } catch (error) {
      console.log(error);
    }
  }
);

export default addDogSelect;
