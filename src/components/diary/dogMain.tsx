import { useState, useEffect } from "react";
import { useAppSelector } from "../../redux/reduxStore";
import MenuFooter from "./footer";
import Weather from "./weather";
import supabase from "../../store";
import Logout from "../login/logoutHeader";
const DogMain = () => {
  const userUid = useAppSelector((state) => state.userLogin.userId);

  const [selectDog, setSelectDog] = useState("");
  const [backBg, setBackBg] = useState("");

  const handleDogSelect = async () => {
    const { data, error } = await supabase
      .from("userdb_0")
      .select(`uuid,dogimgdb(url)`);
      
      data?.map((item): void => {
        if (userUid === item.uuid) {
          const obj = Object.values(item.dogimgdb);
          console.log(obj)
          setSelectDog(String(obj[0]));
        }
      });
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
    <section className="bg-[#E9CEB9]">
      <section
        className="max-w-lg mx-auto h-screen bg-cover"
        style={{ backgroundImage: `url(${backBg})` }}
      >
        <div className="flex flex-col justify-between items-center min-h-screen">
          {userUid ? (
            <section className="pt-2 px-10 w-full">
              <Logout />
            </section>
          ) : (
            <section className="h-11"></section>
          )}
          <Weather />
          <div className="">
            <img src={selectDog} alt="강아지" />
          </div>
          <MenuFooter />
        </div>
      </section>
    </section>
  );
};

export default DogMain;
