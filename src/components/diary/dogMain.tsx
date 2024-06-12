import { useState, useEffect } from "react";
import { useAppSelector } from "../../redux/reduxStore";
import MenuFooter from "./footer";
import Weather from "./weather";
import supabase from "../../store";

const DogMain = () => {
  const userUid = useAppSelector((state) => state.userLogin.userId);

  const [selectDog, setSelectDog] = useState("");
  const [backBg, setBackBg] = useState("");

  const handleDogSelect = async () => {
    const { data, error } = await supabase.from("userdb_0").select("dogurl");
    if (data) {
      setSelectDog(data[0].dogurl);
    }
    console.log(error);
  };

  const handleBg = async () => {
    const { data, error } = await supabase.from("userthema_1").select(
      `   
      uuid,    
        dogthemabgdb(themabg)
      `
    );
    if (error) {
      console.error("Error data:", error.message);
      return;
    }

    data.map((item): void => {
      if (userUid === item.uuid) {
        const obj = Object.values(item.dogthemabgdb);
        setBackBg(String(obj[0]));
      }
    });
  };

  useEffect(() => {
    handleDogSelect();
    handleBg();
  }, []);

  return (
    <section
      className="mx-auto h-screen"
      style={{ backgroundImage: `url(${backBg})` }}
    >
      <div className="flex flex-col justify-between items-center min-h-screen">
        <Weather />
        <div className="">
          <img src={selectDog} alt="강아지" />
        </div>
        <MenuFooter />
      </div>
    </section>
  );
};

export default DogMain;
