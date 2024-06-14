import { useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/reduxStore";
import { useNavigate } from "react-router-dom";
import supabase from "../../store";
import addDogSelect from "../../redux/thunks/dogthunk/addDogThunk";
import Logout from "../login/logoutHeader";

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
      "https://zbjwkpzadmxggyahexgv.supabase.co/storage/v1/object/public/img/dogSelect/";
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
              멈멈이의 색상을
              <br />
              선택 해줘
            </h3>
            <ul className="flex flex-row justify-center items-center gap-x-9 mt-5">
              {imageUrlList.map((item, index) => {
                return (
                  <li key={index} className="min-w-16 max-w-24">
                    <button id="" onClick={() => imgClickhandle(item)}>
                      <img src={item} alt="강아지이미지" />
                    </button>
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
export default DogSelect;
