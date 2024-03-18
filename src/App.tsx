import { useState, useEffect } from "react";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://zbjwkpzadmxggyahexgv.supabase.co";
const supabaseKey =
  "";
const supabase = createClient(supabaseUrl, supabaseKey);

import "./App.css";

interface test{
  title:string;
  body:string;
}
function App() {
  const [testData, setTestData] = useState<test[]>([]);

 
  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data, error } = await supabase.from('test').select('*');
        if (error) {
          throw error;
        }
        if (data !== null) {
          setTestData(data);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);
  return <div>
    {testData.map((i)=>(
     <div>
      <div>{i.title}</div>
      <div>{i.body}</div>
      <div></div>
     </div> 
    ))}
  </div>;
}

export default App;
