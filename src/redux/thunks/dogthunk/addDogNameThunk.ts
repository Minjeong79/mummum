import { createAsyncThunk } from "@reduxjs/toolkit";
import supabase from "../../../store";

const addDogNameTHunk = createAsyncThunk(
  "user/addDogName",
  async (data: { userUid: string; dogName: string }) => {
    try {
      const { userUid, dogName } = data;

      const { error } = await supabase
        .from("dognamedb")
        .insert({ uuid: userUid, dogName: dogName });

      console.log(error);
      const selectThema = {
        userUid,
        dogName,
      };
      return selectThema;
    } catch (error) {
      console.log(error);
    }
  }
);

export default addDogNameTHunk;
