import { useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/reduxStore";
import { useNavigate } from "react-router-dom";
import supabase from "../../store";
import addDogSelectTHunk from "../../redux/thunks/dogthunk/addDogSelectThunk";

const ThemaSelect = () => {
  const userUid = useAppSelector((state) => state.userLogin.userId);
  const dispatch = useAppDispatch();
  const nav = useNavigate();

  const [imageUrlList, setImageUrlList] = useState<string[]>([]);

  const imgListHandle = async () => {
    const { data, error } = await supabase.storage.from("img").list("dogThema");

    const url =
      "https://zbjwkpzadmxggyahexgv.supabase.co/storage/v1/object/public/img/dogThema/";
    if (data) {
      const imgName = data.map((item) => `${url}${item.name}`);
      setImageUrlList(imgName);
    }
    if (error) {
      console.error("에러 발생:", error.message);
    } else {
      // console.log("파일 목록:", data);
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
    <section>
      <ul style={{ display: "flex", width: "100px", height: "100px" }}>
        {imageUrlList.map((item, index) => {
          return (
            <li key={index}>
              <button onClick={() => imgClickhandle(index)}>
                <img
                  style={{ width: "100px", height: "100px" }}
                  src={item}
                  alt="테마"
                />
              </button>
            </li>
          );
        })}
      </ul>
    </section>
  );
};

export default ThemaSelect;
