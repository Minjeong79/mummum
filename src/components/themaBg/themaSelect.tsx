import { useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/reduxStore";
import { useNavigate } from "react-router-dom";
import supabase from "../../store";
import addDogSelectTHunk from "../../redux/thunks/dogthunk/addDogSelectThunk";

interface ThemaType {
  id: number;
  url: string;
  title: string;
}
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
      <section className="container mx-auto bg-[#FFEAD9] h-screen">
        <div className="flex flex-col justify-center items-center min-h-screen px-10">
          <div className="flex flex-col items-center gap-y-36">
            <h3 className="text-3xl text-center py-3">
              너의 멈멈이는
              <br />
              어디에 있어?
            </h3>
            <ul className="flex flex-row justify-center items-center gap-x-9 mt-5">
              {imageUrlList.map((item, index) => {
                return (
                  <li key={index}>
                    <button onClick={() => imgClickhandle(index)}>
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
