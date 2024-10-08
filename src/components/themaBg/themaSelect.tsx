import { useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/reduxStore";
import { useNavigate } from "react-router-dom";
import supabase from "../../store";
import addDogSelectTHunk from "../../redux/thunks/dogthunk/addDogSelectThunk";
import Logout from "../login/logoutHeader";
import { ThemaType } from "../../lib/type";


const ThemaSelect = () => {
  const userUid = useAppSelector((state) => state.userLogin.userId);
  const dispatch = useAppDispatch();
  const nav = useNavigate();

  const [imageUrlList, setImageUrlList] = useState<ThemaType[]>([]);

  const imgListHandle = async () => {
    let { data, error } = await supabase.from("dogthemaicon").select("*");
    if (data) {
      setImageUrlList(data);
    } else {
      console.log(error);
    }
  };
  const imgClickhandle = async (index: number) => {
    const themaNum = `thema${index}`;
    await dispatch(addDogSelectTHunk({ userUid: userUid, themaUrl: themaNum }));
    nav(`/dogName`);
  };
  useEffect(() => {
    imgListHandle();
  }, []);
  return (
    <section className="bg-[#E9CEB9]">
      <section className="max-w-lg mx-auto bg-[#FFEAD9] h-screen">
      {userUid ? (
          <section className="pt-2 px-10">
            <Logout />
          </section>
        ) : (
          <section className="h-11"></section>
        )}
        <div className="flex flex-col justify-center items-center h-5/6 px-10">
          <div className="flex flex-col items-center gap-y-36">
            <h3 className="text-3xl text-center py-3">
              너의 멈멈이는
              <br />
              어디에 있어?
            </h3> 
            <ul className="flex flex-row justify-center items-center gap-x-9 mt-5">
              {imageUrlList.map((item, index) => {
                return (
                  <li key={index} className="w-48">
                    <button className="max-w-28" onClick={() => imgClickhandle(index)}>
                      <img src={item.url} alt="테마" />
                    </button>
                    <p className="text-center">{item.title}</p>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </section>
    </section>
  );
};

export default ThemaSelect;
