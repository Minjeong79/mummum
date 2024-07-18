import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "";
const supabaseKey =
  "aNDU0MDEsImV4cCI6MjAyNjMyMTQwMX0.w9CLWyCmYmrr3jlExaeuvmmoDRuRTXac7RWu0d6CO4g";
const supabase = createClient(supabaseUrl, supabaseKey);
export default supabase;
