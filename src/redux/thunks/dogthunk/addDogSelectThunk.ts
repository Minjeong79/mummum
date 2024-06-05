import { createAsyncThunk } from "@reduxjs/toolkit";
import supabase from "../../../store";

const addDogSelectTHunk = createAsyncThunk(
  "user/addDogSelect",
  async (data: { userUid: string; themaUrl: string }) => {
    try {
      const { userUid, themaUrl } = data;

      const { error } = await supabase
        .from("userthema_1")
        .insert({ uuid: userUid, themaurl: themaUrl });

      // console.log(error);
      const selectThema = {
        userUid,
        themaUrl,
      };
      return selectThema;
    } catch (error) {
      console.log(error);
    }
  }
);

export default addDogSelectTHunk;
