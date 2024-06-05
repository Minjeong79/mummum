import { useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/reduxStore";
import { useNavigate } from "react-router-dom";
import supabase from "../../store";

interface BackBgType {
  id: number;
  backurl: string;
  menutext: string;
}
const MenuFooter = () => {
  const dispatch = useAppDispatch();
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

  const handleMenu = async () => {
    const { data, error } = await supabase.from("writedb").select();
    console.log(data);
    nav(`/List`);
    // nav(`/write`);
  };

  useEffect(() => {
    imgListHandle();
  }, []);
  return (
    <section
      style={{
        zIndex: "9",
        width: "100%",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          background: "#222",
          opacity: "80%",
          width: "100%",
          height: "150px",
        }}
      >
        <ul
          style={{
            display: "flex",
            justifyContent: "space-around",
            marginBottom: "0px",
          }}
        >
          {menuUrlList.map((item, index) => {
            return (
              <li key={index} style={{ width: "90px", height: "900px" }}>
                <img
                  src={item.backurl}
                  alt="메뉴 이미지"
                  onClick={handleMenu}
                />
                <p
                  style={{
                    color: "#fff",
                    textAlign: "center",
                    marginTop: "0px",
                  }}
                >
                  {item.menutext}
                </p>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
};
export default MenuFooter;
