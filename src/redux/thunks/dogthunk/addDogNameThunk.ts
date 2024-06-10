import { createAsyncThunk } from "@reduxjs/toolkit";
import supabase from "../../../store";

const addDogNameTHunk = createAsyncThunk(
  "user/addDogName",
  async (data: { uuid: string; dogname: string }) => {
    try {
      const { uuid, dogname } = data;

      const { error } = await supabase
        .from("dognamedb")
        .insert({ uuid: uuid, dogname: dogname });

      console.log(error);
      const selectThema = {
        uuid,
        dogname,
      };
      return selectThema;
    } catch (error) {
      console.log(error);
    }
  }
);

export default addDogNameTHunk;
