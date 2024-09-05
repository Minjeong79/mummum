import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import supabase from "../../store";
import { BackBgType } from "../../lib/type";


const MenuFooter = () => {
  const nav = useNavigate();

  const [menuUrlList, setMenuUrlList] = useState<BackBgType[]>([]);

  const imgListHandle = async () => {
    const { data, error } = await supabase.from("bottommenu").select();
    if (data) {
      setMenuUrlList(data);
    } else {
      console.log(error);
    }
  };

  const handleMenu = async (item: string) => {
    const { error } = await supabase.from("writedb").select();
    switch (item) {
      case "일기":
        nav(`/List`);
        break;
      case "산책":
        nav(`/mapPage`);
        break;
      case "메인":
        nav(`/dogMain`);
        break;
      default:
        console.log("완료");
    }
    console.log(error);
  };

  useEffect(() => {
    imgListHandle();
  }, []);
  return (
    <section className="z-10 w-full ">
      <div className="bg-slate-800 opacity-80 max-h-36">
        <ul className="flex justify-around mb-0 py-3.5">
          {menuUrlList.map((item, index) => {
            return (
              <li key={index} className="w-20 cursor-pointer">
                <img
                  src={item.backurl}
                  alt="메뉴 이미지"
                  onClick={() => handleMenu(item.menutext)}
                />
                <p className="text-center mt-0 text-white">{item.menutext}</p>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
};
export default MenuFooter;
