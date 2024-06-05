import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://zbjwkpzadmxggyahexgv.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpiandrcHphZG14Z2d5YWhleGd2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTA3NDU0MDEsImV4cCI6MjAyNjMyMTQwMX0.w9CLWyCmYmrr3jlExaeuvmmoDRuRTXac7RWu0d6CO4g";
const supabase = createClient(supabaseUrl, supabaseKey);
export default supabase;
