import { useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/reduxStore";
import { useNavigate } from "react-router-dom";
import supabase from "../../store";
import addDogSelect from "../../redux/thunks/dogthunk/addDogThunk";

const DogSelect = () => {
  const userUid = useAppSelector((state) => state.userLogin.userId);
  const dispatch = useAppDispatch();
  const nav = useNavigate();
  
  const [imageUrlList, setImageUrlList] = useState<string[]>([]);

  const imgListHandle = async () => {
    const { data, error } = await supabase.storage
      .from("img")
      .list("dogSelect");

    const url =
      "";
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

  const imgClickhandle = async (item: string) => {
    await dispatch(addDogSelect({ userUid: userUid, dogUrl: item }));
    nav(`/themaSelect`);
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
              <button id="" onClick={() => imgClickhandle(item)}>
                <img
                  style={{ width: "100px", height: "100px" }}
                  src={item}
                  alt="강아지이미지"
                />
              </button>
            </li>
          );
        })}
      </ul>
    </section>
  );
};
export default DogSelect;
